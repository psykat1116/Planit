"use server";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { CreateCard } from "./Schema";
import { createAuditLog } from "@/lib/CreateAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "401 Unauthorized",
    };
  }

  const { title, boardId, listId } = data;

  let card;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!board || !list) {
      return {
        error: "Board or List Not Found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const order = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed To Create Card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
