"use client";
import React from "react";
import { stripeRedirect } from "@/actions/StripeRedirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const { onOpen } = useSubscriptionModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = async () => {
    if (isPro) {
      execute({});
    } else {
      onOpen();
    }
  };

  return (
    <Button disabled={isLoading} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};

export default SubscriptionButton;
