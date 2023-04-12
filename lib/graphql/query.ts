import { gql } from "graphql-request";

export const QUERY = gql`
  query Concert {
    concerts(first: 4, orderBy: publishedAt_DESC) {
      id
      thumbnail {
        url
      }
      title
      slug
      city
      eventStage
      date
      description
      upcoming
    }
    brands {
      id
      thumbnail {
        url
      }
      title
      slug
      city
      eventStage
      date
      description
      upcoming
    }
  }
`;

export const CONCERT = gql`
  query concert($slug: String!) {
    concert(where: { slug: $slug }) {
      id
      title
      slug
      thumbnail {
        url
      }
      city
      eventStage
      date
      description
      upcoming
      stageLayout {
        url
      }
    }
  }
`;

export const SLUGLIST = gql`
  {
    concerts(first: 100) {
      slug
    }
  }
`;
