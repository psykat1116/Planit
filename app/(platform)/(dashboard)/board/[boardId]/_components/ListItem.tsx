"use client";
import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem: React.FC<ListItemProps> = ({ index, data }) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const DisableEditing = () => setIsEditing(false);
  const EnableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f1f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={EnableEditing} />
        <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2",data.cards.length > 0 && "mt-2")}>
          {data.cards.map((card, index)=>(
            <CardItem key={card.id} index={index} data={card}/>
          ))}
        </ol>
        <CardForm
          ref={textareaRef}
          isEditing={isEditing}
          EnableEditing={EnableEditing}
          DisableEditing={DisableEditing}
          listId={data.id}
        />
      </div>
    </li>
  );
};

export default ListItem;
