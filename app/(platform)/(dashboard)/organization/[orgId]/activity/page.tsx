import React, { Suspense } from "react";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/ActivityList";

const Page = async () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default Page;
