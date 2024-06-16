import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ListContainer from "./_components/ListContainer";

interface PageProps {
  params: {
    boardId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { orgId } = auth();
  const { boardId } = params;
  if (!orgId) {
    return redirect("/select-org");
  }
  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-3 h-full overflow-x-auto">
      <ListContainer data={lists} boardId={boardId} />
    </div>
  );
};

export default Page;
