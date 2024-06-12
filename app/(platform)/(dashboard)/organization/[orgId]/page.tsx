import React from "react";
import Info from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/BoardList";

const Page = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default Page;
