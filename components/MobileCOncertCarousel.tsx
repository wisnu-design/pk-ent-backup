"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion'; // Import PanInfo
import { Concert } from '@/lib/data/concerts'; // Sesuaikan path
import ConcertCard from './ConcertCard'; // Ganti ke ConcertCardMobile jika perlu
import ConcertCardMobile from './ConcertCardMobile';

interface MobileConcertCarouselProps {
  concerts: Concert[]; // Array konser yang sudah diurutkan (aktif di index 0)
  onCardClick: (index: number) => void; // Fungsi dari parent untuk reorder
  filterMode: 'Upcoming' | 'Past'; // Mode filter saat ini
  onFilterChange: (mode: 'Upcoming' | 'Past') => void;
}

const MobileConcertCarousel: React.FC<MobileConcertCarouselProps> = ({ concerts, onCardClick,filterMode, 
  onFilterChange, }) => {
  // State untuk menyimpan lebar container dan lebar satu kartu (termasuk gap)
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidthWithGap, setCardWidthWithGap] = useState(0);

  // Refs untuk container luar, dalam, dan array kartu
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Ref untuk SEMUA kartu
  const controls = useAnimation(); // Kontrol animasi snap

  // Efek untuk mengukur dimensi dan mengatur posisi awal/animasi
  useEffect(() => {
    const wrapper = wrapperRef.current;
    // Ambil kartu pertama dan kedua untuk pengukuran
    const firstCard = cardRefs.current[0];
    const secondCard = cardRefs.current[1];

    if (wrapper && firstCard) {
      const containerW = wrapper.offsetWidth;
      const cardW = firstCard.offsetWidth;
      // Hitung gap antara kartu pertama dan kedua
      const gap = secondCard
        ? secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().right
        : 0;
      const calculatedCardWidthWithGap = cardW + gap;

      setContainerWidth(containerW);
      setCardWidthWithGap(calculatedCardWidthWithGap); // Simpan lebar kartu + gap

      // Hitung posisi X agar kartu PERTAMA (index 0) berada di tengah container
      const centerOffsetForFirstCard = (containerW / 2) - (cardW / 2);

      // Animasikan ke posisi tengah setiap kali 'concerts' array berubah
      // (Ini akan berjalan saat pertama kali load dan setelah reorder oleh parent)
      controls.start(
        { x: centerOffsetForFirstCard },
        { type: 'spring', stiffness: 400, damping: 30 } // Transisi untuk snap setelah reorder
      );
    } else {
      // Reset jika refs tidak ada atau array concerts kosong
      setContainerWidth(0);
      setCardWidthWithGap(0);
      controls.set({x: 0});
    }
    // Set ulang refs array setiap kali concerts berubah
    cardRefs.current = cardRefs.current.slice(0, concerts.length);
  }, [concerts, controls]); // Recalculate if concerts array changes

  // Fungsi yang dipanggil setelah drag selesai untuk snap ke tengah
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!cardWidthWithGap || !innerRef.current || !wrapperRef.current) return;

    const currentOffset = info.offset.x;
    const closestIndex = Math.round(-currentOffset / cardWidthWithGap);
    const targetIndex = Math.max(0, Math.min(concerts.length - 1, closestIndex));
    const targetX = (containerWidth / 2) - (cardWidthWithGap / 2) - (targetIndex * cardWidthWithGap) + (cardWidthWithGap-cardRefs.current[0]!.offsetWidth)/2 ;

    controls.start({ x: targetX }, { type: 'spring', stiffness: 400, damping: 40 });

    if (targetIndex !== 0 && concerts.length > 1) { // Hanya panggil jika ada > 1 kartu
      onCardClick(targetIndex);
    }
  };

  // Drag constraints yang lebih longgar (membiarkan bablas)
  // Anda bisa sesuaikan nilainya agar tidak terlalu jauh
  const dragConstraints = {
    right: containerWidth ? containerWidth * 0.8 : 0, // Batas kanan (misal 80% lebar container)
    left: containerWidth && cardWidthWithGap ? -(concerts.length * cardWidthWithGap) - containerWidth * 0.8 : 0, // Batas kiri
  };

  return (
    // Wrapper luar, pastikan overflow-hidden
    <motion.div
      ref={wrapperRef}
      className="relative w-full z-[80] px-4 pb-4 h-screen overflow-hidden flex justify-center flex-col" // flex centering vertikal
    >
       <div className="flex gap-4 justify-center mt-16 mb-5"> 
        <button
          onClick={() => onFilterChange('Upcoming')}
          className={`w-4/12 py-1 rounded-full text-xs font-medium transition-colors ${
            filterMode === 'Upcoming'
              ? 'bg-white text-black'
              : 'bg-transparent text-white border border-white/50 hover:bg-white/10'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => onFilterChange('Past')}
          className={`w-4/12 py-1 rounded-full text-xs font-medium transition-colors ${
            filterMode === 'Past'
              ? 'bg-white text-black'
              : 'bg-transparent text-white border border-white/50 hover:bg-white/10'
          }`}
        >
          Past
        </button>
      </div>
     
      <motion.div
        ref={innerRef}
        className="flex gap-4 mt-32 w-max cursor-grab active:cursor-grabbing" 
        drag="x"
        dragConstraints={dragConstraints} 
        dragTransition={{ bounceStiffness: 100, bounceDamping: 25, power: 0.1, timeConstant: 300 }} 
        animate={controls} 
        onDragEnd={handleDragEnd} 
      >
        {concerts.length === 0 ?
        <div className="w-full text-center text-white/70 py-10" style={{width: `${containerWidth - 32}px`}}> 
                No {filterMode} concerts found.
           </div>
        :
        concerts.map((concert, index) => (
          
          <div
            ref={(el) => (cardRefs.current[index] = el)} 
            key={concert.id} 
          >
            <ConcertCardMobile 
              concert={concert}
              isActive={index === 0} 
              onClick={() => {
                  if (index !== 0) { 
                      onCardClick(index);
                  } else {
                     const centerOffsetForFirstCard = (containerWidth / 2) - (cardRefs.current[0]!.offsetWidth / 2);
                     controls.start({ x: centerOffsetForFirstCard }, { type: 'spring', stiffness: 400, damping: 30 });
                  }
              }}
            />
          </div>
        ))
        }
      </motion.div>
    </motion.div>
  );
};

export default MobileConcertCarousel;