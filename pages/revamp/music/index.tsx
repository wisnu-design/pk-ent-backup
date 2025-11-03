"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiArrowLeft } from 'react-icons/hi';

// Komponen
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Seo from '@/components/Seo';


import { api } from '@/lib/graphql/api';
import { MUSICS } from '@/lib/graphql/query'; // <-- Gunakan query MUSICS
import { mapGraphQLToMusics, Music } from '@/lib/helper/interfaces'; // <-- Gunakan mapper Musics
import { createExcerpt } from '@/lib/helper/utils';
import FilmCard from '@/components/FilmCard';

// Varian Animasi
const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

// --- DATA FETCHING (SERVER-SIDE) ---
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { musics }: any = await api.request(MUSICS); // Fetch data musics
    const mappedMusics = mapGraphQLToMusics(musics); // Map data

    return {
      props: {
        musics: mappedMusics, // Kirim 'musics'
      }
    };
  } catch (error) {
    console.error("Failed to fetch musics:", error);
    return { props: { musics: [] } };
  }
}

// Tipe Props Halaman
type Props = {
  musics: Music[]; // Prop sekarang 'musics'
}

// Ganti nama komponen
const MusicPage: NextPage<Props> = ({ musics }) => {

  // Ganti nama variabel
  const [orderedMusics, setOrderedMusics] = useState(musics);
  const activeMusic = orderedMusics[0];

  const [scrollWidth, setScrollWidth] = useState(0);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  const dragControls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    const inner = carouselInnerRef.current;
    if (wrapper && inner) {
      const scrollbarWidth = wrapper.offsetWidth - wrapper.clientWidth;
      const newScrollWidth = inner.scrollWidth - wrapper.offsetWidth + scrollbarWidth;
      setScrollWidth(newScrollWidth < 0 ? 0 : newScrollWidth);
    }
  }, [orderedMusics]); // Dependency ke orderedMusics

  const handleCardClick = (clickedIndex: number) => {
    if (clickedIndex === 0) return;
    
    setOrderedMusics(currentList => { // Ganti ke setOrderedMusics
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

  // State jika tidak ada musik
  if (!activeMusic) {
    return (
      <>
        <Seo metaTitle="PK Entertainment | Music" metaDesc={'PK'} metaKey='PK' />
        <Header />
        <main className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
          <p className="text-white text-2xl">No music events found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Seo metaTitle={`PK Entertainment | ${activeMusic.title}`} metaDesc={'PK'} metaKey='PK' />
      <Header />
      
      <main className="relative w-full h-screen overflow-hidden bg-black">
        
        {/* --- PERUBAHAN UTAMA: GANTI VIDEO KE IMAGE --- */}
        <AnimatePresence>
          <motion.div
            key={activeMusic.id} 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          >
            <Image
              // 'key' di sini membantu 'AnimatePresence'
              key={activeMusic.bgImage} 
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={activeMusic.bgImage} // <-- Gunakan bgImage
              alt={activeMusic.title}
              layout="fill"
              objectFit="cover"
              priority 
            />
            <div className="absolute inset-0 bg-black/60 z-1" />
          </motion.div>
        </AnimatePresence>
        {/* --- AKHIR PERUBAHAN --- */}

        <div className="absolute z-10 top-[30%] lg:top-1/2 -translate-y-1/2 left-8 md:left-24 w-10/12 lg:w-full max-w-lg text-white">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeMusic.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-2xl md:text-5xl font-bold"
            >
              {activeMusic.title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeMusic.id + '-desc'}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-4 text-base md:text-lg"
            >
              {createExcerpt(activeMusic.description)}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Link 
              href={`/revamp/music/#`} // <-- Ganti link ke /music/
              key={activeMusic.id + '-buttonlink'} 
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
                onClick={() => router.back()}
                className="flex items-center ml-2 mt-4 gap-2 text-white/80 hover:text-white transition-colors mb-4"
                initial={{ opacity: 0, x: -20 }}
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
            {orderedMusics.map((music, index) => ( // Ganti ke orderedMusics
              <FilmCard // Ganti ke MusicCard
                key={music.id} 
                concert={music} // Prop baru 'music'
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

export default MusicPage; // Ganti nama export