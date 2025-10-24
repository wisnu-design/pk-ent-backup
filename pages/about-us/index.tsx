"use client";


import React, { useRef, useState, useLayoutEffect } from 'react';
import {  motion } from 'framer-motion';

import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

import ServiceColumn from '@/components/ServiceColumn';
import { services } from '@/lib/data/data';
import logo from '@/public/revamp/images/pkgrouplogo@4x.png';
import bgWhite from '@/public/revamp/images/bg-white@4x.png';
import Image from 'next/image';
import Seo from '@/components/Seo';

type Props = {};

const Index = (props: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const isAnyExpanded = expandedId !== null;
  // Hapus sectionRef jika tidak digunakan lagi
  // const sectionRef = useRef(null);

  // Hapus parallax hooks
  // const { scrollYProgress } = useScroll(...);
  // const parallaxY = useTransform(...);

  const scrollPositionRef = useRef(0);

  const handleSetExpandedId = (id: number | null) => {
    if (id !== null) {
      scrollPositionRef.current = window.scrollY;
    }
    setExpandedId(id);
  };

  useLayoutEffect(() => {
  
    if (expandedId === null && window.scrollY !== scrollPositionRef.current) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
      }, 0);
    }
    document.body.style.overflow = expandedId !== null ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandedId]);

  return (
    <>
      <Seo
        metaTitle="PK Entertainment"
        metaDesc="PK Entertainment"
        metaKey="Event Promotor"
      />

   
      <Header  />

    
      <div className={`relative h-screen z-10 ${isAnyExpanded ? 'hidden' : ''}`}>
     
        <div className="relative h-full">
          <video
            className="w-full h-full object-cover brightness-[20%] lg:rounded-b-[100px]"
            autoPlay
            loop
            muted={true}
            poster=""
            src="https://media.graphassets.com/R6KxXgbhRoOqnwYDqLss"
          ></video>
          <div className='absolute top-[20%] w-full z-20'>
            <div className='lg:p-8 p-1 flex flex-col w-full justify-center items-center'>
              <Image
                src={logo}
                alt='logo'
                className='lg:w-4/12 w-full'
                priority
              />
              <p className='text-white lg:w-6/12 w-10/12 text-center mt-4'>
                With nearly a decade of expertise, PK Entertainment Group is a driving force in Indonesia&apos;s entertainment landscape. Our diverse offerings, including PK Entertainment for international music tours, PK Music for local artists, and PK Events for comprehensive event solutions, have reached audiences across the nation.
              </p>
            </div>
          </div>
        </div>
      </div>

    
      <section
      
        className={`relative w-full min-h-screen ${
          isAnyExpanded
            ? 'fixed inset-0 z-50'
            : 'z-20'              
        } overflow-hidden`} 
        
        style={{
          backgroundImage: `url(${bgWhite.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      
        <motion.div
          layout
          className="relative z-10 flex flex-col md:flex-row w-full min-h-screen" 
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

      {/* Footer */}
      <div className={isAnyExpanded ? 'hidden' : ''}>
        <Footer />
      </div>
    </>
  );
};

export default Index;