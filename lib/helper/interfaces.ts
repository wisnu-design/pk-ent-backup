import { ClientBrand, GraphQLClient } from "../data/events";
import { Film, GraphQLMovie } from "../data/film";
import { cleanHtmlSpaces, createExcerpt } from "./utils";

interface GraphQLConcert {
  id: string;
  thumbnail: {
    url: string;
  };
  band: string;
  title: string;
  slug: string;
  city: string;
  eventStage: string;
  date: string;
  description: string;
  upcoming: boolean;
  soldOut: boolean;
  eventDate: string; 
  bgImage?: { 
    url: string;
  };
}


export const mapGraphQLToConcerts = (data: GraphQLConcert[]) => {
  if (!data) return [];

  return data.map(item => {
    const backgroundUrl = item.bgImage ? item.bgImage.url : item.thumbnail.url;
    const excerpt = createExcerpt(item.description, 150);

    return {
      id: item.id,
      title: item.title, 
      slug: item.slug,
      description: excerpt,
      dateConcert: item.eventDate, 
      thumbnail: item.thumbnail.url,
      bgImage: backgroundUrl, 
    };
  });
};

export const mapGraphQLToNestedClients = (clients: GraphQLClient[]) => {
  if (!clients) return [];

 
  return clients.map(client => {
  
    const mappedBrands: ClientBrand[] = client.brands.map(brand => {
      const excerpt = createExcerpt(brand.description, 150);
      return {
        id: brand.id,
        title: brand.title,
        description: cleanHtmlSpaces(brand.description),
        slug: brand.slug,
        date: brand.date,
        thumbnail: brand.thumbnail?.url || '',
        gallery: brand.gallery 
      };
    });

    const defaultDescription = client.brands.length > 0 ? client.brands[0].description : "";

    return {
      id: client.slug, 
      title: cleanHtmlSpaces(client.name),
      slug: client.slug,
      description: cleanHtmlSpaces(defaultDescription), 
      thumbnail: client.image?.url || '', 
      brands: mappedBrands
    };
  });
};

export const mapGraphQLToFilms = (movies: GraphQLMovie[]) => {
  if (!movies || !Array.isArray(movies)) return [];
  
  return movies.map((movie, index) => {
    
    return {
     
      id: movie.slug,
      title: movie.movieTitle,
      description: movie.movieDescription || '',
      dateFilm: '',  
      bgImage: movie.moviePosterPortrait?.url || '',
      thumbnail: movie.moviePosterPortrait?.url || '', 
      trailerUrl: movie.movieVideoTrailer?.url || '#', 
    };
  });
};