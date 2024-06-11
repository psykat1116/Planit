import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 trasition items-center gap-x-2 hidden md:flex">
        <Image
          src="/LogoLight.svg"
          alt="Logo"
          height={30}
          width={30}
          className="hidden dark:block"
        />
        <Image
          src="/LogoDark.svg"
          alt="Logo"
          height={30}
          width={30}
          className="dark:hidden"
        />
        <p className="text-lg text-neutral-700 font-semibold">Planit</p>
      </div>
    </Link>
  );
};

export default Logo;
