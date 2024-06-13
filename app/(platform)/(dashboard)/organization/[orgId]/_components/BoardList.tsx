import React from "react";
import { db } from "@/lib/db";
import Hint from "@/components/Hint";
import { HelpCircle, User2 } from "lucide-react";
import FormPopover from "@/components/form/FormPopover";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((b) => (
          <Link
            href={`/board/${b.id}`}
            key={b.id}
            style={{ backgroundImage: `url(${b.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white capitalize">
              {b.title}
            </p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            className="aspect-video relative flex flex-col h-full w-full bg-muted rounded-sm gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm">Create New Board</p>
            <span>5 Remaining</span>
            <Hint
              sideOffset={40}
              description={`
            free workspaces can have upto 5 open boards at a time.
            upgrade to premium to create unlimited boards.
            `}
            >
              <HelpCircle className="absolte bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};

export default BoardList;
