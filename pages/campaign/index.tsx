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
import Link from "next/link";
import { api } from "@/lib/graphql/api";
import { CONCERT, QUERY, SLUGLIST } from "@/lib/graphql/query";
import SlugHeading from "@/components/molecules/SlugHeading";
import Stage, { SingleEvent } from "@/components/organisms/Stage";
import PlayButton from "@/components/atoms/PlayButton";
import ArtistInfo from "@/components/organisms/ArtistInfo";
import Footer from "@/components/organisms/Footer";
import Image from "next/image";
import SoldOut from "@/components/atoms/SoldOut";
import image1 from "@/public/images/image1.jpg";
import profile from "@/public/images/profile.jpg";
import image2 from "@/public/images/image2.jpg";
import image3 from "@/public/images/image3.jpg";
import image4 from "@/public/images/image4.jpg";
import image5 from "@/public/images/image5.jpg";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { useState } from "react";

const Index = () => {
  SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

  const images = [image1, image2, image3, image4, image5];
  const [mainImage, setMainImage] = useState(images[0]);

  const concert = {
    profilePicture: { url: profile },
    title: "#SetahunTanpaWar",
    eventStage: " ",
    description: `Kita mau ucapin terima kasih nih untuk segala dukungan dan saran kalian kepada kami selama ini! Kita akan terus berusaha untuk berikan yang terbaik kedepannya❤❤❤

Yuk ikut giveaway kita dan dapatkan kesempatan spesial akses #SetahunTanpaWar dan voucher 1 juta buat beli tiket konser PK Entertainment dan TEM Presents sepanjang tahun 2025. Jangan sampai ketinggalan ya!! Goodluck🍀✨
`,
    band: " ",
    city: ` `,
    date: "17 Desember 2024 - 17 Januari 2025",
    tickets: [{ ticketLink: "https://instagram.com" }],
    isFestival: false,
    upcoming: true,
    soldOut: false,
    vide: {
      url: "/images/vid.mp4",
    },
    thumbnail: {
      url: image1,
    },
  };

  return (
    <>
      <Seo
        metaTitle={`PK Entertainment`}
        metaDesc={`PK Entertainment`}
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
          <div className="relative lg:h-[45.25vw]">
            <video
              className="w-full h-[56.25vw] md:h-[40vw] lg:h-[40vw] object-cover brightness-[30%] lg:rounded-b-[100px]"
              id="video"
              autoPlay
              loop
              muted={true}
              src="/images/vid.mp4"
            ></video>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="lg:pt-44 lg:mt-0 -mt-44">
        <div className=" w-ful lg:pb-96 pb-48 -mt-[30%] relative">
          <div className="hidden lg:block absolute w-full top-0 text-white z-50">
            <div className=" md:w-[80%]  mx-auto h-auto rounded-[50px] overflow-hidden bg-zinc-400/30 backdrop-blur-xl">
              <div className="flex lg:flex-row flex-col gap-6 p-8 w-full items-center">
                <div className="w-4/12 h-auto flex justify-center items-center">
                  <figure className="w-64 h-64 rounded-full bg-zinc-400/10 backdrop-blur-lg overflow-hidden relative">
                    <Image
                      src={concert.profilePicture.url}
                      alt="Profile Band/Artis Picture"
                      width={1000}
                      height={100}
                      className="w-[100%] h-[100%] object-cover absolute bottom-0"
                    />
                  </figure>
                </div>
                <div className="w-8/12 h-auto flex flex-col gap-2">
                  <div>
                    <p className="font-bold text-[30px]">{concert.title}</p>
                  </div>
                  <div className="w-full h-1 bg-zinc-500/20 rounded-full"></div>
                  <div>
                    <p>{concert.date}</p>
                  </div>
                  <div>
                    <p className="font-medium text-xl">
                      {concert.eventStage} <span className="font-light">|</span>{" "}
                      {concert.city}
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-zinc-300">
                      {concert.description}
                    </p>
                  </div>
                  <div className="text-black mt-3">
                    {concert.upcoming === true ? (
                      concert.soldOut === true ? (
                        <div></div>
                      ) : !concert.tickets ? null : (
                        <Link target="_blank" href="blabla">
                          <button
                            className="
                      bg-white 
                      rounded-md 
                      py-1 md:py-2 
                      px-2 md:px-4
                      w-auto 
                      text-xs lg:text-lg 
                      font-semibold
                      flex
                      flex-row
                      items-center
                      hover:bg-neutral-300
                      transition
                      gap-2
                      backdrop-blur-sm
                      "
                          >
                            <BsFillTicketPerforatedFill className="mt-[1px]" />
                            Join Now
                          </button>
                        </Link>
                      )
                    ) : null}

                    {/*concert.upcoming === true  //jika Upcoming true
                  ? 
                    concert.soldOut === true //true Upcoming state
                    ? <SoldOut /> 
                    : <PlayButton /> 

                  : concert.soldOut === true  //false upcoming state
                    ? "nih" 
                    : concert.soldOut === false ? "iya" : null */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-center items-center">
            <figure className="rounded-full w-[300px] h-[300px] overflow-hidden shadow-xl">
              <Image
                className="w-full object-cover h-full"
                src={concert.profilePicture.url}
                alt="aa"
                width={1000}
                height={100}
              />
            </figure>
          </div>
          <div className="mt-5">
            <div className="font-bold text-[20px]">{concert.band}</div>
            <div className=" font-semibold text-[18px]">{concert.title}</div>
            <div>{concert.eventStage}</div>
            <div>{concert.date}</div>
            <div className="mt-5">{concert.description}</div>
            <div className="text-black mt-3">
              {concert.upcoming === true ? (
                concert.soldOut === true ? (
                  <SoldOut />
                ) : !concert.tickets ? null : concert.isFestival == true ? (
                  <PlayButton
                    target={"_blank"}
                    link={concert.tickets[0].ticketLink}
                    text={"More Info"}
                  />
                ) : (
                  <PlayButton
                    target={"_blank"}
                    link={concert.tickets[0].ticketLink}
                  />
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto lg:px-12 px-4 pb-32 lg:-mt-16 mt-0">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
              <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                Term & Conditions
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full  ">
          <div className="flex w-full h-full   overflow-hidden relative">
            <div className="flex flex-col items-center gap-5">
              {/* Gambar Utama */}
              <div className="w-full lg:w-10/12 h-full relative rounded-2xl overflow-hidden">
                <Image
                  src={mainImage}
                  alt="Main Image"
                  className=" w-full object-cover"
                />
              </div>

              {/* Grid Thumbnail */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)} // Mengatur gambar utama
                    className="w-[100px] h-[100px] relative hover:opacity-80 transition"
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md shadow-md"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;
