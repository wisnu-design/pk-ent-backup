import { gql } from "graphql-request";

export const HOME = gql`
  query Concert {
    concerts(first: 4, orderBy: eventDate_DESC) {
      id
      thumbnail {
        url
      }
      band
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
    concerts(first: 100, orderBy: eventDate_DESC) {
      id
      thumbnail {
        url
      }
      band
      title
      slug
      city
      eventStage
      date
      description
      upcoming
      soldOut
      eventDate
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
      band
      video {
        url
      }
      profilePicture {
        url
      }
      thumbnail {
        url
      }
      tickets {
        type
        price
        ticketLink
        colour
      }
      highlightVideo {
        url
      }
      highlightGalleries(first: 100) {
        url
      }
      aboutThisEvent {
        html
      }
      isFestival
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
        gallery {
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
        gallery {
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

export const BRAND = gql`
  query brand($slug: String!) {
    brand(where: { slug: $slug }) {
      title
      slug
      thumbnail {
        url
      }
      description
      gallery {
        url
      }
    }
  }
`;

export const NEWS = gql`
  query news {
    news(first: 100, orderBy: createdAt_DESC) {
      title
      slug
      description
      image {
        url
      }
      featured
      article {
        html
        text
      }
    }
  }
`;

export const NEW = gql`
  query new($slug: String!) {
    new(where: { slug: $slug }) {
      title
      description
      image {
        url
      }
      featured
      video1
      video2
      article {
        html
        text
      }
    }
  }
`;

export const MOVIES = gql`
query Movies {
  movies {
    movieTitle
    slug
    movieDescription
    movieVideoTrailer {
      url
    }
    moviePosterPortrait {
      url
    }
  }
}
`