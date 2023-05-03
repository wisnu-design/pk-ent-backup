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
import Image from "next/image";

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
              video: concert.video,
            }}
          />
        </SwiperSlide>
      </Swiper>
      <div className="lg:pt-44 lg:mt-0 -mt-44">
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
      </div>

      <div className="lg:hidden pb-10 max-w-[1600px] mx-auto lg:px-12 px-4 text-white">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
              <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                Event Desciption
              </p>
            </div>
          </div>
        </div>
        <div>{concert.band}</div>
        <div>{concert.title}</div>
        <div>{concert.eventStage}</div>
        <div>{concert.date}</div>
      </div>

      <Stage
        concert={{
          title: "Main Stage Layout",
          aboutThisEvent: concert.aboutThisEvent,
          stageLayout: concert.stageLayout,
          date: concert.date,
          city: concert.city,
          tickets: concert.tickets,
          upcoming: concert.upcoming,
        }}
      />

      {concert.upcoming !== true ? (
        <div className="max-w-[1600px] mx-auto lg:px-12 px-4 pb-32">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                  Highlights
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mt-5 ">
            <div className="flex w-full h-[37vw] lg:rounded-tl-[100px] lg:rounded-tr-[100px] rounded-md overflow-hidden relative">
              <video
                className="w-full absolute object-cover brightness-50"
                poster={concert.thumbnail.url}
                muted
                controls={true}
                src={concert.highlightVideo ? concert.highlightVideo.url : null}
              ></video>
            </div>
          </div>

          <div className="flex flex-row  flex-wrap w-full lg:gap-3 gap-5 mt-10 justify-center">
            {concert.highlightGalleries
              ? concert.highlightGalleries.map(
                  (gallery: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="lg:w-2/12 w-5/12 lg:h-[250px] h-[100px] rounded-xl overflow-hidden relative"
                      >
                        <Image
                          className="object-cover w-full h-full absolute bottom-0 hover:scale-110 transition-all"
                          src={gallery.url}
                          alt={concert.title}
                          width={1000}
                          height={10}
                        />
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  );
};

export default Concert;
