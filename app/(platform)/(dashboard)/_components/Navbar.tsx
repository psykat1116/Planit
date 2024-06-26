import React from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import FormPopover from "@/components/form/FormPopover";

const Navbar = () => {
  return (
    <nav className="px-4 fixed z-50 top-0 w-full h-16 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="hidden md:flex">
        <Logo />
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #f5f5f5",
                borderRadius: "0.3rem",
              },
            },
          }}
        />
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            variant="outline"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            size="sm"
            className="rounded-sm md:hidden block"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 25,
                width: 25,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
