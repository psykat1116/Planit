"use client";
import { Card } from "@prisma/client";
import React from "react";

interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem: React.FC<CardItemProps> = ({ index, data }) => {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-[#232323] py-2 px-3 text-sm bg-white rounded-md shadow-sm"
    >
      {data.title}
    </div>
  );
};

export default CardItem;
