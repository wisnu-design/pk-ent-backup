"use client"; 

import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import React from "react";
import { GetServerSideProps, NextPage } from 'next'; 
import { useRouter } from 'next/router'; 
import Image from "next/image";


import Footer from "@/components/organisms/Footer";
import PlayButton from "@/components/atoms/PlayButton";


import { api } from '@/lib/graphql/api';
import { Movie as MOVIE_QUERY } from '@/lib/graphql/query'; 
import { mapGraphQLToFilmDetail } from '@/lib/helper/interfaces'; 
import { MappedFilm } from '@/lib/helper/interfaces'; 

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  
  if (!slug) {
    return { notFound: true };
  }

  try {
    const { movie }: any = await api.request(MOVIE_QUERY, { slug });

    if (!movie) {
      return { notFound: true };
    }
    const film = mapGraphQLToFilmDetail(movie);

    return {
      props: {
        film, 
      },
    };

  } catch (error) {
    console.error("Failed to fetch film:", error);
    return { notFound: true };
  }
};


interface FilmDetailPageProps {
  film: MappedFilm; 
}


const FilmDetail: NextPage<FilmDetailPageProps> = ({ film }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading film...</div>;
  }


  if (!film) {
    return <div>Film not found.</div>; 
  }

  const isUpcoming = new Date(film.date) > new Date();
  const displayDate = new Date(film.date).toLocaleDateString("id-ID", {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | ${film.title}`}
        metaDesc={`${film.description.substring(0, 150)}...`}
        metaKey="Film, Sinema, Nonton"
      />
      <Header />
      
      <main className="flex flex-col bg-black text-white">
        
        <div className="relative w-full aspect-video">

           <video
  
              key={film.video} 
              

              className="w-full h-full object-cover z-1"
              
              src={film.video} 
              autoPlay    
              loop        
              muted       
              playsInline  
            />
        
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 z-20 p-6 md:p-12 lg:p-16 max-w-5xl">
            <p className="font-semibold tracking-wider text-white/90">{film.eventStage}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-1 drop-shadow-lg">
              {film.title}
            </h1>
            <div className="flex items-center gap-x-4 mt-4 text-md lg:text-lg text-white/80">
              <span>{film.date}</span>
              <span className="hidden md:block w-2 h-2 rounded-full bg-white/80"></span>
              <span className="hidden md:block">{film.city}</span>
            </div>
          </div>
        </div>

        {/* 2. Movie Details */}
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-8 py-10 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* Kolom Kiri: Poster */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <figure className="rounded-lg overflow-hidden shadow-xl mx-auto max-w-sm lg:max-w-none">
                <Image
                  src={film.profilePicture.url} // Data dinamis
                  alt={`Poster ${film.title}`}
                  width={700}
                  height={1050}
                  className="w-full h-auto object-cover"
                />
              </figure>
            </div>

            {/* Kolom Kanan: Detail Teks */}
            <div className="w-full lg:w-2/3 flex flex-col space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">{film.title}</h2>
              <h3 className="text-xl lg:text-2xl font-semibold text-white/80 -mt-4">
                {film.band}
              </h3>
              <div>
                <h4 className="text-lg font-bold border-b border-white/20 pb-2 mb-3">
                  Sinopsis
                </h4>
                <p className="text-white/80 leading-relaxed">{film.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                <div>
                  <p className="font-bold">Sutradara</p>
                  <p className="text-white/80">{film.director}</p>
                </div>
                <div>
                  <p className="font-bold">Genre</p>
                  <p className="text-white/80">{film.genre}</p>
                </div>
                <div>
                  <p className="font-bold">Tanggal Tayang</p>
                  <p className="text-white/80">{film.date}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold border-b border-white/20 pb-2 mb-3">
                  Pemeran
                </h4>
                <ul className="list-disc list-inside md:columns-2 gap-x-6 text-white/80">
                  {film.cast.map((actor, index) => (
                    <li key={index} className="mb-1">
                      {actor.name}
                      {/* Tampilkan role HANYA jika tidak kosong */}
                      {actor.role && <span className="italic"> - {actor.role}</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <PlayButton
                  target={"_blank"}
                  link={film.video} // Data dinamis
                  text={"Watch Trailer"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FilmDetail;