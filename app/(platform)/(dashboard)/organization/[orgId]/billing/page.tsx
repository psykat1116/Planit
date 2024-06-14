import { checkSubscription } from "@/lib/subscription";
import React from "react";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/SubscriptionButton";

const Page = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2"/>
      <SubscriptionButton isPro={isPro}/>
    </div>
  );
};

export default Page;
