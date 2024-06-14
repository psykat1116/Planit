"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/CreateSafeAction";
import { DeleteList } from "./schema";
import { redirect } from "next/navigation";
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
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
    });
  } catch (error) {
    return {
      error: "Failed to delete board",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
