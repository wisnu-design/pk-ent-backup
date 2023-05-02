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
      <div className="group bg-zinc-900 col-span hover:scale-100 scale-[95%] transition relative lg:w-[400px] w-full rounded-xl">
        <Image
          className="w-full
              cursor-pointer
              object-cover
              transition
              duration
              shadow-xl
              delay-100
              lg:h-[16vw]
              rounded-t-xl
              "
          src={data.thumbnail.url}
          alt="Thumbnail"
          width={500}
          height={10}
        />
        <div className="bg-zinc-800/50 lg:backdrop-blur-lg w-full lg:h-[6vw] md:h-[5vw] lg:p-3 h-full p-2 rounded-b-xl shadow-xl overflow-hidden">
          <p className="text-white font-semibold lg:text-[16px] text-[16px]">
            {data.title}
          </p>
          <p className=" text-white font-semibold mt-4 text-[10px] lg:text-[14px]">
            {data.date}
          </p>
          <p className=" text-white font-semibold mt-2 text-[12px] lg:text-[16px]">
            {data.eventStage}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
