import Seo from "@/components/Seo";
import BrandCard from "@/components/molecules/BrandCard";
import Footer from "@/components/organisms/Footer";
import SecondHeader from "@/components/organisms/SecondHeader";
import Pagination from "@/components/organisms/Pagination";
import agen62 from "@/public/images/agen62.jpg"
import React, { useState } from "react";

const Index = () => {
  const hardcodedConcerts = [
    {
      band: "Agen +62",
      title: "Semua Bisa Jadi Agen",
      slug: "/movies/agen62",
      thumbnail: {
        url: agen62
      },
      date: "3 July 2025",
      eventStage: "On Theater",
      eventDate: "2025-07-03",
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalItems = hardcodedConcerts.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hardcodedConcerts.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="max-w-[1370px] mx-auto pl-3 text-center text-white font-bold lg:text-3xl text-md pb-3 lg:pt-36 pt-20">
        Our Movies
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1280px] justify-center items-center mx-auto pb-5">
        {currentItems.map((concert, index) => {
          return (
            <div key={index} className="transition-all">
              <BrandCard
                data={{
                  band: concert.band,
                  title: concert.title,
                  slug: concert.slug,
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

export default Index;