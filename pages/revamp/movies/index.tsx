"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Film, films as initialConcerts } from '@/lib/data/film';
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next';


import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Seo from '@/components/Seo';
import FilmCard from '@/components/FilmCard';
import { useRouter } from 'next/router';
import { HiArrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import { mapGraphQLToFilms } from '@/lib/helper/interfaces';
import { api } from '@/lib/graphql/api';
import { MOVIES } from '@/lib/graphql/query';
import { createExcerpt } from '@/lib/helper/utils';



const textVariants = {
  
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { movies }: any = await api.request(MOVIES); // Fetch data
    const films = mapGraphQLToFilms(movies); // Map data

    return {
      props: {
        films, // Kirim 'films' yang sudah bersih ke komponen
      }
    };
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return { props: { films: [] } }; // Kirim array kosong jika error
  }
}

type Props = {
  films: Film[];
}

const Index = ({films}:Props) => {

  const [orderedConcerts, setOrderedConcerts] = useState(films);
  const activeConcert = orderedConcerts[0];

  const [scrollWidth, setScrollWidth] = useState(0);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  
  const dragControls = useAnimation();

  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    const inner = carouselInnerRef.current;

     if (wrapper && inner) {
        const scrollbarWidth = wrapper.offsetWidth - wrapper.clientWidth;
      
      const newScrollWidth = inner.scrollWidth - wrapper.offsetWidth + scrollbarWidth;
  
        setScrollWidth(newScrollWidth < 0 ? 0 : newScrollWidth);
     }
   }, [orderedConcerts]);

const handleCardClick = (clickedIndex: number) => {
   
    if (clickedIndex === 0) return;

   
    setOrderedConcerts(currentList => {
      const oldActiveItem = currentList[0];
      const newActiveItem = currentList[clickedIndex];
   
      const otherItems = currentList.filter(
        (item, index) => index !== 0 && index !== clickedIndex
      );

     
      return [newActiveItem, ...otherItems, oldActiveItem];
    });

   
    dragControls.start(
      { x: 0 }, 
      { type: 'spring', stiffness: 400, damping: 30 }
    );
  };
  const router = useRouter()
  return (
    <>
      <Seo metaTitle={`PK Entertainment | ${activeConcert.title}`} metaDesc={'PK'} metaKey='PK' />
      <Header />
      
      <main className="relative w-full h-screen overflow-hidden bg-black">
        
       <AnimatePresence>
          <motion.div
            key={activeConcert.id} 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          >
            <video
  
              key={activeConcert.trailerUrl} 
              

              className="absolute inset-0 w-full h-full object-cover z-0"
              
              src={activeConcert.trailerUrl} 
              autoPlay    
              loop        
              muted       
              playsInline  
            />
            <div className="absolute inset-0 bg-black/60 z-1" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute z-10 top-[30%] lg:top-1/2 -translate-y-1/2 left-8 md:left-24 w-10/12 lg:w-full max-w-lg text-white">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeConcert.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-5xl md:text-7xl font-bold"
            >
              {activeConcert.title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeConcert.id + '-desc'}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-4 text-base md:text-lg"
            >
              {createExcerpt(activeConcert.description)}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Link 
              href={`/movies/${activeConcert.id}`} 
              key={!activeConcert ? "" : activeConcert.id + '-buttonlink'} 
            >
              <motion.button
                variants={textVariants} 
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-8 px-6 py-2 border border-white rounded-full text-sm font-medium transition-colors hover:bg-white hover:text-black"
              >
                View more
              </motion.button>
            </Link>
            <div className="relative z-10 w-full h-full text-white ">
                                    <motion.button
                                onClick={() => router.back()} // Fungsi untuk kembali
                                className="flex items-center ml-2 mt-4 gap-2 text-white/80 hover:text-white transition-colors mb-4" // Styling
                                initial={{ opacity: 0, x: -20 }} // Animasi masuk (opsional)
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              >
                                <HiArrowLeft size={18} />
                                <span>Back</span>
                              </motion.button>
            </div>
          </AnimatePresence>
        </div>

        <motion.div
             ref={carouselWrapperRef} 
             className="absolute z-20 bottom-10 right-0 w-full md:w-3/5 lg:w-1/2 p-4 overflow-x-visible overflow-y-visible"
          >
             <motion.div
            ref={carouselInnerRef} 
               className="flex gap-10 w-max"
               drag="x"
               dragConstraints={{ right: 0, left: -scrollWidth }}
               dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            animate={dragControls} 
             >
           
               {orderedConcerts.map((concert, index) => (
                  <FilmCard
                    key={concert.id} 
                    concert={concert}
                    isActive={index === 0} 
                    onClick={() => handleCardClick(index)} 
                  />
               ))}
             </motion.div>
        </motion.div>

      </main>
      <Footer />
    </>
  )
}

export default Index