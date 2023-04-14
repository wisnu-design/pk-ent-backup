import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.png";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full h-44 bg-black/30">
      <div className="flex flex-col items-center justify-start pt-10">
        <figure className="w-[300px] overflow-hidden">
          <Image src={logo} alt="PK Entertainment" width={1000} height={300} />
        </figure>
        <div></div>
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
      </div>
    </div>
  );
};

export default Footer;
