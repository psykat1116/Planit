"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { UpdateListOrder } from "./Schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "401 Unauthorized",
    };
  }

  const { boardId, items } = data;

  let lists;
  try {
    const transaction = items.map((list) => {
      return db.list.update({
        where: {
          id: list.id,
          boardId,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      });
    });

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reordered list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
