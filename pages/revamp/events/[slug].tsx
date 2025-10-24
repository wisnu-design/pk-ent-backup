"use client"; 

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router'; 
import { HiArrowLeft } from "react-icons/hi";

import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Seo from '@/components/Seo';

import { api } from '@/lib/graphql/api';
import { CLIENT } from '@/lib/graphql/query';
import { mapGraphQLToNestedClients } from '@/lib/helper/interfaces';
import { Client } from '@/lib/data/events'; 
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const slideLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }, 
};
const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

interface ClientPageProps {
  client: Client;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  if (!slug) {
    return { notFound: true };
  }
  try {
    const { client }: any = await api.request(CLIENT, { slug });
    if (!client) {
      return { notFound: true };
    }

    const [mappedClient] = mapGraphQLToNestedClients([client]);

    return {
      props: {
        client: mappedClient,
      },
    };
  } catch (error) {
    console.error("Error fetching client data:", error);
    return { notFound: true };
  }
};

const ClientSlugPage: NextPage<ClientPageProps> = ({ client }) => {
  
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {

    if (!client.brands || client.brands.length <= 1) {
      return; 
    }

    const interval = setInterval(() => {
      setActiveBrandIndex(prevIndex => {
        return (prevIndex + 1) % client.brands.length;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [client.brands.length]);


  const activeBrand = client.brands[activeBrandIndex];

  if (!activeBrand) {
    return (
        <>
        <Seo metaTitle={`PK Entertainment | ${!activeBrand ? "" : activeBrand}`} metaDesc={'PK'} metaKey='PK' />
        <Header />
      <main className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl">{client.title}</h1>
        <p className="mt-4">This client has no events to display.</p>
      <motion.button
        onClick={() => router.back()} // Fungsi untuk kembali
        className="flex items-center mt-4 gap-2 text-white/80 hover:text-white transition-colors mb-4" // Styling
        initial={{ opacity: 0, x: -20 }} // Animasi masuk (opsional)
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5}}
      >
        <HiArrowLeft size={18} />
          <span>Back</span>
        </motion.button>                          
      </main>
        </>
    );
  }
  
  // Ambil galeri & tahun dari brand yang aktif
  const gallery = activeBrand.gallery;
  const year = activeBrand.date.split('-')[0] || activeBrand.date; // Ambil tahun

  return (
    <>
      <Header />
      <Seo metaTitle={`PK Entertainment | ${!activeBrand.gallery ? "" : activeBrand.title}`} metaDesc={'PK'} metaKey='PK' />
      <main className="relative w-full pt-16 h-screen overflow-hidden bg-black">
        {/* Latar Belakang "Gradient Motion" */}
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 via-black to-green-900"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ backgroundSize: "400% 400%" }}
        />

        {/* Wrapper Konten */}
        <div className="relative z-10 w-full h-full text-white p-8 md:p-12 lg:p-24">
            <motion.button
              onClick={() => router.back()} // Fungsi untuk kembali
              className="flex items-center -mt-4 gap-2 text-white/80 hover:text-white transition-colors mb-4" // Styling
              initial={{ opacity: 0, x: -20 }} // Animasi masuk (opsional)
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HiArrowLeft size={18} />
              <span>Back</span>
             </motion.button>

          {/* === Teks (Kiri Atas & Kanan Bawah) === */}
          <div className="absolute lg:top-[18%] lg:left-23 md:left-24 w-10/12 z-20">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeBrand.id} // Ganti key saat brand berubah
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:text-xl text-md font-bold lg:block hidden"
              >
                {activeBrand.title}
              </motion.h1>
            </AnimatePresence>

            {/* Mobile */}
             <AnimatePresence mode="wait">
              <div className='w-full text-center'>
              <motion.h1
                key={activeBrand.id} // Ganti key saat brand berubah
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-3xl font-bold lg:hidden block"
              >
                {activeBrand.title}
              </motion.h1>
              </div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 right-10 md:right-24 max-w-xs z-20">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeBrand.id + '-desc'}
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-sm"
              >
                {activeBrand.description}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeBrand.id + '-year'}
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="block text-2xl font-bold mt-4"
              >
                {year}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* === Galeri Gambar (Layout GRID) Desktop === */}
          <div className="absolute inset-0 lg:grid grid-cols-12 grid-rows-6 gap-4 p-8 md:p-12 lg:p-24 pointer-events-none  hidden"> 
            
            {/* SLOT 1 (Slide Left) */}
            <div className="col-span-4  row-span-3 col-start-1 row-start-2 overflow-hidden rounded-lg pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id + '-img1'}
                  variants={slideLeft} 
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative" // Add relative for Image layout="fill"
                >
                  {gallery[0] && (
                    <Image src={gallery[0].url} alt="Gallery 1" layout="fill" objectFit="cover" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SLOT 2 (Slide Up) */}
            <div className="col-span-5 row-span-3 col-start-2 row-start-5 overflow-hidden rounded-lg pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id + '-img2'}
                  variants={slideUp} 
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  {gallery[1] && (
                    <Image src={gallery[1].url} alt="Gallery 2" layout="fill" objectFit="cover" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SLOT 3 (Slide Up) */}
            <div className="col-span-2 row-span-4 col-start-5 row-start-1 overflow-hidden rounded-lg pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id + '-img3'}
                  variants={slideUp} 
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  {gallery[2] && (
                    <Image src={gallery[2].url} alt="Gallery 3" layout="fill" objectFit="cover" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SLOT 4 (Slide Down) */}
            <div className="col-span-2 row-span-5 col-start-7 row-start-3 overflow-hidden rounded-lg pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id + '-img4'}
                  variants={slideDown} 
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  {gallery[3] && (
                    <Image src={gallery[3].url} alt="Gallery 4" layout="fill" objectFit="cover" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SLOT 5 (Slide Left) */}
            <div className="col-span-4 row-span-3 col-start-9 row-start-2 overflow-hidden rounded-lg pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id + '-img5'}
                  variants={slideLeft} 
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  {gallery[4] && (
                    <Image src={gallery[4].url} alt="Gallery 5" layout="fill" objectFit="cover" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div> {/* Akhir Grid Container */}

          {/* Gallery Gambar Mobile */}
          <div className='relative h-full'>
            {/* gallery 1 */}
             <div className="absolute inset-0 lg:hidden left-5 w-10/12 p-8 md:p-12 lg:p-24 block h-[60%] mt-[7em] rounded-xl overflow-hidden ">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBrand.id + '-img1'}
                    variants={slideLeft} 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    {gallery[2] && (
                      <Image src={gallery[2].url} alt="Gallery 1" layout="fill" objectFit="cover" />
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>
             {/* gallery 2 */}
             <div className="absolute inset-0 lg:hidden p-8 md:p-12 lg:p-24 top-5 block h-[55%] mt-[7em] rounded-xl overflow-hidden ">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBrand.id + '-img1'}
                    variants={slideLeft} 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    {gallery[0] && (
                      <Image src={gallery[0].url} alt="Gallery 1" layout="fill" objectFit="cover" />
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>
             {/* gallery 3 */}
             <div className="absolute inset-0 -left-5 lg:hidden w-[110%] p-8 md:p-12 lg:p-28 top-24 block h-[30%] mt-[7em] rounded-xl overflow-hidden ">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBrand.id + '-img1'}
                    variants={slideLeft} 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    {gallery[1] && (
                      <Image src={gallery[1].url} alt="Gallery 1" layout="fill" objectFit="cover" />
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>
          
          
        </div> {/* Akhir Wrapper Konten */}
      </main>
      
   
       <Footer /> 
    </>
  );
};

export default ClientSlugPage;