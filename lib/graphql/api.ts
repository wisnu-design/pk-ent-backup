import { GraphQLClient } from "graphql-request";

export const api: GraphQLClient = new GraphQLClient(
  "https://ap-southeast-2.cdn.hygraph.com/content/clsaodm4y000001ui0aa03186/master"
);
