"use client";
import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f1f4] shadow-md pb-2"
          >
            <ListHeader data={data} onAddCard={EnableEditing} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 && "mt-2"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem key={card.id} index={index} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              ref={textareaRef}
              isEditing={isEditing}
              EnableEditing={EnableEditing}
              DisableEditing={DisableEditing}
              listId={data.id}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
