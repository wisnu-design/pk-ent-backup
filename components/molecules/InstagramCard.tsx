import Image from "next/image";
import React from "react";
import { BsHeartFill } from "react-icons/bs";

import imgPlaceHolder from "@/public/images/imgPlaceholder.png";

type Props = {};

const InstagramCard = (props: Props) => {
  return (
    <div className="flex justify-center items-center lg:w-[15vw] lg:h-[15vw] h-[25vw] w-[26.5vw] bg-slate-300 relative overflow-hidden rounded-lg shadow-2xl group duration-200 ease-out">
      <figure className="w-full">
        <Image
          src={imgPlaceHolder}
          alt="Thumbnail"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </figure>
      <div className="absolute bg-zinc-800/50 p-4 top-0 w-full h-full  group-hover:transition-all opacity-0 group-hover:opacity-100 flex  flex-col justify-between items-center backdrop-blur-lg  transition">
        <div>
          <h2 className="text-white text-[16px] font-black">
            PK Entertainment
          </h2>
        </div>
        <div>
          <p className="text-white text-center text-[10px]">
            We hear you! RADWIMPS ASIAN TOUR 2023 IN JAKARTA IS MOVING TO A
            BIGGER VENUE RADWIMPS Asian Tour 2023 in Jakarta 30 July 2023 Tennis
            Indoor Senayan GBK Tribune A & B Ticket Holders are eligible to an
            upgrade to Tribune Center (new ticket category). Upgrade link has
            been sent to the registered email address upon ticket purchase.
            Upgrade request period is April 27th - May 1st 2023. Quota for
            upgrade is limited (first pay first serve basis). More tickets will
            also be available starting from May 8th 2023 at 10 a.m. (GMT+7 /
            Jakarta Local Time) at www.radwimpsinjakarta.com. This show is
            proudly promoted by @pkentertainment.id and SOZO.
            #RADWIMPSinJakarta2023
          </p>
        </div>
        <div className="flex gap-5">
          <h3 className="text-white">12 June 2023</h3>
          <div className="flex gap-2 items-center ">
            <BsHeartFill className="text-red-500 mt-[1px]" />
            <h3 className="text-white">123</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramCard;
