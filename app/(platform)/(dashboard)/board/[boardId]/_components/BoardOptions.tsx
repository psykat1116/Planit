"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Settings, Trash, X } from "lucide-react";
import { deleteBoard } from "@/actions/DeleteBoard";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-0" side="bottom" align="start">
        <div className="text-sm pl-5 font-medium text-left text-neutral-600 pb-2 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Separator />
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto px-5 justify-start text-red-700"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete This Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
