

import { StaticImageData } from 'next/image';

// --- GANTI DENGAN IMPORT ANDA ---
import brunoBg from '@/public/revamp/images/brunomarsBg@4x.png';
import brunoThumb from '@/public/revamp/images/brunomarsThumbnail@4x.png';

import maroonBg from '@/public/revamp/images/maroonBg.jpg';
import maroonThumb from '@/public/revamp/images/maroonThumbnail@4x.png';

import linkinBg from '@/public/revamp/images/linkinBg.jpg';
import linkinThumb from '@/public/revamp/images/linkinThumb@4x.png';

export interface Concert {
  id: string;
  title: string;
  slug:string;
  description: string;
  dateConcert: string; 
  bgImage: any;
  thumbnail: any;
}

export const concerts: Concert[] = [
  {
    id: '1',
    title: 'Bruno Mars',
    slug: "aaa",
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.',
    dateConcert: '2024-09-13', 
    bgImage: brunoBg,
    thumbnail: brunoThumb,
  },
  {
    id: '2',
    title: 'Maroon 5',
    slug: "aaa",
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.',
    dateConcert: '2026-09-13', 
    bgImage: maroonBg,
    thumbnail: maroonThumb,
  },
  {
    id: '3',
    title: 'Linkin Park',
    slug: "aaa",
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.',
    dateConcert: '2024-09-13', 
    bgImage: linkinBg,
    thumbnail: linkinThumb,
  },
  
];