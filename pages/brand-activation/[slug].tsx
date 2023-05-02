import Seo from "@/components/Seo";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { api } from "@/lib/graphql/api";
import { CLIENT, QUERY } from "@/lib/graphql/query";
import Image from "next/image";
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
import BrandHeading from "@/components/molecules/BrandHeading";
import Link from "next/link";

export interface Brands {
  band?: string;
  title: string;
  slug: any;
  thumbnail?: any;
  gallery?: any;
  description?: string;
  eventStage?: string;
  date?: string;
  city?: string;
}

export interface Brand {
  brand: Brands;
}

export interface ClientData {
  name: string;
  slug: string;
  image?: any;
  thumbnail?: any;
  brands?: Brands[] | any;
}

export type Client = {
  client: ClientData;
};

export async function getServerSideProps({ params }: any) {
  const slug: string = params.slug;
  const data: any = await api.request(CLIENT, { slug });
  const client: any = data.client;

  return {
    props: {
      client,
    },
  };
}

const Client = ({ client }: Client) => {
  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | Brand Activation | ${client.name}`}
        metaDesc={`Brand Activation of ${client.name} PK Entertainment`}
        metaKey={client.name}
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
          <BrandHeading
            client={{
              name: client.name,
              slug: client.slug,
              image: client.image,
            }}
          />
        </SwiperSlide>
      </Swiper>
      <div className="text-white h-full flex gap-4 max-w-[1600px] mx-auto flex-wrap">
        {client.brands
          ? client.brands.map((brand: any, index: number) => {
              return (
                <div key={index}>
                  <Link href={`event/${brand.slug}`}>
                    <Image
                      className="w-[780px]"
                      src={brand.thumbnail ? brand.thumbnail.url : null}
                      alt={brand.title}
                      width={1000}
                      height={100}
                    />
                    <h1>{brand.title}</h1>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
      <Footer />
    </>
  );
};

export default Client;
