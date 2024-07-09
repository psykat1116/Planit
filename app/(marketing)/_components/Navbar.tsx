import React from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 h-14 px-4 border-b shadow-sm bg-white flex items-center w-full">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get Planit For Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
