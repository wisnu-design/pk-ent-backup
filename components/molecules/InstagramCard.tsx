import Image from "next/image";
import React from "react";
import { BsHeartFill } from "react-icons/bs";

import imgPlaceHolder from "@/public/images/imgPlaceholder.png";
import Link from "next/link";

type Props = {
  caption: any;
  date: any;
  media_url: any;
  media_type: any;
  thumbnail_url: any;
  permalink: any;
};

const InstagramCard = (props: Props) => {
  const excerpt =
    props.caption.length > 150
      ? `${props.caption.slice(0, 150)}...`
      : props.caption;

  return (
    <div className="flex justify-center items-center lg:w-[15vw] lg:h-[15vw] h-[25vw] w-[26.5vw] relative overflow-hidden rounded-lg shadow-2xl group duration-200 ease-out">
      <figure className="w-full">
        {props.media_type === "VIDEO" ? (
          <video
            className="lg:w-[20vw] lg:h-[20vw] w-[35vw] h-[35vw] object-cover"
            autoPlay={false}
            loop
            muted
            poster={props.thumbnail_url}
            src={props.media_url}
          />
        ) : (
          <Image
            src={props.media_url}
            alt="thumbnail"
            width={1000}
            height={10}
          />
        )}
      </figure>
      <div className="absolute bg-zinc-800/50 lg:p-4 p-1 top-0 w-full h-full  group-hover:transition-all opacity-0 group-hover:opacity-100 flex  flex-col justify-between items-center backdrop-blur-lg  transition">
        <div>
          <h2 className="text-white lg:text-[16px] text-[8px] font-black">
            PK Entertainment
          </h2>
        </div>
        <div>
          <p className="text-white text-center lg:text-[10px] text-[6px]">
            {excerpt}{" "}
            <Link
              className="lg:text-[14px] text-[7px] font-bold"
              href={props.permalink}
              target="_blank"
            >
              Continue Reading
            </Link>
          </p>
        </div>
        <div className="flex gap-5">
          <h3 className="text-white lg:text-[14px] text-[6px]">{props.date}</h3>
          <div className="flex gap-2 items-center ">
            <BsHeartFill className="text-red-500 lg:text-[14px] text-[6px] mt-[1px]" />
            <h3 className="text-white lg:text-[14px] text-[6px]">123</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramCard;
