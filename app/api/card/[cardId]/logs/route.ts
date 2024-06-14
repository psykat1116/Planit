import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { orgId, userId } = auth();
    if (!orgId || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cardId = params.cardId;

    if (cardId === undefined || !cardId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const audits = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(audits);
  } catch (error) {
    console.log("[GET_AUDIT_LOGS_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
