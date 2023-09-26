import Link from "next/link";

import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import AskPostKind from "./AskPostKind";
import Image from "next/image";

const Navbar = async () => {
  const session = await getCurrentUser()

  return (
    <nav className='flexBetween  navbar'>
      <div className='flex-1 flexStart gap-10 lg:ml-5'>
        <div className="hidden sm:block md:block flex-row">
          <Link href='/'>
            <Image src='/loyola onespot final.svg' width={150} height={60} alt='logo' />

          </Link></div>

        <div className="flexCenter shrink">
          <ul className='xl:flex hidden flexBetween text-small gap-7 text-black'>
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.text} className=" hover:drop-shadow-sm  hover:text-purple-400 text-xs sm:text-base md:text-base">
                {link.text}
              </Link>
            ))}
          </ul></div>
      </div>

      <div className='md:flex hidden flexCenter gap-4'>
        {session?.user ? (
          <>
            <AskPostKind session={session} />
            <ProfileMenu session={session} />
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
