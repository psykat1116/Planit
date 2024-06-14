"use client";
import { updateCard } from "@/actions/UpdateCard";
import FormButton from "@/components/form/FormButton";
import FormTextarea from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}

const Description = ({ data }: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card "${data.title}" Updated`);
      DisableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const EnableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const DisableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      DisableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, DisableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    if (description === data.description) return;
    execute({
      id: data.id,
      boardId: params.boardId as string,
      description,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full md:w-1/2">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-bold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} className="space-y-2" action={onSubmit}>
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
              ref={textareaRef}
              errors={fieldErrors}
            />
            <div className="space-x-2">
              <FormButton>Save</FormButton>
              <Button type="button" onClick={DisableEditing} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            role="button"
            onClick={EnableEditing}
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
