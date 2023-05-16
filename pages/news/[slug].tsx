import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { api } from "@/lib/graphql/api";
import { NEW } from "@/lib/graphql/query";
import Image from "next/image";
import React from "react";
import { NewSingle } from ".";
import Link from "next/link";
import Seo from "@/components/Seo";

export async function getServerSideProps({ params }: any) {
  const slug: string = params.slug;
  const data: any = await api.request(NEW, { slug });
  const newSingle: string = data.new;

  return {
    props: {
      newSingle,
    },
  };
}

const News = ({ newSingle }: NewSingle) => {
  const rich = newSingle.article.html;
  const replaced = rich.replace(/\|/g, " <br />");

  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | ${newSingle.title}`}
        metaDesc={newSingle.title}
        metaKey={newSingle.title}
      />
      <Header />
      <div>
        <div className="relative lg:h-[45.25vw]">
          <Image
            priority
            className="w-full  h-full brightness-[30%] lg:rounded-b-[100px]"
            src={newSingle.image.url}
            alt={newSingle.title}
            width={1000}
            height={10}
          />
        </div>
      </div>
      <div className="text-white max-w-[1380px] mx-auto py-10 flex flex-col">
        <div className="flex">
          <p className="font-light text-md flex gap-3">
            <Link className="" href="/">
              Home
            </Link>
            <span>/</span>
            <Link href="/news">News</Link>
          </p>
        </div>
        <div className="flex justify-center items-center pt-5 border-t-2 border-white mt-5">
          <h1 className="font-black text-4xl">{newSingle.title}</h1>
        </div>
        <div className="mt-5">
          <span
            dangerouslySetInnerHTML={{
              __html: replaced,
            }}
          ></span>
        </div>
        <div className="mt-5 pt-5 border-t-2 border-white">
          <div className="flex justify-center items-center">
            <h3 className="font-black text-4xl">Video</h3>
          </div>
          <div className="flex gap-5 mt-5 max-w-[1380px]"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default News;
