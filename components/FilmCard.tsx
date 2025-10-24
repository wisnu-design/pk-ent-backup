"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Film } from '@/lib/data/film'; 
import Image from 'next/image';

interface FilmCardProp {
  concert: Film;
  isActive: boolean;
  onClick: () => void;
}

const FilmCard: React.FC<FilmCardProp> = ({ concert, isActive, onClick }) => {

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
      
      
    </motion.div>
  );
};

export default FilmCard