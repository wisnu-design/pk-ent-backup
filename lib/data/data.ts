import { StaticImageData } from "next/image"; 

// --- Logo Hitam (Default) ---
import pkentLogoDark from "@/public/revamp/images/pkent-logo-dark@4x.png"
import pkmusicLogoDark from "@/public/revamp/images/pkmusic-logo-dark@4x.png"
import pkeventsLogoDark from "@/public/revamp/images/pkevents-logo-dark@4x.png"
import pkfilmsLogoDark from "@/public/revamp/images/pkfilms-logo-dark@4x.png"

// --- Logo Putih (Hover & Expanded) ---
import pkentLogo from "@/public/revamp/images/pkent-logo_2@4x.png"
import pkmusicLogo from "@/public/revamp/images/pkmusic-logo@4x.png"
import pkeventsLogo from "@/public/revamp/images/pkevents-logo@4x.png"
import pkfilmsLogo from "@/public/revamp/images/pkfilms-logo@4x.png"

// --- Thumbnail (Background saat Hover) ---
import pkentThumbnail from "@/public/revamp/images/pkent-thumb@4x.png"
import pkeventsThumbnail from "@/public/revamp/images/pkevents-thumbnail@4x.png"
import pkmusicThumbnail from "@/public/revamp/images/pkmusic-thumbail@4x.png"
import pkfilmsThumbnail from "@/public/revamp/images/pkfilms-thumbnail@4x.png"

// --- (FIX) Background saat Expanded ---
import pkentExpand from '@/public/revamp/images/expand-pkent@4x.png'
import pkeventsExpand from '@/public/revamp/images/expand-pkevents@4x.png'
import pkmusicExpand from '@/public/revamp/images/expand-pkmusic@4x.png'
import pkfilmsExpand from '@/public/revamp/images/expand-pkfilms@4x.png'

// --- (FIX) INTERFACE DIPERBARUI ---
export interface Service {
  id: number;
  title: string;
  description: string;         // Deskripsi singkat (kolom)
  logoDark: StaticImageData;    // Logo hitam (kolom)
  logo: StaticImageData;        // Logo putih (kolom hover)
  bgImage: StaticImageData;     // Thumbnail (kolom hover)
  
  // Data untuk tampilan expanded
  expandedBackground: StaticImageData; // Background full (expanded)
  expandedLogo: StaticImageData;       // Logo putih (expanded)
  expandedDescription: string;       // Deskripsi panjang (expanded)
  serviceUrl: string;                // Link tombol (expanded)
}

// --- (FIX) ARRAY DATA DIPERBARUI ---
export const services: Service[] = [
  {
    id: 1,
    title: 'PK Entertainment',
    description: `The forefront of Indonesia's concert scene, with unforgettable experiences with over 25 world-class performances`,
    logoDark: pkentLogoDark, 
    logo: pkentLogo, 
    bgImage: pkentThumbnail,
    expandedBackground: pkentExpand,
    expandedLogo: pkentLogo,
    expandedDescription: `Since 2015, PK Entertainment has been at the forefront of Indonesia's concert scene. We've delivered unforgettable experiences with over 25 world-class performances such as Bruno Mars, Coldplay, Celine Dion, Ed Sheeran, Backstreet Boys, Shawn Mendes, LANY, Keshi, Westlife, Calum Scott, Charlie Puth and Tom Jones. Beyond international stars, we also boast a strong track record of showcasing leading Japanese and Korean musicians, including ONE OK ROCK, RADWIMPS, Fujii Kaze, ADO, Eve and BABYMONSTER. Get ready to be part of something extraordinary as we reach a monumental milestone of entertaining 1 million fans nationwide.
<br /> <br />
Instagram:@pkentertainment.id`,
    serviceUrl: '/revamp/concerts'
  },
  {
    id: 2,
    title: 'PK Events',
    description: 'Brings nearly a decade of expertise in crafting impactful experiences',
    logoDark: pkeventsLogoDark, 
    logo: pkeventsLogo, 
    bgImage: pkeventsThumbnail,
    expandedBackground: pkeventsExpand,
    expandedLogo: pkeventsLogo,
    expandedDescription: `PK Events brings nearly a decade of expertise in crafting impactful experiences across brand activations, large-scale conferences, and high-profile corporate events. We blend creativity and precision to deliver events that inspire and engage audiences.
<br /><br />
Our work has been recognized at the Drum Awards Marketing APAC 2024, where we were finalists in B2B and Best Experience categories for YouTube Works Awards SEA – The Finale. The same event earned us a Bronze at the Marketing Events Awards 2024.
<br /><br />
In 2025, we are proud to be shortlisted at the Marketing Events Awards Singapore for Best Consumer Event, Best B2B Event, and Team of the Year.`,
    serviceUrl: '/revamp/events'
  },
  {
    id: 3,
    title: 'PK Music',
    description: `Redefining the live music experience in Indonesia. we're committed to bringing the best of Indonesian music to fans nationwide.`,
    logoDark: pkmusicLogoDark, 
    logo: pkmusicLogo, 
    bgImage: pkmusicThumbnail,
    expandedBackground: pkmusicExpand,
    expandedLogo: pkmusicLogo,
     expandedDescription: `PK Music is redefining the live music experience in Indonesia. With a sold-out Sheila on 7 tour as our launchpad, we're committed to bringing the best of Indonesian music to fans nationwide. Our journey has just begun, and we can't wait to share what's next.
<br /> <br />
Instagram:@pkmusic.id`,
    serviceUrl: '/music'
  },
  {
    id: 4,
    title: 'PK Films',
    description: 'Shaping the future of Indonesian cinema through bold storytelling and world-class production',
    logoDark: pkfilmsLogoDark, 
    logo: pkfilmsLogo, 
    bgImage: pkfilmsThumbnail,
    expandedBackground: pkfilmsExpand,
    expandedLogo: pkfilmsLogo,
     expandedDescription: `PK Films is committed to shaping the future of Indonesian cinema through bold storytelling and world-class production. Established to expand our creative footprint into the film industry, PK Films brings a deep-rooted passion for storytelling and a vision to produce high-quality content for both local and global audiences.
<br /> <br />
Our debut film with Wahana Kreator 'Agen +62' reflects this commitment—marking the start of our journey in delivering impactful and original cinematic experiences. By collaborating with top-tier talent and leading production houses across Indonesia, PK Films aims to elevate the nation's film industry to the international stage and contribute to a thriving, sustainable creative ecosystem.
<br /> <br />
Instagram:@pkfilms.id`,
    serviceUrl: '/revamp/movies'
  },
];