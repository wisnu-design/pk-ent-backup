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

  const toggleUpcoming = (value: any) => {
    setUpcoming(value);
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
      <div className="flex justify-center mb-8 pt-36">
        <button
          className={`${
            upcoming
              ? "bg-black/30 backdrop-blur-lg text-white"
              : "bg-white text-black"
          } px-4 py-2 rounded-l-lg shadow-xl transition-all`}
          onClick={() => toggleUpcoming(true)}
        >
          Upcoming Events
        </button>
        <button
          className={`${
            upcoming
              ? "bg-white text-black"
              : "bg-black/30 backdrop-blur-lg text-white"
          } px-4 py-2 rounded-r-lg shadow-xl transition-all`}
          onClick={() => toggleUpcoming(false)}
        >
          Past Events
        </button>
      </div>
      <div className="flex flex-wrap max-w-[1600px] h-screen mx-auto">
        {upcoming
          ? upcomingEvents.map((concert, index) => {
              return (
                <div key={index} className="transition-all">
                  <BrandCard
                    data={{
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
