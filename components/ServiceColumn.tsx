"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Service } from '@/lib/data/data'; 
import Image from 'next/image';
import bgWhite from '@/public/revamp/images/bg-white@4x.png';
import { HiArrowLeft } from "react-icons/hi";

import oneDark from '@/public/revamp/images/1-dark@4x.png'
import twoDark from '@/public/revamp/images/2-dark@4x.png'
import threeDark from '@/public/revamp/images/3-dark@4x.png'
import fourDark from '@/public/revamp/images/4-dark@4x.png'
import Link from 'next/link';

const numberImageMap = {
  1: oneDark,
  2: twoDark,
  3: threeDark,
  4: fourDark,
};
type NumberId = 1 | 2 | 3 | 4;

const bgImageVariants: Variants = {
  dark: { opacity: 0, scale: 1.1 },
  light: { opacity: 0, scale: 1.1 }, 
  hover: { opacity: 1, scale: 1 },
  expanded: { opacity: 1, scale: 1, filter: 'blur(8px)' }, 
  hidden: { opacity: 0 },
};

const hoverBgVariants: Variants = {
   light: { opacity: 0, scale: 1.1 },
   hover: { opacity: 1, scale: 1 },
   expanded: { opacity: 0, scale: 1.1, transition: { duration: 0.3 } }, 
   hidden: { opacity: 0 },
};

const expandedBgVariants: Variants = {
   light: { opacity: 0, scale: 1.1 },
   hover: { opacity: 0, scale: 1.1 }, 
   expanded: { 
     opacity: 1, 
     scale: 1.5, 
     transition: { duration: 0.5, ease: 'easeInOut', delay: 0.3 }
   },
   hidden: { opacity: 0 },
};

const bgOverlayVariants: Variants = {
  light: { opacity: 0 },
  hover: { opacity: 0 },
  expanded: { opacity: 0 }, 
  hidden: { opacity: 0 },
};


const defaultContentVariants: Variants = {
  light: { opacity: 1, transition: { staggerChildren: 0.1 }, y:0 },
  hover: (isMobile) => ({
    opacity: 1,
    y: isMobile ? 0 : '30vh', 
    transition: { staggerChildren: 0.1 } 
  }),
  expanded: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  hidden: { opacity: 0, transition: { duration: 0.3 } },
};

const expandedContentVariants: Variants = {
  light: { opacity: 0, y: 50, pointerEvents: 'none', transition: { duration: 0.3 } },
  hover: { opacity: 0, y: 50, pointerEvents: 'none', transition: { duration: 0.3 } },
  expanded: { 
    opacity: 1, 
    y: 0, 
    pointerEvents: 'auto',
    transition: { duration: 0.5, delay: 0.1, staggerChildren: 0.1 } 
  },
  hidden: { opacity: 0, y: 50, pointerEvents: 'none', transition: { duration: 0.3 } },
};

const columnWrapperVariants: Variants = {
   light: { 
    flex: 1,  
    position: 'relative', 
    inset: 'auto',        
    zIndex: 1,           
    transition: { duration: 0.5, ease: 'easeInOut' } 
  },
   hover: { 
    flex: 1.2, 
    transition: { duration: 0.4, ease: 'easeOut' } 
  },
   expanded: { 
    flex: 1, 
    width: '100%',
    position: 'fixed',
    inset: 0,          
    zIndex: 40,     
    transition: { duration: 0.05, ease: 'easeInOut', delay: 0.2 } 
  },
   hidden: { 
    flex: 0, 
    opacity: 0, 
    position: 'relative',
    inset: 'auto',
    zIndex: 1,
    transition: { duration: 0.5, ease: 'easeInOut' } 
  },
};


type ServiceColumnProps = {
  service: Service;
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
};


const ServiceColumn: React.FC<ServiceColumnProps> = ({ service, expandedId, setExpandedId }) => {
  const { id, title, logo, logoDark, bgImage, description, expandedLogo, expandedDescription, serviceUrl, expandedBackground } = service;
  const currentImage = numberImageMap[id as NumberId];

  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isExpanded = expandedId === id;
  const isAnyExpanded = expandedId !== null;
  
  let animateState = "light";
  if (isExpanded) {
    animateState = "expanded";
  } else if (isAnyExpanded) {
    animateState = "hidden";
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    checkMobile(); 
  }, []);

  return (
    <motion.div
      animate={animateState}
      whileHover={isAnyExpanded ? undefined : "hover"}
      variants={columnWrapperVariants}
      layout
      className="relative flex-1 p-8 md:p-12 flex flex-col justify-center items-center h-screen overflow-hidden cursor-pointer"
    >
      <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage.src})` }}
          variants={hoverBgVariants} 
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

      <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${expandedBackground.src})` }}
          variants={expandedBgVariants} 
        />
      <motion.div
        className="absolute inset-0 z-1"
        style={{ backgroundImage: `url(${bgWhite.src})` }}
        variants={bgOverlayVariants}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    
     <motion.div
     initial={{ opacity: 0, y: 20 }} 
        variants={defaultContentVariants}
        custom={isMobile}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center" 
        >
        <div className='relative w-full'>
          {currentImage && (
            <motion.div
              className="absolute scale-[200%] -left-8 top-2 w-9 h-9 lg:w-12 lg:h-12"
              variants={{ light: { opacity: 1 }, hover: { opacity: 0 }, expanded: { opacity: 0 }, hidden: { opacity: 0 } }}
            >
              <Image src={currentImage} alt={`Number ${id}`} fill style={{ objectFit: 'contain' }} priority />
            </motion.div>
          )}
          <div className="my-6 relative h-8 lg:h-10">
            <motion.div className="absolute top-0 left-0" variants={{ light: { opacity: 0 }, hover: { opacity: 1 }, expanded: { opacity: 0 }, hidden: { opacity: 0 } }}>
              <Image src={logo} alt={title} className="h-8 lg:h-10 w-auto" priority />
            </motion.div>
            <motion.div className="absolute top-0 left-0" variants={{ light: { opacity: 1 }, hover: { opacity: 0 }, expanded: { opacity: 0 }, hidden: { opacity: 0 } }}>
              <Image src={logoDark} alt={title} className="h-8 lg:h-10 w-auto" priority />
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 w-full "> 
          <motion.p className="text-[12px] mt-0" variants={{ light: { color: '#000000' }, hover: { color: '#FFFFFF' }, expanded: { opacity: 0 }, hidden: { opacity: 0 } }}>
            {description}
          </motion.p>
          <motion.button
            className="mt-6 px-5 py-2 border rounded-full text-sm font-medium"
            variants={{
              light: { opacity: 1, y: 0, color: '#000000', borderColor: '#000000' },
              hover: { opacity: 1, y: 0, color: '#FFFFFF', borderColor: '#FFFFFF' },
              expanded: { opacity: 0 },
              hidden: { opacity: 0 }
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpandedId(id)}
          >
            View more
          </motion.button>
        </div>
      </motion.div>

    
      <motion.div
        variants={expandedContentVariants}
        initial={{ opacity: 0, y: 20 }}
        className="absolute inset-0 z-20 -mt-10 lg:mt-0 w-full h-full flex flex-col justify-center items-center p-2 md:p-12 text-white"
      >
        <motion.button
          className="absolute top-[18%] left-7 lg:left-20 z-30 text-white"
          onClick={() => setExpandedId(null)} 
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
            <div className='flex gap-2 items-center'>
              <HiArrowLeft size={20} />
              <h1>Back</h1>
            </div>
        </motion.button>
        <motion.div 
          className="relative w-48 h-24 lg:w-64 lg:h-32 mt-20"
          variants={{ expanded: { opacity: 1, y: 0 }, light: { opacity: 0, y: 20 }, hover: { opacity: 0, y: 20 }, hidden: { opacity: 0, y: 20 } }}
        >
          <Image src={logo} alt={title} fill className='llg:scale-0 scale-150' style={{ objectFit: 'contain' }} />
        </motion.div>
       <motion.div
          className="text-sm lg:text-sm text-center mt-10"
          variants={{ expanded: { opacity: 1, y: 0 }, light: { opacity: 0, y: 20 }, hover: { opacity: 0, y: 20 }, hidden: { opacity: 0, y: 20 } }}
            
          dangerouslySetInnerHTML={{ __html: expandedDescription }}
        />
        <Link href={serviceUrl} passHref legacyBehavior>
          <motion.a
            className="mt-8 px-6 py-2 border border-white rounded-full text-sm font-medium"
            variants={{ expanded: { opacity: 1, y: 0 }, light: { opacity: 0, y: 20 }, hover: { opacity: 0, y: 20 }, hidden: { opacity: 0, y: 20 } }}
          >
            VIEW MORE
          </motion.a>
        </Link>
      </motion.div>

    </motion.div>
  );
};

export default ServiceColumn;