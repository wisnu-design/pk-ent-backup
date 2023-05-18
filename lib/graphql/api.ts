import { GraphQLClient } from "graphql-request";

export const api: GraphQLClient = new GraphQLClient(
  "https://ap-southeast-2.cdn.hygraph.com/content/clhr3p4k00soy01t52pkm53fc/master"
);
