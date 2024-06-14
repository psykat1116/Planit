import ActivityItem from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No Activity Found Inside This Organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = () => {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-4/5 h-14" />
      <Skeleton className="w-1/2 h-14" />
      <Skeleton className="w-4/5 h-14" />
      <Skeleton className="w-3/4 h-14" />
      <Skeleton className="w-4/5 h-14" />
      <Skeleton className="w-5/6 h-14" />
      <Skeleton className="w-4/5 h-14" />
      <Skeleton className="w-2/3 h-14" />
      <Skeleton className="w-4/6 h-14" />
      <Skeleton className="w-4/5 h-14" />
    </ol>
  );
};

export default ActivityList;
