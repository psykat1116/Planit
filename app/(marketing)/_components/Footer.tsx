import React from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="fixed bottom-0 px-4 py-2 border-t bg-slate-100 w-full">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant="ghost">Privacy Policy</Button>
          <Button variant="ghost">Terms of Service</Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
