"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { CopyCard } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/CreateAuditLog";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let card;

  try {
    const existedCard = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!existedCard) {
      return {
        error: "Card not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: existedCard.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const order = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        listId: existedCard.listId,
        title: `${existedCard.title} - Copy`,
        description: existedCard.description,
        order,
      },
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
    });
  } catch (error) {
    return {
      error: "Failed to copy card",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
