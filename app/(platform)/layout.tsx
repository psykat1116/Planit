import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ModalProvider from "@/components/provider/ModalProvider";
import QueryProvider from "@/components/provider/QueryProvider";

const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatFormLayout;
