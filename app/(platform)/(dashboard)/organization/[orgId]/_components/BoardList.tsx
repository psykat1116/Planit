import React from "react";
import Hint from "@/components/Hint";
import { HelpCircle, User2 } from "lucide-react";
import FormPopover from "@/components/form/FormPopover";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default BoardList;
