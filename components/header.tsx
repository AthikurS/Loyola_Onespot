"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
// import Logo from "./logo";
// import Dropdown from "@/components/utils/dropdown";
import MobileMenu from "./mobile-menu";
import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import AskPostKind from "./AskPostKind";

interface Props {
  width?: string;
}

const Header = async (props: Props) => {
  const session = await getCurrentUser()
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  const links = [
    { txt: "Projects", link: "/create-project" },
    { txt: "Research", link: "/team" },
    { txt: "About", link: "/about" },
  ];



  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? "bg-white backdrop-blur-sm shadow-lg" : ""
        }`}
    >
      <div className={`${props.width || "max-w-full"} mx-auto px-5 sm:px-6`}>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className={`shrink-0`}>
            <Link href='/'>
              {/* <Image src='/new_head_logo.png' width={220} height={75} alt='logo' /> */}
              <h3 className="text-black text-3xl font-normal  ">LOYOLA<span className=" font-Pacifico italic font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-xl "> onespot</span></h3>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}

            <ul className='flex grow justify-end flex-wrap items-center'>
              {NavLinks.map((link) => (
                <Link href={link.href} key={link.text} className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                  {link.text}
                </Link>
              ))}


              <Link
                href="/signup">
                <span className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 "> Register</span>
              </Link>

            </ul>
          </nav>

          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}

export default Header