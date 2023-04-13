import Link from "next/link";
import React from "react";

import { BsChevronCompactRight } from "react-icons/bs";

type Props = {};

const Highlight = (props: Props) => {
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
              Highlights
            </p>
          </div>
          <Link className="flex gap-2" href="#">
            <p className="text-white text-sm md:text-md lg:text-lg font-light mb-4">
              View All
            </p>
            <BsChevronCompactRight className="text-white lg:mt-[7px] md:mt-[3px] mt-[3px]" />
          </Link>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col bg-white w-full h-[56.25vw]">
        <div className="flex flex-col w-3/12 h-auto bg-cyan-400">
          <div className="w-full bg-slate-300">aa</div>
          <div className="w-full bg-slate-300">aa</div>
        </div>
        <div className="flex flex-col w-6/12 bg-cyan-500">aaa</div>
        <div className="flex flex-col w-3/12 bg-cyan-400">aaa</div>
      </div>
    </div>
  );
};

export default Highlight;
