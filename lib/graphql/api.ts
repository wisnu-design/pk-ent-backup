import { GraphQLClient } from "graphql-request";

export const api: GraphQLClient = new GraphQLClient(
  "https://ap-southeast-2.cdn.hygraph.com/content/clisd44j41x6c01ui5rptcj4c/master"
);
