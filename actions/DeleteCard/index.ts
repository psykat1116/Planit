"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { DeleteCard } from "./schema";
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
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
    });
  } catch (error) {
    return {
      error: "Failed to delete card",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
