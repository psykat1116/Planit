"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Description from "./Description";
import Action from "./Action";
import { AuditLog } from "@prisma/client";
import Activity from "./Activity";

const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal();
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/card/${id}`),
  });

  const { data: autditData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/card/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="flex gap-2 flex-col">
          <div className="w-full flex flex-col md:flex-row items-start gap-2 justify-start">
            {!cardData ? (
              <Description.Skeleton />
            ) : (
              <Description data={cardData} />
            )}
            {!cardData ? <Action.Skeleton /> : <Action data={cardData} />}
          </div>
          {!autditData ? (
            <Activity.Skeleton />
          ) : (
            <Activity items={autditData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
