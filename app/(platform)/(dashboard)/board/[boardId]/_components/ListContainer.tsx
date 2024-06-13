"use client";
import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/actions/UpdateListOrder";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/UpdateCardOrder";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const { execute: executeListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List Reorder Successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card Reorder Successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // User Moved List
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );

      setOrderedData(items);
      executeListOrder({ boardId, items });
    }

    // User Moved Card
    if (type === "card") {
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      // Check If Card Exist in Source List & Destination List
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // Moving Card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCard.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCard;
        setOrderedData(newOrderedData);

        executeCardOrder({ boardId, items: reorderedCard });
      } else {
        // Remove Card from Source List
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Add Card to Destination List
        movedCard.listId = destination.droppableId;

        // Add Card to Destination List
        destinationList.cards.splice(destination.index, 0, movedCard);

        // Update Order in Source List
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // Update Order in Destination List
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);

        executeCardOrder({ boardId, items: destinationList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
