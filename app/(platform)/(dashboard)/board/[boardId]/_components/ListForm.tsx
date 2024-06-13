"use client";
import React, { useState, useRef, ElementRef } from "react";
import ListWrapper from "./ListWrapper";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "@/components/form/FormInput";
import { useParams, useRouter } from "next/navigation";
import FormButton from "@/components/form/FormButton";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/CreateList";
import { toast } from "sonner";

const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success("List created successfully");
      DisableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const EnableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const DisableEditing = () => setIsEditing(false);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      DisableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, DisableEditing);

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            className="text-sm px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title"
          />
          <div className="flex items-center gap-x-1">
            <FormButton>Add List</FormButton>
            <Button
              onClick={DisableEditing}
              size="sm"
              variant="outline"
              className="flex items-center"
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <form className="w-full rounded-sm space-y-4 shadow-md">
        <button
          className="w-full rounded-sm bg-white/40 hover:bg-white/90 transition p-3 flex items-center font-medium text-sm"
          onClick={EnableEditing}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a List
        </button>
      </form>
    </ListWrapper>
  );
};

export default ListForm;
