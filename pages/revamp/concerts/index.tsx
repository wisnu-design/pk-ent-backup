"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Concert, concerts as initialConcerts } from '@/lib/data/concerts';
import Image from 'next/image';


import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Seo from '@/components/Seo';
import ConcertCard from '@/components/ConcertCard';
import { api } from '@/lib/graphql/api';
import { QUERY } from '@/lib/graphql/query';
import { mapGraphQLToConcerts } from '@/lib/helper/interfaces';
import { isConcertUpcoming } from '@/lib/helper/utils';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';



const textVariants = {
  
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};



type Props = {}

export async function getServerSideProps() {
  const { concerts }: any = await api.request(QUERY);
  return {
    props: {
      concerts,
    }
  };
}


const index = ({concerts}:any) => {

  const realConcerts: Concert[] = useMemo(() => mapGraphQLToConcerts(concerts), [concerts]);
  const [filterMode, setFilterMode] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [orderedConcerts, setOrderedConcerts] = useState<Concert[]>(() => 
    realConcerts.filter(c => isConcertUpcoming(c.dateConcert))
  );
  const activeConcert = orderedConcerts.length > 0 ? orderedConcerts[0] : null;


  const [scrollWidth, setScrollWidth] = useState(0);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  const dragControls = useAnimation();

  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    const inner = carouselInnerRef.current;

    if (wrapper && inner && inner.scrollWidth > 0) {
      const scrollbarWidth = wrapper.offsetWidth - wrapper.clientWidth;
      const newScrollWidth = inner.scrollWidth - wrapper.offsetWidth + scrollbarWidth;
      setScrollWidth(newScrollWidth < 0 ? 0 : newScrollWidth);
    } else {
      setScrollWidth(0); // Set 0 jika tidak ada kartu (list kosong)
    }
  }, [orderedConcerts]);

const handleFilterChange = (mode: 'Upcoming' | 'Past') => {
    if (mode === filterMode) return; 

    setFilterMode(mode);
    const newFilteredList = realConcerts.filter(c => {
      const isUpcoming = isConcertUpcoming(c.dateConcert);
      return mode === 'Upcoming' ? isUpcoming : !isUpcoming;
    });
    
    setOrderedConcerts(newFilteredList);
    dragControls.start({ x: 0 }); 
  };

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
      <Seo metaTitle={`PK Entertainment | ${!activeConcert ? "" : activeConcert.title}`} metaDesc={'PK'} metaKey='PK' />
      <Header />
      
      <main className="relative w-full h-screen overflow-hidden bg-black">
        
       <AnimatePresence>
          <motion.div
            key={!activeConcert ? "" : activeConcert.id} 
            className="absolute inset-0 z-0 brightness-[50%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          >
            <Image
              src={!activeConcert ? "" : activeConcert.bgImage}
              alt={!activeConcert ? "" : activeConcert.title}
              layout="fill"
              objectFit="cover"
              priority 
            />
            <div className="absolute inset-0 bg-black/60 z-1" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-8 md:left-24 w-full max-w-md md:max-w-lg text-white">
          <AnimatePresence mode="wait">
            <motion.h1
              key={!activeConcert ? "" : activeConcert.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-5xl md:text-7xl font-bold"
            >
              {!activeConcert ? "" : activeConcert.title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={!activeConcert ? "" : activeConcert.id + '-desc'}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-4 text-base md:text-lg"
            >
              {!activeConcert ? "" : activeConcert.description}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Link 
              href={`/concert/${!activeConcert ? "" : activeConcert.slug}`} 
              key={!activeConcert ? "" : activeConcert.id + '-buttonlink'} // Beri key unik untuk AnimatePresence
            >
              <motion.button
                // Terapkan variants yang sama dengan teks agar animasinya serasi
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
        className="absolute z-20 bottom-10 right-0 w-full md:w-3/5 lg:w-1/2 p-4 overflow-x-hidden overflow-y-visible"
        >


          <div className="flex gap-4 mb-12 ml-16">
            <button
              onClick={() => handleFilterChange('Upcoming')}
              className={`w-2/12 py-1 rounded-full text-sm font-medium transition-colors ${
                filterMode === 'Upcoming' 
                ? 'bg-white text-black' 
                : 'bg-transparent text-white border border-white/50 hover:bg-white/10'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => handleFilterChange('Past')}
              className={`w-2/12 py-1 rounded-full text-sm font-medium transition-colors ${
                filterMode === 'Past' 
                ? 'bg-white text-black' 
                : 'bg-transparent text-white border border-white/50 hover:bg-white/10'
              }`}
            >
              Past
            </button>
          </div>
          <motion.div
            ref={carouselInnerRef} 
            className="flex gap-10 w-max"
            drag="x"
            dragConstraints={{ right: 0, left: -scrollWidth }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            animate={dragControls} 
          >
           
            {orderedConcerts.map((concert, index) => (
              <ConcertCard
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

export default index