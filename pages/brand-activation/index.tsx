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
      <div className="flex gap-2 h-screen pt-36">
        {clients.map((client, index) => {
          return (
            <div className="text-white " key={index}>
              <Link href={`/brand-activation/${client.slug}`}>
                <Image
                  src={client.image ? client.image : imgPlaceHolder}
                  alt={client.name}
                  width={1000}
                  height={100}
                  className="w-60 h-52"
                />
                {client.name}
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default index;
