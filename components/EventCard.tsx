"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Film } from '@/lib/data/film'; 
import Image from 'next/image';
import { Client, Event } from '@/lib/data/events';
import { generateConsistentRandomGradientColors } from '@/lib/helper/utils';
import { CSSProperties } from 'react';

interface EventCardProp {
  concert: Client;
  isActive: boolean;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProp> = ({ concert, isActive, onClick }) => {

    let yearString = '';

    if (concert.brands && concert.brands.length > 0) {
    
    const years = concert.brands
      .map(brand => parseInt(brand.date, 10))
      .filter(year => !isNaN(year)); 


    if (years.length > 0) {
      years.sort((a, b) => a - b); 

      const firstYear = years[0];
      const lastYear = years[years.length - 1];

 
      if (firstYear === lastYear) {
        yearString = `${firstYear}`;
      } else {
        yearString = `${firstYear} - ${lastYear}`;
      }
    }
  }

   // --- TAMBAHKAN INI UNTUK GENERATE GRADIENT ---
  const gradientStyle = useMemo((): CSSProperties => { // <-- Assert type here
    // ID yang digunakan harus konsisten untuk setiap kartu
    const cardId = concert.id;
    const colors = generateConsistentRandomGradientColors(cardId, 4); // Ambil 4 warna

    // Atur posisi acak untuk setiap warna (misal: 0%, 30%, 70%, 100%)
    // Untuk lebih random, Anda bisa mengacak posisi ini juga
    const positions = [0, 30, 70, 100].map(p => `${p}%`).sort(() => 0.5 - Math.random());

    return {
      background: `linear-gradient(to bottom right, ${colors[0]} ${positions[0]}, ${colors[1]} ${positions[1]}, ${colors[2]} ${positions[2]}, ${colors[3]} ${positions[3]})`,
      // TypeScript now knows 'overlay' is acceptable because the return type is CSSProperties
      mixBlendMode: 'overlay',
      opacity: 0.8,
    };
  }, [concert.id]); // Re-generate hanya jika ID concert berubah

  return (
    <motion.div
      layout // Animasi posisi
      className="relative w-48 h-64 md:w-56 md:h-80 rounded-xl bg-white overflow-hidden cursor-pointer shadow-lg"
      onClick={onClick}
      animate={{ // Animasi saat state 'isActive' berubah
        scale: isActive ? 1.2 : 0.95,
       
        zIndex: isActive ? 10 : 1,
        borderColor: isActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.2)',
        opacity: isActive ? 1 : 1, // Anda set opacity 1 untuk non-aktif
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }} // Transisi untuk 'layout' dan 'animate'
      style={{ border: '2px solid' }}
    >
      {/* Layer Gradient (CSS biasa, tidak dianimasikan oleh Framer Motion di sini) */}
      <div
        className="absolute inset-0 z-5"
      />

      {/* Gambar */}
      <div className='flex justify-center items-center h-full w-full p-5 relative z-0'>
        <Image
          src={concert.thumbnail}
          alt={concert.title}
          width={100}
          height={100}
          className="w-full flex m-auto object-cover"
        />
      </div>

      {/* Teks */}
      <div className="absolute z-10 p-3 top-0 flex flex-col w-full justify-between h-full text-white">
         <div className="w-fit">
            <span className=" px-2 py-1 rounded text-xs font-semibold w-fit text-black bg-white/70"> {/* Background agar terbaca */}
             PK Events
            </span>
             <div className="h-px bg-black mt-1" /> {/* Garis hitam? */}
         </div>
         <div className="self-end w-fit">
             <div className="h-px bg-black mb-1" /> {/* Garis hitam? */}
             <span className="text-sm font-bold self-end text-black">
               {yearString}
             </span>
         </div>
      </div>
    </motion.div>
  );
};

export default EventCard