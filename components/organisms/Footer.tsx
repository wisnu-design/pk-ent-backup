import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.png";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full h-full bg-black/30 p-4">
      <div className="flex flex-col gap-5 items-center justify-start pt-6">
        <figure className="w-[300px] overflow-hidden">
          <Image src={logo} alt="PK Entertainment" width={1000} height={300} />
        </figure>
        <div className="text-white">
          <ul className="flex lg:flex-row flex-col gap-2 items-center cursor-pointer">
            <li>About Us</li>
            <li className="lg:block hidden">|</li>
            <li>Careers</li>
            <li className="lg:block hidden">|</li>
            <li>Partnership</li>
            <li className="lg:block hidden">|</li>
            <li>Terms & Conditions</li>
            <li className="lg:block hidden">|</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex flex-row text-white gap-10">
          <div>
            <BsTwitter />
          </div>
          <div>
            <BsFacebook />
          </div>
          <div>
            <BsInstagram />
          </div>
        </div>
        <div>
          <h3 className="text-white">Copyrights © 2023 PK Entertainment</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
