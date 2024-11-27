import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import Image from "next/image";
import React from "react";

import about1 from "@/public/images/about1.jpg";
import about2 from "@/public/images/1.jpg";
import kenny from "@/public/images/kenny.png";
import Seo from "@/components/Seo";
import Link from "next/link";

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
          src="https://media.graphassets.com/lqhbsRM1TX2UXHNTECnC"
        ></video>
      </div>
      <div className="lg:mt-10 mt-20 h-full pb-10 max-w-[1370px] mx-auto px-5">
        <div className="max-w-[1600px] flex w-full gap-3 mx-auto text-white lg:p-0 p-5">
          <div className="flex flex-col lg:w-6/12">
            <h1 className="lg:text-[40px] font-bold">About Us</h1>
            <h2 className="lg:text-[24px] text-[12px] font-semibold ">
              With nearly a decade of expertise, PK Entertainment Group is a
              driving force in Indonesia&apos;s entertainment landscape. Our
              diverse offerings, including PK Entertainment for international
              music tours, PK Music for local artists, and PK Events for
              comprehensive event solutions, have reached audiences across the
              nation.
            </h2>
            <p className="lg:text-[16px] text-[9px] mt-10">
              PK Entertainment
              <br />
              <br /> Since 2015, PK Entertainment has been at the forefront of
              Indonesia&apos;s concert scene. We&apos;ve delivered unforgettable
              experiences with over 25 world-class performances such as Bruno
              Mars, Coldplay, Celine Dion, Ed Sheeran, Backstreet Boys, Shawn
              Mendes, LANY, Keshi, Westlife, Calum Scott, Charlie Puth and Tom
              Jones. Beyond international stars, we also boast a strong track
              record of showcasing leading Japanese and Korean musicians,
              including ONE OK ROCK, RADWIMPS, Fujii Kaze, ADO, Eve and
              BABYMONSTER. Get ready to be part of something extraordinary as we
              reach a monumental milestone of entertaining 1 million fans
              nationwide.
              <br />
              <br />
              Instagram:
              <Link href={"https://www.instagram.com/pkentertainment.id/"}>
                @pkentertainment.id
              </Link>
              <br />
              <br />
              PK Music
              <br />
              <br />
              PK Music is redefining the live music experience in Indonesia.
              With a sold-out Sheila on 7 tour as our launchpad, we&apos;re
              committed to bringing the best of Indonesian music to fans
              nationwide. Our journey has just begun, and we can&apos;t wait to
              share what&apos;s next.
              <br />
              <br />
              Instagram:
              <Link href={"https://www.instagram.com/pkmusic.id/"}>
                @pkmusic.id
              </Link>
              <br />
              <br />
              PK Events
              <br />
              <br />
              Since 2015, PK Events has been crafting more than 300
              extraordinary events across Indonesia. Our expertise spans
              summits, CxO dinners, festivals, awards shows, and roadshows. With
              a proven track record and a clientele that includes industry
              leaders like Google, YouTube, WhatsApp, Instagram, Meta,
              Bytedance, Spotify, GoTo and Netflix, we are your trusted partner
              for creating unforgettable experiences.
              <br />
              <br />
              Instagram:
              <Link href={"https://www.instagram.com/pkevents.id/"}>
                @pkevents.id
              </Link>
            </p>
            <div>
              <Link href={"/contact-us"}>
                <button className="bg-zinc-800 shadow-2xl text-white lg:text-[16px] text-[10px] px-7 py-3 mt-10 rounded-md font-medium hover:bg-white hover:text-black transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:block hidden relative w-6/12 ">
            <div className="w-[400px] h-[400px] rounded-xl overflow-hidden absolute top-52 right-10">
              <Image
                className="w-full h-full object-cover"
                src={about2}
                alt="#"
                width={1000}
                height={10}
              />
            </div>
            <div className="w-[350px] h-[350px] absolute overflow-hidden rounded-xl bottom-56 left-36 border-white border-4">
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
