import { NavLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/libs/session";

const Navbar = async () => {
    const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src={"/logo.svg"} alt="Logo" width={150} height={43} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((navLink) => (
            <Link href={navLink.href} key={navLink.key}>
              {navLink.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
            {session?.user ? (
                <>
                {session?.user?.image && (
                  <Link href={`profile/user/${session?.user?.id}`}>
                  <Image className="rounded-full" src={session?.user?.image} alt={session?.user?.name} width={50} height={50} />
                  </Link>
                  )
                }
                <Link href={'/create-project'}>
                    share work
                </Link>
                </>
            ): (
                <AuthProviders />
            )}
      </div>
    </nav>
  );
};

export default Navbar;
