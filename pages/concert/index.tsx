import Seo from "@/components/Seo";
import BrandCard from "@/components/molecules/BrandCard";
import EventCard from "@/components/molecules/EventCard";
import Footer from "@/components/organisms/Footer";

import Header from "@/components/organisms/Header";
import { Events } from "@/components/organisms/Stage";
import { api } from "@/lib/graphql/api";
import { QUERY } from "@/lib/graphql/query";
import React, { useState } from "react";

const Index = ({ concerts }: Events) => {
  const [upcoming, setUpcoming] = useState(true);
  const [title, setTitle] = useState("Upcoming");

  const toggleUpcoming = (value: boolean, text: string) => {
    setUpcoming(value);
    setTitle(text);
  };

  const now = new Date();

  const upcomingEvents = concerts.filter(
    (concert) => new Date(concert.date) > now
  );
  const pastEvents = concerts.filter(
    (concert) => new Date(concert.date) <= now
  );

  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | Concerts`}
        metaDesc="Concerts of PK Entertainment"
        metaKey="Promotor Event"
      />
      <Header />
      <div className="flex justify-center mb-8 lg:pt-36 pt-20 ">
        <button
          className={`${
            upcoming
              ? "bg-black/30  text-white font-bold "
              : "bg-white text-black scale-90"
          } px-4 py-2 rounded-l-lg transition-all`}
          onClick={() => toggleUpcoming(true, "Upcoming")}
        >
          {title === "Upcoming" ? "Upcoming" : "Upcoming"}
        </button>
        <button
          className={`${
            upcoming
              ? "bg-white text-black scale-90"
              : "bg-black/30  text-white font-bold "
          } px-4 py-2 rounded-r-lg  transition-all`}
          onClick={() => toggleUpcoming(false, "Past")}
        >
          {title === "Upcoming" ? "Past concert" : "Past concert"}
        </button>
      </div>
      <div className="max-w-[1600px] mx-auto pl-3 text-white font-bold text-3xl pb-3">
        {title === "Upcoming" ? "Upcoming concert" : "Past concert"}
      </div>
      <div className="flex flex-wrap lg:flex-row flex-col max-w-[1600px] lg:h-screen h-full mx-auto pb-10 lg:pb-3">
        {upcoming
          ? upcomingEvents.map((concert, index) => {
              return (
                <div key={index} className="transition-all">
                  <BrandCard
                    data={{
                      band: concert.band,
                      title: concert.title,
                      slug: "/concert/" + concert.slug,
                      thumbnail: concert.thumbnail,
                      date: concert.date,
                      eventStage: concert.eventStage,
                    }}
                  />
                </div>
              );
            })
          : pastEvents.map((concert, index) => {
              return (
                <div key={index} className="transition-all">
                  <BrandCard
                    data={{
                      band: concert.band,
                      title: concert.title,
                      slug: "/concert/" + concert.slug,
                      thumbnail: concert.thumbnail,
                      date: concert.date,
                      eventStage: concert.eventStage,
                    }}
                  />
                </div>
              );
            })}
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const { concerts }: any = await api.request(QUERY);
  return {
    props: {
      concerts,
    },
    revalidate: 10,
  };
}

export default Index;
