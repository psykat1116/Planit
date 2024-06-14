"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { CopyList } from "./schema";
import { createAuditLog } from "@/lib/CreateAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    const existedList = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!existedList) {
      return {
        error: "List not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const order = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId,
        title: `${existedList.title} - Copy`,
        order,
        cards: {
          createMany: {
            data: existedList.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
    });
  } catch (error) {
    return {
      error: "Failed to copy board",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
