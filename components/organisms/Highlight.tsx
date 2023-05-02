import Image from "next/image";
import Link from "next/link";
import React from "react";

import { BsChevronCompactRight } from "react-icons/bs";
import InstagramCard from "../molecules/InstagramCard";

type Props = {};

type data = {
  caption: any;
  date: any;
  media_url: any;
};

type Instagram = {
  datas: data[];
};

const Highlight = ({ datas }: Instagram) => {
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
              Social
            </p>
          </div>
          <Link className="flex gap-2" href="#">
            <p className="text-white text-sm md:text-md lg:text-lg font-light mb-4"></p>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 lg:flex-row w-full h-full"></div>
    </div>
  );
};

export default Highlight;
