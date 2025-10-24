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
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.',
        dateFilm: '2024-09-13', 
        bgImage: agenBg,
        thumbnail: agenThumb,
    }
]