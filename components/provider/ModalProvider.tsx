"use client";
import CardModal from "@/components/modal/cardModal/CardModal";
import { useEffect, useState } from "react";
import SubscriptionModal from "@/components/modal/SubscriptionModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CardModal />
      <SubscriptionModal />
    </>
  );
};

export default ModalProvider;
