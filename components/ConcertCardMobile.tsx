"use client";

// 1. Import useState and useEffect
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Concert } from '@/lib/data/concerts'; // Adjust path if needed
import Image from 'next/image';
import Link from 'next/link';

// (Helper function remains the same)
const getConcertDetails = (dateString: string) => {
  const dateNow = new Date();
  const concertDate = new Date(dateString);
  dateNow.setHours(0, 0, 0, 0);
  const tag = concertDate < dateNow ? "Past Concert" : "Upcoming";
  const year = concertDate.getFullYear().toString();
  return { tag, year };
};

interface ConcertCardProps {
  concert: Concert; // This already includes 'description'
  isActive: boolean;
  onClick: () => void;
}

const ConcertCardMobile: React.FC<ConcertCardProps> = ({ concert, isActive, onClick }) => {
  const { tag, year } = getConcertDetails(concert.dateConcert);

  // 2. Add isMobile state detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      layout // Keep layout animation
      // 3. Adjust size slightly for mobile if needed
      className={`relative bg-white flex flex-col items-center -ml-3 ${
        isMobile ? 'w-44 h-64' : 'w-48 h-64 md:w-56 md:h-80' // Smaller on mobile
      } rounded-xl overflow-hidden cursor-pointer shadow-lg`}
      onClick={onClick}
      animate={{
        scale: isActive ? (isMobile ? 2 : 1.2) : (isMobile ? 0.98 : 0.95),
        zIndex: isActive ? 10 : 1,
        borderColor: isActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.2)',
        opacity: isActive ? 1 : 0.8, 
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ border: '2px solid' }}
    >

      <div className='bg-slate-400 w-10/12 h-[200%] mt-3 rounded-xl overflow-hidden relative'>
        <Image
            src={concert.thumbnail}
            alt={concert.title}
            layout="fill" // <-- Gunakan layout fill
        objectFit="cover"
        />
      </div>
    
      

      <div className="relative z-10 p-3 flex flex-col justify-between h-full text-black">
        {isMobile ? (
          <div className="flex flex-col justify-end h-full">
           
             <p className="relative z-10 text-[7px] text-center line-clamp-3"> 
                 {concert.description}
             </p>
             <Link
             className="relative z-10 mt-2 mx-auto px-3 py-1 border border-black rounded-full text-[10px] font-medium transition-colors hover:bg-white/20"
             href={`/concert/${concert.slug}`}>
            
               View more
            
             </Link>
           </div>
        ) : (
          <>
            <div className="w-fit"> 
              <span className="bg-black/60 px-2 py-1 rounded text-xs font-semibold w-fit">
                {tag}
              </span>
               <div className="h-px bg-white mt-1" />
            </div>
            <div className="self-end w-fit"> 
               <div className="h-px bg-white mb-1" /> 
              <span className="text-sm font-bold self-end">
                {year}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ConcertCardMobile;