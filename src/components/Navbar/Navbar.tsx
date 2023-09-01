import Image from "next/image";
import Link from "next/link";
import { SessionInterface } from "@/constants/common.types";
import { NavLinks } from "@/constants/constants";
import ProfileMenu from "./ProfileMenu";
import Button from "../Button";

interface NavbarProps {
  session: SessionInterface
}

const Navbar = async ({session}: NavbarProps) => {
    
    
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
                <ProfileMenu session={session} />
                <Link href={'/create-project'}>share work</Link>
                </>
            ): (
              <Link href={'/auth'}>
                <Button title="login" type="button" />
              </Link>
            )}
      </div>
    </nav>
  );
};

export default Navbar;
