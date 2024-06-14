import React from "react";
import OrgControl from "./_components/OrgControl";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "Organization"),
  }
}

const OrgIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgIdLayout;
