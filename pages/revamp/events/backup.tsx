"use client"; 

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';

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


  useEffect(() => {

    if (!client.brands || client.brands.length <= 1) {
      return; 
    }

    const interval = setInterval(() => {
      setActiveBrandIndex(prevIndex => {
        return (prevIndex + 1) % client.brands.length;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [client.brands.length]);


  const activeBrand = client.brands[activeBrandIndex];

  if (!activeBrand) {
    return (
      <main className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center text-white">
        <h1 className="text-3xl">{client.title}</h1>
        <p className="mt-4">This client has no events to display.</p>
      </main>
    );
  }
  
  // Ambil galeri & tahun dari brand yang aktif
  const gallery = activeBrand.gallery;
  const year = activeBrand.date.split('-')[0] || activeBrand.date; // Ambil tahun

  return (
    <>
      <Header />
      
      <main className="relative w-full h-screen overflow-hidden bg-black">
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
        <div className="relative z-10 w-full h-full text-white">

          {/* === Teks (Kiri Atas & Kanan Bawah) === */}
          <div className="absolute top-1/4 left-10 md:left-[5%] max-w-xs">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeBrand.id} 
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-md font-bold"
              >
                {activeBrand.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 right-10 md:right-24 max-w-xs">
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

          {/* === Galeri Gambar (Layout Absolut) === */}
          
          {/* SLOT 1 (Slide Left) */}
          <div className="absolute w-1/4 h-2/6 top-[30%] left-[5%] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id + '-img1'}
                variants={slideLeft}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {gallery[0] && (
                  <Image src={gallery[0].url} alt="Gallery 1" layout="fill" objectFit="cover" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SLOT 2 (Slide Up) */}
          <div className="absolute w-4/12 h-1/4 bottom-[10%] left-[15%] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id + '-img2'}
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {gallery[1] && (
                  <Image src={gallery[1].url} alt="Gallery 2" layout="fill" objectFit="cover" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SLOT 3 (Slide Up) */}
          <div className="absolute w-2/12 h-2/4 top-[13%] left-[31%] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id + '-img3'}
                variants={slideUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {gallery[2] && (
                  <Image src={gallery[2].url} alt="Gallery 3" layout="fill" objectFit="cover" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SLOT 4 (Slide Down) */}
          <div className="absolute w-2/12 h-2/4 top-[40%] right-[34%] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id + '-img4'}
                variants={slideDown}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {gallery[3] && (
                  <Image src={gallery[3].url} alt="Gallery 4" layout="fill" objectFit="cover" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SLOT 5 (Slide Left) */}
          <div className="absolute w-1/5 h-1/2 top-[20%] right-[5%] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id + '-img5'}
                variants={slideLeft}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {gallery[4] && (
                  <Image src={gallery[4].url} alt="Gallery 5" layout="fill" objectFit="cover" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </main>
      
      {/* Kita sembunyikan footer di halaman imersif ini */}
      {/* <Footer /> */}
    </>
  );
};

export default ClientSlugPage;