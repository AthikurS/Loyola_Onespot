"use client";

import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
  return (
    <section className="flexStart flex-col pt-1 px-10 justify-center items-center h-screen w-full ">

      <div className="mt-20 lg:text-md  text-slate-600 lg:tracking-wide md:tracking-normal text-center">
        <p>
          Unlocking Innovation Through Shared Wisdom.{" "}
          <span className="text-md font-bold text-black">
            Discover, Collaborate, Evolve.
          </span>
        </p>
      </div>

      <div className="text-3xl sm:text-3xl md:text-3xl lg:text-8xl font-black mt-16 bg-gradient-to-r from-purple-500 from-10% via-rose-500 via-50% to-orange-400 to-60% text-transparent bg-clip-text bg-300% animate-gradient text-shadow-2xl shadow-blue-500/20">
        <p>Learn.Develop.Share</p>
      </div>

      <div className="lg:tracking-widest text-center mt-10 font-medium leading-loose md:text-md md:tracking-normal text-sm sm:text-base md:text-base">
        <p>
          Share Projects, Research Papers, and Surveys. Connect with Wider
          Audience. <br />
          Explore New Projects and Research. <br />
          Collaborate for Progress.
        </p>
      </div>

      <div className="mt-20 mb-36">
        <Link href="/initialprojectload">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-rose-500 group-hover:from-purple-500 group-hover:to-rose-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
            <span className="relative text-slate-900 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white ">
              Get Started
            </span>
          </button>
        </Link>
      </div>

    </section>);
};

export default Home;


