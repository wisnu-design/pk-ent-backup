import Image from "next/image";
import React, { Component, useCallback, useEffect, useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";

import { motion } from "framer-motion";

import logo from "@/public/images/logo.png";
import Navbaritems from "../molecules/Navbaritems";
import MobileNav from "../molecules/MobileNav";
import { useRouter } from "next/router";

type Props = {};

const TOP_OFFSET = 66;

const Header = (props: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <header className="flex w-full z-[100] fixed">
      <motion.nav
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={`px-4 md:px-16 py-1 flex flex-row items-center transition duration-500 w-full ${
          showBackground ? "bg-black bg-opacity-90" : ""
        }`}
      >
        <Image
          className="w-[40%] md:w-[30%] lg:w-[20%] cursor-pointer"
          src={logo}
          alt="PK Entertainment"
          onClick={handleClick}
        />
        <div className="lg:flex ml-8 gap-7 hidden">
          <Navbaritems />
        </div>
        <div className="lg:hidden flex flex-row items-center gap-7 ml-auto cursor-pointer relative">
          <BsSearch className="text-white" />
          <div
            onClick={toggleMobileMenu}
            className="flex gap-2 items-center relative"
          >
            <p className="text-white font-medium">Browse</p>
            <BsChevronDown
              className={`text-white font-medium mt-[2px] transition ${
                showMobileMenu ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <MobileNav visible={showMobileMenu} />
        </div>

        <div className="hidden lg:flex lg:flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="text-white font-bold" />
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
