"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { createBoard } from "@/actions/CreateBoard";
import { toast } from "sonner";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Success", data);
      toast.success("Board created successfully");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Error creating board");
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    await execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormButton className="w-full">Submit</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
