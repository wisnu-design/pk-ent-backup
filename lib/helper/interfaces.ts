import { ClientBrand, GraphQLClient } from "../data/events";
import { Film, GraphQLMovie, GraphQLMovieSingle } from "../data/film";
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

export interface MappedFilm {
  slug: string;
  band: string;
  title: string;
  thumbnail: { url: string };
  profilePicture: { url: string };
  eventStage: string;
  description: string;
  city: string;
  date: string;
  video: string;
  tickets: { ticketLink: string }[];
  director: string;
  genre: string;
  cast: { name: string; role: string }[];
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

export const mapGraphQLToFilmDetail = (movie: GraphQLMovieSingle): MappedFilm => {

  const posterUrl = movie.moviePosterPortrait?.url || "";
  const trailerUrl = movie.movieVideoTrailer?.url || "#";

  const mappedCastList = movie.movieCast.map(actorName => ({
    name: actorName,
    role: ""
  }));

  return {
   
    slug: movie.slug,
    title: movie.movieTitle,
    description: movie.movieDescription,
    director: movie.movieDirector,
    genre: movie.movieGenre,
    date: movie.releaseDate,

    profilePicture: { url: posterUrl },
 
    video: trailerUrl, 
    

    thumbnail: { url: posterUrl }, 
    cast: mappedCastList,

    band: "PK Films",
    eventStage: "In Theaters",
    city: "Indonesia",
    tickets: [{ ticketLink: `/movies/${movie.slug}` }], 
  };
};

export interface Music {
  id: string;
  dateFilm:string
  trailerUrl:string
  title: string;
  description: string;
  bgImage: string;     // Untuk background halaman
  thumbnail: string; // Untuk poster di card
  slug: string;
}

// 2. INTERFACE UNTUK DATA MENTAH GQL
interface GraphQLMusic {
  musicTitle: string;
  slug: string;
  description: string;
  musicPosterPortrait?: { url: string };
  gallery: { url: string }; // 'gallery' adalah array
}

export const mapGraphQLToMusics = (musics: GraphQLMusic[]) => {
  if (!musics || !Array.isArray(musics)) return [];

  return musics.map((music) => {
    
    // Ambil gambar pertama dari galeri sebagai background
    // Beri fallback ke poster jika galeri kosong
    const bgUrl = music.gallery?.url || music.musicPosterPortrait?.url || '';
    const thumbUrl = music.musicPosterPortrait?.url || '';

    return {
      id: music.slug, // Gunakan slug sebagai ID unik
      title: music.musicTitle,
      description: cleanHtmlSpaces(music.description || ''),
      slug: music.slug,
      bgImage: bgUrl,
      thumbnail: thumbUrl,
    };
  });
};