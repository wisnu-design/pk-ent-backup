import { isEmpty } from "lodash";
import Link from "next/link";
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

import { BsChevronCompactRight } from "react-icons/bs";
import BrandCard from "../molecules/BrandCard";

interface BrandActivationProps {
  data: Record<string, any>[];
  title: string;
}

const BrandActivation = ({ data, title }: BrandActivationProps) => {
  SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
              {title}
            </p>
          </div>
          <Link className="flex gap-2" href="#">
            <p className="text-white text-sm md:text-md lg:text-lg font-light mb-4">
              View All
            </p>
            <BsChevronCompactRight className="text-white lg:mt-[7px] md:mt-[3px] mt-[3px]" />
          </Link>
        </div>
        <Swiper
          slidesPerView={3}
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          className="lg:h-[27vw] h-[40vw]"
        >
          {data.map((event, index) => (
            <SwiperSlide className="" key={index}>
              <BrandCard
                data={{
                  title: event.title,
                  slug: event.slug,
                  thumbnail: event.thumbnail,
                  date: event.date,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandActivation;
