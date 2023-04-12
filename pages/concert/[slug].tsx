import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import React from "react";

type Props = {};

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { api } from "@/lib/graphql/api";
import { CONCERT, QUERY, SLUGLIST } from "@/lib/graphql/query";
import SlugHeading, { SingleEvent } from "@/components/molecules/SlugHeading";
import Stage from "@/components/organisms/Stage";
import PlayButton from "@/components/atoms/PlayButton";
import ArtistInfo from "@/components/organisms/ArtistInfo";

export async function getStaticPaths() {
  const { concerts }: any = await api.request(SLUGLIST);
  return {
    paths: concerts.map((concert: any) => ({
      params: { slug: concert.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const slug: string = params.slug;
  const data: any = await api.request(CONCERT, { slug });
  const concert: string = data.concert;
  const { concerts }: any = await api.request(QUERY);

  return {
    props: {
      concerts,
      concert,
      revalidate: 0,
    },
  };
}

const Concert = ({ concert }: SingleEvent) => {
  SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);
  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | ${concert.title}`}
        metaDesc="PK Entertainment"
        metaKey="Event Organizer Promotor"
      />
      <Header />
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
        }}
      >
        <SwiperSlide>
          <SlugHeading
            concert={{
              title: concert.title,
              thumbnail: concert.thumbnail,
              eventStage: concert.eventStage,
              description: concert.description,
              city: concert.city,
              date: concert.date,
            }}
          />
        </SwiperSlide>
      </Swiper>

      <ArtistInfo
        concert={{
          title: concert.title,
          thumbnail: concert.thumbnail,
          eventStage: concert.eventStage,
          description: concert.description,
          city: concert.city,
          date: concert.date,
        }}
      />

      <Stage
        concert={{
          title: "Main Stage Layout",
          stageLayout: concert.stageLayout,
          date: concert.date,
          city: concert.city,
        }}
      />
    </>
  );
};

export default Concert;
