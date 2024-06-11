import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatFormLayout;
