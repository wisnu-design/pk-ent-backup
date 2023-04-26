import { api } from "@/lib/graphql/api";
import { CLIENTS } from "@/lib/graphql/query";
import React from "react";
import { ClientData } from "./[slug]";
import Link from "next/link";
import Image from "next/image";
import imgPlaceHolder from "@/public/images/imgPlaceholder.png";
import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import BrandCard from "@/components/molecules/BrandCard";

type Clients = {
  clients: ClientData[];
};

export async function getStaticProps() {
  const { clients }: any = await api.request(CLIENTS);

  return {
    props: {
      clients,
    },
    revalidate: 10,
  };
}

const index = ({ clients }: Clients) => {
  return (
    <>
      <Seo
        metaTitle="PK Entertainment | Brand Activation"
        metaDesc="Brand Activation of PK Entertainment"
        metaKey="Promotor Event"
      />
      <Header />
      <div className="h-screen">
        <div className=" flex flex-wrap max-w-[1600px] mx-auto pt-36 overflow-hidden">
          {clients.map((client, index) => {
            return (
              <div className="flex flex-wrap" key={index}>
                <Link href={`/brand-activation/${client.slug}`}>
                  <div className="group bg-zinc-900 col-span hover:scale-100 scale-[95%] transition relative w-[380px] rounded-xl">
                    <Image
                      className="w-full
                      bg-white
                    h-[200px]
              cursor-pointer
              object-fit
              transition
              duration
              shadow-xl
              delay-100
              rounded-t-xl
              "
                      src={client.image.url ? client.image.url : imgPlaceHolder}
                      alt="Thumbnail"
                      width={500}
                      height={10}
                    />
                    <div className="bg-zinc-800/50 backdrop-blur-sm w-full lg:h-[4vw] md:h-[5vw] lg:p-3 h-[12vw] p-2 rounded-b-xl flex justify-center items-center shadow-xl overflow-hidden">
                      <p className="text-white font-semibold lg:text-[24px] uppercase text-[6px]">
                        {client.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default index;
