import Seo from "@/components/Seo";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { api } from "@/lib/graphql/api";
import { CLIENT, QUERY } from "@/lib/graphql/query";
import Image from "next/image";
import React from "react";

export interface Brands {
  title: string;
  slug: any;
  thumbnail?: any;
  gallery?: any;
  description?: string;
  eventStage?: string;
  date?: string;
  city?: string;
}

export interface ClientData {
  name: string;
  slug: string;
  image?: any;
  brands?: Brands[];
}

export type Client = {
  client: ClientData;
};

export async function getServerSideProps({ params }: any) {
  const slug: string = params.slug;
  const data: any = await api.request(CLIENT, { slug });
  const client: string = data.client;

  return {
    props: {
      client,
      revalidate: 10,
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
      <div>
        <Header />
      </div>
      <div className="text-white h-full pt-36">
        <div>{client.name}</div>
        {client.brands
          ? client.brands.map((brand, index) => {
              return (
                <div key={index}>
                  <Image
                    src={brand.thumbnail ? brand.thumbnail.url : null}
                    alt={brand.title}
                    width={1000}
                    height={100}
                  />
                  <h1>{brand.title}</h1>
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
