import Seo from "@/components/Seo";
import BrandCard from "@/components/molecules/BrandCard";
import EventCard from "@/components/molecules/EventCard";
import Footer from "@/components/organisms/Footer";

import Header from "@/components/organisms/Header";
import { Events } from "@/components/organisms/Stage";
import { api } from "@/lib/graphql/api";
import { QUERY } from "@/lib/graphql/query";
import React from "react";

export async function getStaticProps() {
  const { concerts }: any = await api.request(QUERY);
  return {
    props: {
      concerts,
    },
    revalidate: 10,
  };
}

const index = ({ concerts }: Events) => {
  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | Concerts`}
        metaDesc="Concerts of PK Entertainment"
        metaKey="Promotor Event"
      />
      <Header />
      <div className="flex flex-wrap max-w-[1600px] h-screen pt-36 mx-auto">
        {concerts
          ? concerts.map((concert, index) => {
              return (
                <div key={index}>
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
          : null}
      </div>
      <Footer />
    </>
  );
};

export default index;
