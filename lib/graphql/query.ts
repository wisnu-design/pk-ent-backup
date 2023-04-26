import { gql } from "graphql-request";

export const HOME = gql`
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
      soldOut
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

export const QUERY = gql`
  query Concert {
    concerts(first: 100, orderBy: publishedAt_DESC) {
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
      soldOut
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

export const BILLBOARD = gql`
  query billboard {
    billboard(where: { title: "home" }) {
      concerts(first: 100) {
        id
        thumbnail {
          url
        }
        video {
          url
        }
        title
        slug
        city
        eventStage
        date
        description
        upcoming
        soldOut
      }
    }
  }
`;

export const CONCERT = gql`
  query concert($slug: String!) {
    concert(where: { slug: $slug }) {
      id
      title
      slug
      video {
        url
      }
      thumbnail {
        url
      }
      tickets {
        type
        price
        ticketLink
      }
      city
      eventStage
      date
      description
      upcoming
      soldOut
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

export const CLIENTS = gql`
  query clients {
    clients {
      name
      slug
      image {
        url
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
  }
`;

export const CLIENT = gql`
  query client($slug: String!) {
    client(where: { slug: $slug }) {
      name
      slug
      image {
        url
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
  }
`;
