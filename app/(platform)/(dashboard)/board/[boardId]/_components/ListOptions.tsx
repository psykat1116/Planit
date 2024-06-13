"use client";
import { List } from "@prisma/client";
import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  CopyPlus,
  MoreHorizontal,
  PencilRuler,
  SquarePlus,
  Trash,
  X,
} from "lucide-react";
import FormButton from "@/components/form/FormButton";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { deleteList } from "@/actions/DeleteList";
import { toast } from "sonner";
import { copyList } from "@/actions/CopyList";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions: React.FC<ListOptionsProps> = ({ data, onAddCard }) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute: deleteExecute } = useAction(deleteList, {
    onSuccess: (d) => {
      toast.success(`List "${d.title}" deleted successfully`);
      closeRef.current?.click();
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const { execute: copyExecute } = useAction(copyList, {
    onSuccess: (d) => {
      toast.success(`List "${data.title}" copied successfully`);
      closeRef.current?.click();
    },
    onError: (e) => {
      toast.error(e);
    },
  });

  const handleDelete = () => {
    deleteExecute({ id: data.id, boardId: data.boardId });
  };

  const handleCopy = () => {
    copyExecute({ id: data.id, boardId: data.boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-1" side="bottom" align="center">
        <div className="flex items-center w-full">
          <div className="text-sm font-medium text-left text-neutral-600 py-2 pl-3 flex items-center">
            <PencilRuler className="h-5 w-5 mr-2" />
            List Actions
          </div>
          <PopoverClose asChild ref={closeRef}>
            <Button
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
        </div>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-3 justify-start font-normal text-sm"
          variant="ghost"
        >
          <>
            <SquarePlus className="h-4 w-4 mr-2" />
            Add Card
          </>
        </Button>
        <form action={handleCopy}>
          <FormButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-3 justify-start font-normal text-sm"
          >
            <CopyPlus className="h-4 w-4 mr-2" />
            Copy List
          </FormButton>
        </form>
        <Separator />
        <form action={handleDelete}>
          <FormButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-3 justify-start font-normal text-sm text-red-700 hover:text-red-700"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete List
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
