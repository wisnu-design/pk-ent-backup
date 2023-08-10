import { divide, isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";

interface EventData {
  profilePicture?: any;
  band?: string;
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
  color?: any;
  tickets?: any;
  soldOut?: boolean;
  highlightVideo?: any;
  highlightGalleries?: any;
  aboutThisEvent?: any;
  eventDate?: any;
}

export type SingleEvent = {
  concert: EventData;
};

export type Events = {
  concerts: EventData[];
};

const Stage = ({ concert }: SingleEvent) => {
  const [information, setInformation] = useState(true);

  const toggle = (value: any) => {
    setInformation(value);
  };

  if (isEmpty(concert)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 pt-16 max-w-[1600px] mx-auto pb-36">
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
              <div
                className="bg-zinc-700 p-4 rounded-bl-lg cursor-pointer hover:bg-zinc-500 transition w-full"
                onClick={() => {
                  toggle(true);
                }}
              >
                <p className="text-white text-center">Tickets</p>
              </div>
            ) : null}
            <div
              className="bg-zinc-700 py-4 px-4 rounded-br-lg cursor-pointer hover:bg-zinc-500 transition w-full"
              onClick={() => {
                toggle(false);
              }}
            >
              <p className="text-white text-center">Information</p>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-2">
            {concert.upcoming === true ? null : information ? (
              concert.aboutThisEvent.html ? (
                <span
                  className="text-white lg:text-[14px] text-[10px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      concert.aboutThisEvent.html !== null
                        ? concert.aboutThisEvent.html
                        : "test",
                  }}
                ></span>
              ) : null
            ) : null}
            {information ? (
              concert.tickets.map((ticket: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-row items-start justify-between "
                  >
                    {concert.upcoming === true ? (
                      <div className="w-full justify-between flex gap-10">
                        <div className="lg:w-6/12 w-7/12 flex gap-10">
                          <div className=" flex flex-col">
                            <p className="text-white font-semibold">
                              {ticket.type}
                            </p>
                            <p className="text-zinc-300 font-light">
                              {ticket.type === "COMING SOON"
                                ? "COMING SOON"
                                : concert.date}
                            </p>
                          </div>
                        </div>
                        <div className="lg:w-6/12 w-full flex justify-center items-center">
                          <button
                            className={` hover:bg-yellow-600 text-white lg:text-[14px] text-[14px] font-semibold py-2 px-4 lg:w-9/12 w-full lg:rounded-full rounded-md inline-flex items-center`}
                          >
                            <svg
                              className="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2v8a2 2 0 0 1-2 2H4v10h16V12h-8a2 2 0 0 1-2-2V2z" />
                              <path d="M14 2v8a2 2 0 0 0 2 2h6V2h-8z" />
                              <line x1="4" y1="22" x2="20" y2="22" />
                            </svg>
                            {ticket.type === "COMING SOON"
                              ? ticket.price
                              : `IDR ${ticket.price}`}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <div>
                <span
                  className="text-white lg:text-[14px] text-[10px]"
                  dangerouslySetInnerHTML={{
                    __html: concert.aboutThisEvent.html,
                  }}
                ></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage;
