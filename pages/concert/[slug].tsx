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
import SlugHeading from "@/components/molecules/SlugHeading";
import Stage, { SingleEvent } from "@/components/organisms/Stage";
import PlayButton from "@/components/atoms/PlayButton";
import ArtistInfo from "@/components/organisms/ArtistInfo";
import Footer from "@/components/organisms/Footer";

export async function getServerSideProps({ params }: any) {
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
        metaDesc={`${concert.description}`}
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
          tickets: concert.tickets,
          upcoming: concert.upcoming,
          soldOut: concert.soldOut,
        }}
      />

      <Stage
        concert={{
          title: "Main Stage Layout",
          stageLayout: concert.stageLayout,
          date: concert.date,
          city: concert.city,
          tickets: concert.tickets,
          upcoming: concert.upcoming,
        }}
      />

      <Footer />
    </>
  );
};

export default Concert;
