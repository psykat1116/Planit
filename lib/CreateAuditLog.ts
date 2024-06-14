import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface CreateAuditLogInput {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (input: CreateAuditLogInput) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User or OrgId not found");
    }

    const { entityId, entityType, entityTitle, action } = input;

    await db.auditLog.create({
      data: {
        orgId,
        userId: user.id,
        entityId,
        entityType,
        entityTitle,
        action,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
