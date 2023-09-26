"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { use, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import { SessionInterface } from "@/common.types";
import Button from "./Button";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openMenu, setOpenMenu] = useState(false);

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Function to close the menu when clicking anywhere outside of it
  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className=" flexCenter z-10  flex-col relative ">
      {/* Toggle the menu when the image is clicked */}
      <div className="flexCenter" onClick={toggleMenu}>
        {session?.user && (
          <button className="lg:p-3 lg:text-md lg:bg-purple-300 text-slate-900 rounded-lg sm:p-3 text-xs sm:text-base md:text-base "> Create Post </button>
        )}
      </div>

      <Transition
        show={openMenu}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* Close the menu when clicking anywhere outside of it */}
        <div onClick={closeMenu} className="fixed inset-0 z-50"></div>

        {/* Menu content */}
        <div className="absolute px-10 py-5 right-3 w-40">
          <div className=" flex lg:flex-row sm:flex-col absolute gap-2 max-w-sm transform rounded-xl bg-white px-6 pb-2 pt-6 shadow-lg">

            <Link href="/create-project">
              <button className=" text-sm font4bold text-slate-840 mt-2 p-2 px-2 rounded-md hover:text-purple-400">
                Project
              </button>
            </Link>
            <Link href="/surveycreate">
              <button className=" text-sm font4bold text-slate-840  mt-2 p-2 px-2 rounded-md hover:text-purple-400  ">
                Survey
              </button>
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileMenu;
