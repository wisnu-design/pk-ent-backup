import Image from "next/image";
import React from "react";
import logo from "@/public/images/pkgroup.png";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full h-full bg-black/30 lg:py-6 lg:px-16">
      <div className="flex flex-col ">
        <div className="flex lg:flex-row flex-col gap-2 w-full justify-between items-start pt-2">
          <div className="flex flex-col lg:w-3/12 w-full">
            <figure className="w-[300px] pb-5">
              <Image
                src={logo}
                alt="PK Entertainment"
                width={1000}
                height={10}
                className="lg:w-full w-6/12 p-2 lg:p-0"
              />
            </figure>
            <div className="text-white w-8/12 pl-4 flex flex-col gap-5">
              <p className="text-white lg:text-[14px] text-[10px]">
                Office 88 Kota Kasablanka 9th Floor Unit G Jl. Casablanca Raya
                Kav. 88, Jakarta
              </p>
              <p className="text-white lg:text-[14px] text-[10px]">
                Phone: (021) 29475573
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start lg:w-4/12 lg:items-center w-full lg:pt-4 p-4">
            <h1 className="text-white font-medium text-[20px] pb-2">
              Get Connected
            </h1>
            <div className="flex ">
              <form className="flex flex-col gap-4" action="#">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full lg:p-2 py-0 text-[10px] lg:text-[16px] rounded-lg"
                />
                <div className="flex gap-2 items-start">
                  <input
                    type="checkbox"
                    name="agree"
                    className="mt-1"
                    id="agree"
                    required
                  />
                  <label
                    htmlFor="agree"
                    className="text-white lg:text-[14px] text-[10px]"
                  >
                    I would like PK Entertainment to send me information about
                    the latest events, information and offers.
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="bg-zinc-800/80 hover:bg-zinc-700/30 transition-all text-white lg:p-2 w-[150px] rounded-lg"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col lg:w-4/12 gap-3 w-full justify-center items-center h-[200px]">
            <div className="flex flex-col gap-4 lg:w-12/12 w-full items-center justify-center pt-3">
              <h2 className="text-white lg:text-[20px] text-[14px] font-bold">
                Follow Us
              </h2>
              <div className="flex gap-3 items-center cursor-pointer">
                <Link
                  target="_blank"
                  href={"https://www.facebook.com/PKentertainment.id/"}
                >
                  <BsFacebook className="lg:w-[35px] lg:h-[35px] w-[25px] h-[25px] rounded-full border-white border-[1px] p-2 text-white hover:bg-white hover:text-black transition-all" />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.instagram.com/pkentertainment.id/"}
                >
                  <BsInstagram className="lg:w-[35px] lg:h-[35px] w-[25px] h-[25px] rounded-full border-white border-[1px] p-2 text-white hover:bg-white hover:text-black transition-all" />
                </Link>
                <Link target="_blank" href={"https://twitter.com/PKEnt_ID"}>
                  <BsTwitter className="lg:w-[35px] lg:h-[35px] w-[25px] h-[25px] rounded-full border-white border-[1px] p-2 text-white hover:bg-white hover:text-black transition-all" />
                </Link>
                <Link
                  target="_blank"
                  href={
                    "https://www.youtube.com/channel/UCXvkwg_M5V3TFqdEvfLlnZw"
                  }
                >
                  <BsYoutube className="lg:w-[35px] lg:h-[35px] w-[25px] h-[25px] rounded-full border-white border-[1px] p-2 text-white hover:bg-white hover:text-black transition-all" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:w-12/12 w-full items-center justify-center mt-10 lg:mt-0">
              <h2 className="text-white lg:text-[20px] text-[14px] font-bold">
                Contact Us
              </h2>
              <div className="flex gap-3 text-white items-center cursor-pointer">
                <h3 className="lg:text-[16px] text-[12px]">
                  contact@pk-ent.com
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-0  lg:flex-row flex-col-reverse justify-between border-white border-t-2 mt-10 pt-3 p-2 lg:p-0">
          <div className="flex lg:flex-row flex-col-reverse gap-5 justify-between w-full pt-2">
            <div>
              <p className="text-white font-light text-[14px]">
                © 2023 PK Entertainment All Rights Reserved
              </p>
            </div>
            <div>
              <ul className="flex lg:gap-4 gap-2 text-white lg:text-[12px] text-[12px]">
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="#">Term & Conditions</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
