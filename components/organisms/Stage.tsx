import { isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsChevronCompactRight } from "react-icons/bs";

interface EventData {
  title: string;
  description?: string;
  thumbnail?: any;
  video?: any;
  eventStage?: string;
  date?: any;
  upcoming?: boolean;
  city?: string;
  slug?: string;
  stageLayout?: any;
  tickets?: any;
  soldOut?: boolean;
}

export type SingleEvent = {
  concert: EventData;
};

const Stage = ({ concert }: SingleEvent) => {
  if (isEmpty(concert)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 max-w-[1600px] mx-auto pb-10">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
              {concert.title}
            </p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row md:flex-row flex-col w-full mx-auto justify-center gap-20 items-center ">
        <div className="lg:w-4/12 w-full flex justify-center">
          <figure className="lg:w-12/12 w-12/12 ">
            <Image
              className="w-full"
              src={concert.stageLayout.url}
              alt="Stage"
              width={1000}
              height={400}
            />
          </figure>
        </div>
        <div className="lg:w-6/12 w-full h-auto flex flex-col gap-6 bg-zinc-800  rounded-xl overflow-hidden shadow-xl">
          <div className="flex justify-between w-full">
            {concert.upcoming === true ? (
              <div className="bg-zinc-700 p-4 rounded-bl-lg cursor-pointer hover:bg-zinc-500 transition w-full">
                <p className="text-white text-center">Tickets</p>
              </div>
            ) : null}
            <div className="bg-zinc-700 py-4 px-4 rounded-br-lg cursor-pointer hover:bg-zinc-500 transition w-full">
              <p className="text-white text-center">Information</p>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-7">
            {concert.tickets.map((ticket: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex w-full flex-row items-start justify-between "
                >
                  {concert.upcoming === true ? (
                    <div className="w-full flex gap-10">
                      <div className="w-8/12 flex gap-10">
                        <div className=" flex flex-col">
                          <p className="text-white font-semibold">
                            {concert.date}
                          </p>
                          <p className="text-zinc-300 font-light">
                            {concert.city}
                          </p>
                        </div>

                        <div className="w-6/12 flex flex-col">
                          <p className="text-white font-semibold">
                            {ticket.type}
                          </p>
                          <p className="text-zinc-300 font-light text-sm">
                            Price exclude Government Tax 15% & Ticketing Admin
                            Fee 5%
                          </p>
                        </div>
                      </div>
                      <div className="w-4/12 flex items-center">
                        <Link
                          target="_blank"
                          className="flex "
                          href={ticket.ticketLink}
                        >
                          <p className="text-white font-semibold text-[20px]">
                            IDR {ticket.price}
                          </p>
                          <BsChevronCompactRight
                            className="text-white"
                            size={30}
                          />
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage;
