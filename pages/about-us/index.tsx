import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import Image from "next/image";
import React from "react";

import about1 from "@/public/images/about1.jpg";
import about2 from "@/public/images/1.jpg";
import kenny from "@/public/images/kenny.png";
import Seo from "@/components/Seo";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <Seo
        metaTitle="PK Entertainment | About Us"
        metaDesc="PK Entertainment"
        metaKey="Event Promotor"
      />
      <Header />
      <div className="relative h-[40.25vw]">
        <video
          className="w-full h-[56.25vw] md:h-[40vw] lg:h-[40vw] object-cover brightness-[30%] lg:rounded-b-[100px]"
          autoPlay
          loop
          muted={true}
          poster=""
          src="https://media.graphassets.com/Y3HaLw52TAOaRXKxr0AE?_gl=1*18gd3zw*_ga*MTA5ODQ3Mjk3MS4xNjc2MDA4MjY5*_ga_G6FYGSYGZ4*MTY4MzA5ODU1Ni41MS4xLjE2ODMwOTk3NDcuMjIuMC4w"
        ></video>
      </div>
      <div className="lg:mt-10 mt-20 h-full pb-10">
        <div className="max-w-[1600px] flex w-full gap-3 mx-auto text-white lg:p-0 p-5">
          <div className="flex flex-col lg:w-6/12">
            <h1 className="lg:text-[40px] font-bold">About Us</h1>
            <h2 className="lg:text-[24px] text-[12px] font-semibold ">
              PK Entertainment, Indonesia’s leading concert promoter and event,
              brand activation and creative agency was established in 2015.
            </h2>
            <p className="lg:text-[16px] text-[9px] mt-10">
              We are a combination of visionaries, strategists, and creators who
              come together to curate and present top notch quality events. Our
              unconventional thinking process engages with clients and their
              audience; ensuring that we meet all their requirements while
              maintaining their brand identity. We are an extension of your
              marketing team and we aim to create a memorable experience for
              your audience.
              <br />
              <br />
              With a collective experience of over 10 years, we have an
              impressive portfolio of handling some of the biggest concerts in
              Jakarta including Celine Dion, Ed Sheeran, Backstreet Boys, Shawn
              Mendes, Lany, Keshi and Westlife making us one of the biggest
              music promoters in Indonesia.
              <br />
              <br /> As an events, brand and creative agency; we have the
              experience of working together with multinational companies such
              as Google, Facebook, Instagram, YouTube, and Gojek delivering over
              200 offline events in the past 6 years. We also co-produced
              YouTube FanFest Indonesia (2015-2019), Anime Festival Asia, 40+ Go
              Food Festivals!
            </p>
            <div>
              <button className="bg-zinc-800 shadow-2xl text-white lg:text-[16px] text-[10px] px-7 py-3 mt-10 rounded-md font-medium hover:bg-white hover:text-black transition-all">
                Reach out of us!
              </button>
            </div>
          </div>
          <div className="lg:block hidden relative w-6/12 ">
            <div className="w-[400px] h-[400px] rounded-xl overflow-hidden absolute top-10 right-10">
              <Image
                className="w-full h-full object-cover"
                src={about2}
                alt="#"
                width={1000}
                height={10}
              />
            </div>
            <div className="w-[350px] h-[350px] absolute overflow-hidden rounded-xl bottom-10 left-36 border-white border-4">
              <Image
                className="object-cover w-full h-full"
                src={about1}
                alt="#"
                width={1000}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
      {/*
      <div className="pb-10 lg:mt-24">
        <div className="max-w-[1600px] flex flex-col items-center mx-auto text-white">
          <div className="flex justify-center pb-10">
            <h1 className="lg:text-[40px] font-bold">Our Team</h1>
          </div>
          <div className="w-full flex justify-center items-center flex-wrap gap-5">
            <div className="group lg:w-[350px] lg:h-[500px] w-[100px] h-[150px] rounded-xl overflow-hidden">
              <figure className="w-full lg:h-[400px] h-[100px] overflow-hidden">
                <Image
                  className="w-full brightness-75 group-hover:brightness-100 rounded-sm lg:h-full lg:object-cover group-hover:scale-110 transition-all"
                  src={kenny}
                  alt=""
                  width={1000}
                  height={10}
                />
              </figure>
              <div className="text-white bg-zinc-900 lg:group-hover:translate-y-[-30px] group-hover:translate-y-[-10px] rounded-sm transition-all p-2">
                <h3 className="font-bold lg:text-[32px] text-[10px]">
                  Kenny Harjani
                </h3>
                <p className="font-medium lg:text-[16px] text-[6px]">
                  Founder & CFO
                </p>
              </div>
            </div>
            <div className="group lg:w-[350px] lg:h-[500px] w-[100px] h-[150px] rounded-xl overflow-hidden">
              <figure className="w-full lg:h-[400px] h-[100px] overflow-hidden">
                <Image
                  className="w-full brightness-75 group-hover:brightness-100 rounded-sm lg:h-full lg:object-cover group-hover:scale-110 transition-all"
                  src={kenny}
                  alt=""
                  width={1000}
                  height={10}
                />
              </figure>
              <div className="text-white bg-zinc-900 lg:group-hover:translate-y-[-30px] group-hover:translate-y-[-10px] rounded-sm transition-all p-2">
                <h3 className="font-bold lg:text-[32px] text-[10px]">
                  Kenny Harjani
                </h3>
                <p className="font-medium lg:text-[16px] text-[6px]">
                  Founder & CFO
                </p>
              </div>
            </div>
            <div className="group lg:w-[350px] lg:h-[500px] w-[100px] h-[150px] rounded-xl overflow-hidden">
              <figure className="w-full lg:h-[400px] h-[100px] overflow-hidden">
                <Image
                  className="w-full brightness-75 group-hover:brightness-100 rounded-sm lg:h-full lg:object-cover group-hover:scale-110 transition-all"
                  src={kenny}
                  alt=""
                  width={1000}
                  height={10}
                />
              </figure>
              <div className="text-white bg-zinc-900 lg:group-hover:translate-y-[-30px] group-hover:translate-y-[-10px] rounded-sm transition-all p-2">
                <h3 className="font-bold lg:text-[32px] text-[10px]">
                  Kenny Harjani
                </h3>
                <p className="font-medium lg:text-[16px] text-[6px]">
                  Founder & CFO
                </p>
              </div>
            </div>
            <div className="group lg:w-[350px] lg:h-[500px] w-[100px] h-[150px] rounded-xl overflow-hidden">
              <figure className="w-full lg:h-[400px] h-[100px] overflow-hidden">
                <Image
                  className="w-full brightness-75 group-hover:brightness-100 rounded-sm lg:h-full lg:object-cover group-hover:scale-110 transition-all"
                  src={kenny}
                  alt=""
                  width={1000}
                  height={10}
                />
              </figure>
              <div className="text-white bg-zinc-900 lg:group-hover:translate-y-[-30px] group-hover:translate-y-[-10px] rounded-sm transition-all p-2">
                <h3 className="font-bold lg:text-[32px] text-[10px]">
                  Kenny Harjani
                </h3>
                <p className="font-medium lg:text-[16px] text-[6px]">
                  Founder & CFO
                </p>
              </div>
            </div>
            <div className="group lg:w-[350px] lg:h-[500px] w-[100px] h-[150px] rounded-xl overflow-hidden">
              <figure className="w-full lg:h-[400px] h-[100px] overflow-hidden">
                <Image
                  className="w-full brightness-75 group-hover:brightness-100 rounded-sm lg:h-full lg:object-cover group-hover:scale-110 transition-all"
                  src={kenny}
                  alt=""
                  width={1000}
                  height={10}
                />
              </figure>
              <div className="text-white bg-zinc-900 lg:group-hover:translate-y-[-30px] group-hover:translate-y-[-10px] rounded-sm transition-all p-2">
                <h3 className="font-bold lg:text-[32px] text-[10px]">
                  Kenny Harjani
                </h3>
                <p className="font-medium lg:text-[16px] text-[6px]">
                  Founder & CFO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}

      <Footer />
    </>
  );
};

export default index;
