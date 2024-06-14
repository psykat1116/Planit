"use client";
import { copyCard } from "@/actions/CopyCard";
import { deleteCard } from "@/actions/DeleteCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "@/types";
import { Copy, Settings, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ActionProps {
  data: CardWithList;
}

const Action = ({ data }: ActionProps) => {
  const params = useParams();
  const { onClose } = useCardModal();

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const handleCopy = () => {
    executeCopy({ id: data.id, boardId: params.boardId as string });
  };

  const handleDelete = () => {
    executeDelete({ id: data.id, boardId: params.boardId as string });
  };

  return (
    <div className="flex items-start gap-x-2 w-full md:w-1/2">
      <Settings className="h-6 w-6 mt-0.5 text-neutral-700 block" />
      <div className="w-full">
        <p className="font-bold text-neutral-700 mt-0.5">Actions</p>
        <div className="space-y-2 mt-1">
          <Button
            onClick={handleCopy}
            disabled={isLoadingCopy || isLoadingDelete}
            size="inline"
            variant="gray"
            className="w-full justify-start"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            disabled={isLoadingCopy || isLoadingDelete}
            onClick={handleDelete}
            size="inline"
            variant="gray"
            className="w-full justify-start"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

Action.Skeleton = () => {
  return (
    <div className="space-y-2 my-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

export default Action;
