import { Brands } from "@/pages/brand-activation/[slug]";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";

type BrandCard = {
  data: Brands;
};

const BrandCard = ({ data }: BrandCard) => {
  return (
    <Link href={data.slug}>
      <div className="group bg-zinc-900 col-span hover:scale-100 scale-[95%] transition w-full  rounded-xl">
        <Image
          className="w-full
              cursor-point
              h-full
              transition
              duration
              shadow-xl
              delay-100
              
              rounded-t-xl
              "
          src={data.thumbnail.url}
          alt="Thumbnail"
          width={500}
          height={10}
        />
        <div className="bg-zinc-800/50 flex flex-col justify-between lg:backdrop-blur-lg w-full lg:h-[170px] md:h-[15vw] lg:p-3 h-full p-2 rounded-b-xl shadow-xl overflow-hidden">
          <div>
          <p className="text-white font-semibold lg:text-[20px] text-[16px]">
            {data.band}
          </p>
          <p className="text-white font-normal lg:text-[16px] text-[12px]">
            {data.title}
          </p>
          </div>
          <div>
          <p className=" text-white font-semibold mt-4 text-[10px] lg:text-[16px]">
            {data.date}
          </p>
          <p className=" text-white font-semibold  text-[12px] lg:text-[16px]">
            {data.eventStage}
          </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
