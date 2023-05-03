import React from "react";
import PlayButton from "../atoms/PlayButton";
import Image from "next/image";

export interface EventData {
  title: string;
  description?: string;
  thumbnail: any;
  video?: any;
  eventStage?: string;
  date?: any;
  upcoming?: boolean;
  city?: string;
  slug?: string;
  stageLayout?: any;
}

export type SingleEvent = {
  concert: EventData;
};

const SlugHeading = ({ concert }: SingleEvent) => {
  return (
    <>
      <div className="relative h-[40.25vw]">
        {concert.video === null ? (
          <video
            className="w-full h-[56.25vw] md:h-[40vw] lg:h-[40vw] object-cover brightness-[30%] rounded-b-[100px]"
            autoPlay
            loop
            muted={false}
            poster={concert.thumbnail.url}
          ></video>
        ) : (
          <video
            className="w-full h-[56.25vw] md:h-[40vw] lg:h-[40vw] object-cover brightness-[30%] rounded-b-[100px]"
            autoPlay
            loop
            muted={false}
            poster={concert.thumbnail.url}
            src={concert.video.url}
          ></video>
        )}
      </div>
    </>
  );
};

export default SlugHeading;
