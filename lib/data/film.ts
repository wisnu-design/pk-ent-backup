import { StaticImageData } from 'next/image';

import agenBg from '@/public/revamp/images/agen62bg@4x.png'
import agenThumb from '@/public/revamp/images/agen62Thumb@4x.png'

export interface Film {
    id: string;
      title: string;
      description: string;
      dateFilm: string; 
      bgImage: StaticImageData;
      thumbnail: StaticImageData;
}

export const films: Film[] = [
    {
        id:"1",
        title:"Agen +62",
        description: 'Di Indonesia ada banyak agen. Agen pulsa, agen galon, agen koran, agen asuransi, dan juga... agen rahasia. Ini kisah Dito (Keanu) dan Martha (Rieke Diah Pitaloka), dua agen rahasia yang dianggap pecundang.',
        dateFilm: '2024-09-13', 
        bgImage: agenBg,
        thumbnail: agenThumb,
    }
]