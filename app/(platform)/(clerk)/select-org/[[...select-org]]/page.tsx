import React from "react";
import { OrganizationList } from "@clerk/nextjs";

const Page = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
};

export default Page;
