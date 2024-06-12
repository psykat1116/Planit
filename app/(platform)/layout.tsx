import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatFormLayout;
