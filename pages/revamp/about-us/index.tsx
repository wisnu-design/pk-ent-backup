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

const Index = (props: Props) => {
const [expandedId, setExpandedId] = useState<number | null>(null);
const isAnyExpanded = expandedId !== null;
const sectionRef = useRef(null);

const { scrollYProgress } = useScroll({
 target: sectionRef, 
    // Offset diubah: Mulai saat ATAS section menyentuh ATAS viewport,
    // Selesai saat BAWAH section menyentuh BAWAH viewport.
    // Ini lebih cocok untuk parallax saat section mengisi layar.
 offset: ["start start", "end end"] 
});

  // Sesuaikan rentang transform jika perlu, misal lebih sedikit gerakan
const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); 

const scrollPositionRef = useRef(0);

const handleSetExpandedId = (id: number | null) => {
  if (id !== null) {
   scrollPositionRef.current = window.scrollY;
  } else {
      // Saat menutup, pastikan scroll kembali (mungkin perlu sedikit penyesuaian offset)
      // Kita lakukan scroll di useLayoutEffect
    }
  setExpandedId(id);
};

useLayoutEffect(() => {
  if (expandedId === null && window.scrollY !== scrollPositionRef.current) {
      // Hanya scroll jika kita baru saja menutup DAN posisi scroll belum benar
   setTimeout(() => {
        // Coba scroll ke posisi yang disimpan
    window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' }); // 'auto' agar instan
   }, 0); // Sedikit delay
  }
    // Jika sedang expand, kunci scroll body
    document.body.style.overflow = expandedId !== null ? 'hidden' : 'auto';

    // Cleanup style saat komponen unmount
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

      {/* Panel 1: Video (HAPUS 'sticky' dan 'top-0') */}
   <div className={`relative h-screen z-10 ${isAnyExpanded ? 'hidden' : ''}`}>
    {/* Header diposisikan absolut relatif terhadap panel ini */}
        <Header  />
    <div className="relative h-full"> {/* Ganti h-[100vh] jadi h-full */}
     <video
            // Ganti h-[100vh] jadi h-full
      className="w-full h-full object-cover brightness-[30%] lg:rounded-b-[100px]"
      autoPlay
      loop
      muted={true}
      poster=""
      src="https://media.graphassets.com/R6KxXgbhRoOqnwYDqLss"
     ></video>
          {/* Konten di atas video */}
     <div className='absolute top-[20%] w-full z-20'> 
      <div className='lg:p-8 p-1 flex flex-col w-full justify-center items-center'>
       <Image
        src={logo}
        alt='logo'
        className='lg:w-4/12 w-6/12'
       />
       <p className='text-white lg:w-6/12 w-10/12 text-center'>
        {/* ... deskripsi Anda ... */}
       </p>
      </div>
     </div>
    </div>
   </div>
   
      {/* Panel 2: Services (TETAP sticky/fixed) */}
   <section 
    ref={sectionRef} 
        // Kelas sticky/fixed Anda sudah benar
        className={`relative w-full min-h-screen ${
          isAnyExpanded 
            ? 'fixed inset-0 z-50' 
            : 'top-0 sticky z-20' 
        } overflow-hidden`}
   >
        {/* Background Parallax */}
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

        {/* Konten Services */}
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

      {/* Footer */}
      <div className={isAnyExpanded ? 'hidden' : ''}>
        <Footer />
      </div>
    </>
 );
};

export default Index;