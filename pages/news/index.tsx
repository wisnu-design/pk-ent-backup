import Seo from "@/components/Seo";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import React from "react";
import { motion } from "framer-motion";
import imgPlaceholder from "@/public/images/imgPlaceholder.png";
import Image from "next/image";
import { api } from "@/lib/graphql/api";
import { NEWS } from "@/lib/graphql/query";
import Link from "next/link";
import SecondHeader from "@/components/organisms/SecondHeader";

export type New = {
  title: string;
  slug: string;
  description: string;
  image: any;
  featured: boolean;
  video?: any;
  article?: any;
};

export type News = {
  news: New[];
  description?: any;
};

export type NewSingle = {
  newSingle: New;
};

export async function getStaticProps() {
  const { news }: any = await api.request(NEWS);
  return {
    props: {
      news,
    },
    revalidate: 10,
  };
}

const index = ({ news }: News) => {
  return (
    <div>
      <Seo
        metaTitle="PK Entertainment | News"
        metaDesc="PK Entertainment News"
        metaKey="event promotor"
      />
      <SecondHeader />
      <div className="max-w-[1380px] mx-auto h-full pt-36 pb-20 lg:px-0 px-3">
        <div className="w-full">
          <h1 className="lg:text-[70px] text-[30px] text-white font-black">
            Latest News
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black w-[200px] h-[5px] -mt-4 lg:block hidden"
          ></motion.div>
        </div>

        <div className="w-full flex flex-col mt-5">
          <div className="lg:flex flex-wrap flex-row w-full mt-5 gap-3">
            {news.map((v, i: number) => {
              return (
                <div
                  key={i}
                  className={
                    v.featured === true
                      ? "w-full bg-zinc-800/50  rounded-xl overflow-hidden backdrop-blur-lg lg:flex lg:flex-row-reverse"
                      : "bg-zinc-800/50 backdrop-blur-lg hidden lg:flex flex-col p-8 w-3/12 h-[400px] rounded-xl"
                  }
                >
                  <div
                    className={v.featured === true ? "lg:w-6/12 w-full" : ""}
                  >
                    <Link href={/news/ + v.slug}>
                      <Image
                        className="w-full"
                        src={v.image.url}
                        alt="placeholder"
                        width={1000}
                        height={10}
                      />
                    </Link>
                  </div>
                  <div
                    className={
                      v.featured === true
                        ? "lg:w-6/12 w-full flex flex-col gap-5 p-8 text-white"
                        : "text-white flex flex-col justify-between h-full"
                    }
                  >
                    <div className="flex flex-col gap-5">
                      <Link href={/news/ + v.slug}>
                        <h1
                          className={
                            v.featured === true
                              ? "font-medium text-[36px] leading-none"
                              : "font-medium text-[18px] mt-3 leading-none"
                          }
                        >
                          {v.title}
                        </h1>
                      </Link>
                      <div className="text-[14px]">
                        {v.featured === true
                          ? v.article.text.slice(0, 300)
                          : v.article.text.slice(0, 100)}{" "}
                        ...
                      </div>
                    </div>
                    <div>
                      <Link href={/news/ + v.slug}>
                        <button className="bg-zinc-900 px-5 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition-all">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;

/*
"bg-zinc-800/50 backdrop-blur-lg flex flex-col p-8 w-3/12 h-[500px] rounded-xl"
        <div className="w-full bg-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-lg flex lg:flex-row flex-col-reverse">
            <div className="lg:w-6/12 w-full flex flex-col gap-5 p-8 text-white">
              <h1 className="font-medium text-[36px] leading-none">
                This is Title For Every News That Can Be Seen
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <div>
                <button className="bg-zinc-900 px-5 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition-all">
                  Read More
                </button>
              </div>
            </div>
            <div className="lg:w-6/12 w-full">
              <Image
                className="w-full"
                src={imgPlaceholder}
                alt="place holder"
                width={1000}
                height={10}
              />
            </div>
          </div>
        */
