import React from "react";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute h-full w-full bg-black bg-opacity-25" />
      {children}
    </div>
  );
};

export default ClerkLayout;
