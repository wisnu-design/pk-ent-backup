import { GraphQLClient } from "graphql-request";

export const api: GraphQLClient = new GraphQLClient(
  "https://ap-southeast-2.cdn.hygraph.com/content/clu2q107t000001w18abz2cbf/master"
);
