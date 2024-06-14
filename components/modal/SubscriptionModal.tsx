"use client";

import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/actions/StripeRedirect";
import { toast } from "sonner";

const SubscriptionModal = () => {
  const { isOpen, onClose } = useSubscriptionModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/logo.jpg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade To Taskify Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore The Best Of Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced Checklists</li>
              <li>Admin and Security Features</li>
              <li>And More!</li>
            </ul>
          </div>
          <Button disabled={isLoading} onClick={onClick} className="w-full">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
