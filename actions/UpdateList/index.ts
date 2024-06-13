"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { UpdateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
