"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { UpdateCardOrder } from "./Schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "401 Unauthorized",
    };
  }

  const { items, boardId } = data;

  let cards;
  try {
    const transaction = items.map((card) => {
      return db.card.update({
        where: {
          id: card.id,
          list: {
            boardId,
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      });
    });

    cards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reordered list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: cards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
