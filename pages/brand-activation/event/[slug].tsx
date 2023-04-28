import { api } from "@/lib/graphql/api";
import { BRAND } from "@/lib/graphql/query";
import React from "react";
import { Brand } from "../[slug]";
import Image from "next/image";
import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";

type Props = {};

export async function getServerSideProps({ params }: any) {
  const slug = params.slug;
  const data: any = await api.request(BRAND, { slug });
  const brand = data.brand;

  return {
    props: {
      brand,
    },
  };
}

const Event = ({ brand }: Brand) => {
  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | ${brand.title}`}
        metaDesc={brand.description}
        metaKey={brand.title}
      />
      <Header />
      <div className="text-white pt-28">
        <div>{brand.title}</div>
        <div>{brand.slug}</div>
        <div>
          <Image
            src={brand.thumbnail.url}
            alt={brand.title}
            width={1000}
            height={10}
          />
        </div>
        <div>{brand.description}</div>
        <div>
          {brand.gallery.map((v: any, i: number) => {
            return (
              <div key={i}>
                <Image src={v.url} alt={brand.title} width={1000} height={10} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Event;
