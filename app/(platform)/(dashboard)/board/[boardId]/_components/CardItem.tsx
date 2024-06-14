"use client";
import { Card } from "@prisma/client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/useCardModal";

interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem: React.FC<CardItemProps> = ({ index, data }) => {
  const { onOpen } = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          onClick={() => onOpen(data.id)}
          role="button"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate border-2 border-transparent hover:border-[#232323] py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
