"use client";
import { ElementRef, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import FormInput from "@/components/form/FormInput";
import { updateBoard } from "@/actions/UpdateBoard";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (d) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(d.title);
      disabledEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const disabledEditing = () => setIsEditing(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={onSubmit}
      >
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 bg-transparent h-7 focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2 rounded-sm"
      variant="transparent"
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
