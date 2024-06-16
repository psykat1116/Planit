"use client";
import React, { useState, useRef, ElementRef } from "react";
import ListOptions from "./ListOptions";
import { useEventListener } from "usehooks-ts";
import { List } from "@prisma/client";
import FormInput from "@/components/form/FormInput";
import { useAction } from "@/hooks/useAction";
import { updateList } from "@/actions/UpdateList";
import { toast } from "sonner";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({ data, onAddCard }) => {
  const { execute } = useAction(updateList, {
    onSuccess: (d) => {
      toast.success(`Renamed To "${d.title}"`);
      setTitle(d.title);
      DisableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const EnableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const DisableEditing = () => setIsEditing(false);

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };
  useEventListener("keydown", onkeydown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) {
      DisableEditing();
      return;
    }
    execute({ title, id: data.id, boardId: data.boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter List Title"
            defaultValue={title}
            className="bg-transparent text-sm px-[7px] h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          onClick={EnableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {data.title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard}/>
    </div>
  );
};

export default ListHeader;
