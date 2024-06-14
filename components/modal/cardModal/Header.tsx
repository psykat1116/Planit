"use client";
import { updateCard } from "@/actions/UpdateCard";
import FormInput from "@/components/form/FormInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

const Header = ({ data }: HeaderProps) => {
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(data.title);
  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card Renamed To "${data.title}"`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onBlur = () => {
    if (title !== data.title) {
      inputRef.current?.form?.submit();
    }
  };

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) return;
    execute({
      id: data.id,
      boardId: params.boardId as string,
      title,
    });
  };

  return (
    <div className="flex items-start gap-x-3 mb-2 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutal-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Header;
