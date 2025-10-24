"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Concert } from '@/lib/data/concerts'; // Sesuaikan path
import Image from 'next/image';

type Props = {}

const getConcertDetails = (dateString: string) => {
  const dateNow = new Date();
  const concertDate = new Date(dateString);
  
  // Menghapus komponen jam/menit/detik dari dateNow agar perbandingan adil
  dateNow.setHours(0, 0, 0, 0); 

  const tag = concertDate < dateNow ? "Past Concert" : "Upcoming";
  const year = concertDate.getFullYear().toString();
  
  return { tag, year };
};

interface ConcertCardProps {
  concert: Concert;
  isActive: boolean;
  onClick: () => void;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ concert, isActive, onClick }) => {
  // PANGGIL FUNGSI HELPER DI SINI
  const { tag, year } = getConcertDetails(concert.dateConcert);

  return (
    <motion.div
    layout
      className="relative w-48 h-64 md:w-56 md:h-80 rounded-xl overflow-hidden cursor-pointer shadow-lg"
      onClick={onClick}
      animate={{
        scale: isActive ? 1.2 : 0.95, 
        zIndex: isActive ? 10 : 1, 
        borderColor: isActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.2)',
        opacity: isActive ? 1 : 0.7, 
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ border: '2px solid' }}
    >
      <Image
        src={concert.thumbnail}
        alt={concert.title}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/30 z-1" />
      
      <div className="relative z-10 p-3 flex flex-col justify-between h-full text-white">
        <div className='flex flex-col-reverse w-full'>
            <span className='w-full h-[1px] bg-white'>
            </span>
            <span className="bg-black/60 px-2 py-1 rounded text-xs font-semibold w-fit">
            {tag} 
            </span>
        </div>
        <span className="text-sm font-bold self-end">
          {year} 
        </span>
      </div>
    </motion.div>
  );
};

export default ConcertCard