import React, { Suspense } from "react";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/ActivityList";
import { checkSubscription } from "@/lib/subscription";

const Page = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default Page;
