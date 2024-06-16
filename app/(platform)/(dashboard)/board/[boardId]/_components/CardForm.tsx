"use client";
import React, { useRef, ElementRef, KeyboardEventHandler } from "react";
import { useParams } from "next/navigation";
import { createCard } from "@/actions/CreateCard";
import FormButton from "@/components/form/FormButton";
import FormTextarea from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  ref: React.RefObject<HTMLTextAreaElement>;
  isEditing: boolean;
  EnableEditing: () => void;
  DisableEditing: () => void;
  listId: string;
}

const CardForm: React.FC<CardFormProps> = ({
  ref,
  isEditing,
  EnableEditing,
  DisableEditing,
  listId,
}) => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} Created`);
      formRef.current?.reset();
      DisableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, listId, boardId: params.boardId as string });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      DisableEditing();
    }
  };

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  useOnClickOutside(formRef, DisableEditing);
  useEventListener("keydown", onKeyDown);

  if (isEditing) {
    return (
      <form
        className="m-1 py-0.5 px-1 space-y-4"
        ref={formRef}
        action={onSubmit}
      >
        <FormTextarea
          id="title"
          onKeyDown={onTextareaKeyDown}
          ref={ref}
          placeholder="Enter a Title For This Card"
          errors={fieldErrors}
        />
        <div className="flex items-center gap-x-1">
          <FormButton>Add Card</FormButton>
          <Button onClick={DisableEditing} size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="pt-2 px-2" onClick={EnableEditing}>
      <Button
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
};

export default CardForm;
