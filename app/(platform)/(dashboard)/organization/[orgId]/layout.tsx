import React from "react";
import OrgControl from "./_components/OrgControl";

const OrgIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgIdLayout;
