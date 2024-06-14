"use server";

import { db } from "@/lib/db";
import { UpdateCard } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/CreateSafeAction";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, boardId, description } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId,
          },
        },
      },
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
