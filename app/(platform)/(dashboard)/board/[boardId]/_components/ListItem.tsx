"use client";
import { ListWithCards } from "@/types";
import React from "react";
import ListHeader from "./ListHeader";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem: React.FC<ListItemProps> = ({ index, data }) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f1f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
