import { api } from "@/lib/graphql/api";
import { QUERY } from "@/lib/graphql/query";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {};

export async function getServerSideProps({ params }: any) {
  const slug = params.slug;
  const data: any = await api.request(QUERY, { slug });
  const concert = data.concert;
  return {
    props: {
      concert: JSON.parse(JSON.stringify(data)),
    },
  };
}

const test = (concert: any) => {
  return <div> {concert.title}aaa</div>;
};

export default test;
