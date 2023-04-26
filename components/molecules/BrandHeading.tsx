import { Client } from "@/pages/brand-activation/[slug]";
import React from "react";

const BrandHeading = ({ client }: Client) => {
  return (
    <>
      <div className="relative h-[42vw]">
        <video
          className="w-full h-[56.25vw] md:h-[40vw] lg:h-[40vw] object-cover brightness-[30%] rounded-b-[100px]"
          autoPlay
          loop
          muted={false}
          poster={client.image.url}
        ></video>
      </div>
    </>
  );
};

export default BrandHeading;
