import React from "react";
import Navbar from "./_components/Navbar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashBoardLayout;
