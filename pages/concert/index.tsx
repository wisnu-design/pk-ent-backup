import Seo from "@/components/Seo";
import BrandCard from "@/components/molecules/BrandCard";
import EventCard from "@/components/molecules/EventCard";
import Footer from "@/components/organisms/Footer";

import Header from "@/components/organisms/Header";
import Pagination from "@/components/organisms/Pagination";
import SecondHeader from "@/components/organisms/SecondHeader";
import { Events } from "@/components/organisms/Stage";
import { api } from "@/lib/graphql/api";
import { QUERY } from "@/lib/graphql/query";
import React, { useState } from "react";

const Index = ({ concerts }: Events) => {
  const [upcoming, setUpcoming] = useState(true);
  const [title, setTitle] = useState("Upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const toggleUpcoming = (value: boolean, text: string) => {
    setUpcoming(value);
    setTitle(text);
    setCurrentPage(1);
  };

  const now = new Date();
  const events = upcoming
    ? concerts.filter((concert) => new Date(concert.eventDate) > now)
    : concerts.filter((concert) => new Date(concert.eventDate) <= now);

  const totalItems = events.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | Concerts`}
        metaDesc="Concerts of PK Entertainment"
        metaKey="Promotor Event"
      />
      <SecondHeader />
      <div className="flex justify-center pb-3 lg:pt-36 pt-20">
        <button
          className={`${
            upcoming
              ? "bg-black/30 border-white border-2  text-white font-bold "
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
              : "bg-black/30 border-white border-2  text-white font-bold "
          } px-4 py-2 rounded-r-lg  transition-all`}
          onClick={() => toggleUpcoming(false, "Past")}
        >
          {title === "Upcoming" ? "Past concert" : "Past concert"}
        </button>
      </div>
      <div className="max-w-[1370px] mx-auto pl-3 text-center text-white font-bold lg:text-3xl text-md pb-3">
        {title === "Upcoming" ? "Upcoming concert" : "Past concert"}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1280px]  justify-center items-center mx-auto pb-5 ">
        {currentItems.map((concert, index) => {
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
      <div className="flex justify-center pb-10 lg:pb-20">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
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
