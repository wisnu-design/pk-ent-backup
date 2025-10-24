"use client";

import React, { useRef, useState, useLayoutEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'; 

import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import Seo from '@/components/Seo';
import ServiceColumn from '@/components/ServiceColumn';
import { services } from '@/lib/data/data';
import logo from '@/public/revamp/images/pkgrouplogo@4x.png'


import bgWhite from '@/public/revamp/images/bg-white@4x.png';
import Image from 'next/image';

type Props = {};

const index = (props: Props) => {
 const [expandedId, setExpandedId] = useState<number | null>(null);
 const isAnyExpanded = expandedId !== null;
 const sectionRef = useRef(null);

 const { scrollYProgress } = useScroll({
   target: sectionRef, 
   offset: ["start end", "end start"] 
 });

 const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

 const scrollPositionRef = useRef(0);

 const handleSetExpandedId = (id: number | null) => {
    if (id !== null) {
      scrollPositionRef.current = window.scrollY;
    }
    setExpandedId(id);
 };

 useLayoutEffect(() => {
    if (expandedId === null) {
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
 }, [expandedId]);

  return (
    <>
      <Seo
        metaTitle="PK Entertainment"
        metaDesc="PK Entertainment"
        metaKey="Event Promotor"
      />
      <div className={`relative h-screen top-0  z-10 ${isAnyExpanded ? 'hidden' : ''}`}>
        <Header />
        <div className="relative h-[100vh]">
          <video
            className="w-full h-[100vh] md:h-[40vw] lg:h-[100vh] object-cover brightness-[30%] lg:rounded-b-[100px]"
            autoPlay
            loop
            muted={true}
            poster=""
            src="https://media.graphassets.com/R6KxXgbhRoOqnwYDqLss"
          ></video>
          <div className='absolute top-[20%] w-full'>
            <div className='lg:p-8 p-1 flex flex-col w-full justify-center items-center'>
              <Image
                src={logo}
                alt='logo'
                className='lg:w-4/12 w-6/12'
              />
              <p className='text-white lg:w-6/12 w-10/12 text-center'>
                With nearly a decade of expertise, PK Entertainment Group is a driving force in Indonesia's entertainment landscape. Our diverse offerings, including PK Entertainment for international music tours, PK Music for local artists, and PK Events for comprehensive event solutions, have reached audiences across the nation.
              </p>

            </div>
          </div>
        </div>
      </div>
      
      <section 
        ref={sectionRef} 
          className={`relative w-full min-h-screen ${
             isAnyExpanded 
               ? 'fixed inset-0 z-50' 
               : 'top-0 sticky z-20' 
          } overflow-hidden`}
        style={{
          backgroundImage: `url(${bgWhite.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgWhite.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            y: parallaxY 
          }}
        />
        <motion.div
        layout
          className="relative z-30 flex flex-col md:flex-row w-full min-h-screen"
        >
          {services.map((service) => (
            <ServiceColumn 
              key={service.id} 
              service={service} 
              expandedId={expandedId}
              setExpandedId={handleSetExpandedId}
            />
          ))}
        </motion.div>
      </section>

    </>
  );
};

export default index;