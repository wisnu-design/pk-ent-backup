import Image from "next/image";
import React from "react";
import logo from "@/public/images/pkgroup.png";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full h-full bg-black lg:py-6 lg:px-16">
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
          
        </div>
        <div className="flex gap-2 lg:gap-0  lg:flex-row flex-col-reverse justify-between border-white border-t-2 mt-10 pt-3 p-2 lg:p-0">
          <div className="flex lg:flex-row flex-col-reverse gap-5 justify-between w-full pt-2">
            <div>
              <p className="text-white font-light text-[14px]">
                © 2025 PK Entertainment All Rights Reserved
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
