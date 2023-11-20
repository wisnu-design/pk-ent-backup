import { GraphQLClient } from "graphql-request";

export const api: GraphQLClient = new GraphQLClient(
  "https://ap-southeast-2.cdn.hygraph.com/content/clp6bl1tma5hc01taf4ff4pt2/master"
);
