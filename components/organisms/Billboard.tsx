import { EventData } from "@/lib/EventsData";
import React from "react";

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
import BillboardData from "../molecules/BillboardData";

export interface Events {
  data: EventData[];
}

const Billboard = ({ data }: any) => {
  SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);
  return (
    <>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 10000,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
        }}
      >
        {data.map((v: any, i: any) => {
          return (
            <div key={i}>
              {v.upcoming == true ? (
                <SwiperSlide key={i}>
                  <BillboardData
                    concert={{
                      title: v.title,
                      thumbnail: v.thumbnail,
                      description: v.description,
                      slug: v.slug,
                      tickets: v.tickets,
                    }}
                  />
                </SwiperSlide>
              ) : null}
            </div>
          );
        })}
      </Swiper>
    </>
  );
};

export default Billboard;
