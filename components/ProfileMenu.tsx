"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { use, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import { SessionInterface } from "@/common.types";

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
        <div className="flexCenter z-10 flex-col relative ">
            {/* Toggle the menu when the image is clicked */}
            <div className="flexCenter sm: w-10 h-10" onClick={toggleMenu}>
                {session?.user?.image && (
                    <Image
                        src={session.user.image}
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                        alt="user profile image"
                    />
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
                <div className="absolute flexCenter px-10 py-10 right-10 top-24 ">
                    <div className=" flex flex-col absolute max-w-sm transform rounded-xl bg-white px-6 pb-2 pt-6 shadow-lg">
                        <div className="flex flex-col mb-2">
                            <Link href={`/profile/${session?.user?.id}`}>
                                <Image
                                    src={session.user.avatarUrl}
                                    width={43}
                                    height={43}
                                    className="rounded-full"
                                    alt="profile image"
                                />
                            </Link>
                            <h3 className=" text-md font-semibold text-slate-800 mt-2">
                                {session.user.name}
                            </h3>
                            <h3 className=" text-sm  text-slate-800 mt-2">
                                {session.user.email}
                            </h3>
                        </div>
                        <Link href={`/profile/${session?.user?.id}`}>
                            <h3 className=" text-sm  text-slate-800 mt-3 ">
                                Profile
                            </h3>
                        </Link>
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className=" px-3 py-2 mt-2 text-sm text-gray-800 bg-purple-100 text-slate-900 rounded-lg"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default ProfileMenu;
