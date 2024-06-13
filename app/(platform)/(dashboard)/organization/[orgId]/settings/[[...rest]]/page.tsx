import React from "react";
import { OrganizationProfile } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              marginBottom: "1rem",
            },
            cardBox: {
              boxShadow: "none",
              border: "1px solid #e2e2e4"
            },
          },
        }}
      />
    </div>
  );
};

export default Page;
