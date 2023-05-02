import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.png";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full h-full bg-black/30 py-6 px-16">
      <div className="flex flex-col">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col w-6/12">
            <figure className="w-[300px]">
              <Image
                src={logo}
                alt="PK Entertainment"
                width={1000}
                height={10}
              />
            </figure>
            <div className="text-white pt-5 w-6/12 pl-4 flex flex-col gap-5">
              <p className="text-white">
                Office 88 Kota Kasablanka 9th Floor Unit G Jl. Casablanca Raya
                Kav. 88, Jakarta
              </p>
              <p className="text-white">Phone: (021) 29475573</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-4/12">
            <div className="text-white font-black uppercase">
              <h1 className="text-[30px] py-10">Get Connected</h1>
            </div>
            <div className="flex ">
              <form className="flex flex-col gap-4" action="#">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-2 rounded-lg"
                />
                <div className="flex gap-2 items-start">
                  <input
                    type="checkbox"
                    name="agree"
                    className="mt-1"
                    id="agree"
                    required
                  />
                  <label htmlFor="agree" className="text-white">
                    I would like PK Entertainment to send me information about
                    the latest events, information and offers.
                  </label>
                </div>
                <button
                  className="bg-zinc-800/80 hover:bg-zinc-700/30 transition-all text-white p-2 rounded-lg"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-3/12 items-center">
            <h2 className="text-white text-[20px] font-bold">Follow Us</h2>
            <div className="flex gap-3 items-center cursor-pointer">
              <BsFacebook className="w-[50px] h-[50px] rounded-full border-white border-2 p-2 text-white hover:bg-white hover:text-black transition-all" />
              <BsInstagram className="w-[50px] h-[50px] rounded-full border-white border-2 p-2 text-white hover:bg-white hover:text-black transition-all" />
              <BsTwitter className="w-[50px] h-[50px] rounded-full border-white border-2 p-2 text-white hover:bg-white hover:text-black transition-all" />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-3/12">
            <h2 className="text-white text-[20px] font-bold">Contact Us</h2>
            <div className="flex gap-3 text-white items-center cursor-pointer">
              <h3>contact@pk-ent.com</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between border-white border-t-2 mt-10 pt-3">
          <div>
            <p className="text-white font-light text-[14px]">
              © 2023 PK Entertainment All Rights Reserved
            </p>
          </div>
          <div>
            <ul className="flex gap-4 text-white">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Term & Conditions</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
