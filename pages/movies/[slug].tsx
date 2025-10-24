import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import React from "react";
import { useRouter } from "next/router";

// Komponen-komponen yang tidak digunakan seperti Swiper telah dihapus
import ArtistInfo from "@/components/organisms/ArtistInfo";
import Footer from "@/components/organisms/Footer";
import Image from "next/image";
import PlayButton from "@/components/atoms/PlayButton";

// Ganti dengan path gambar yang sebenarnya
import agen62Banner from "@/public/images/agen62.jpg";
import agen62Poster from "@/public/images/poster1.jpg";

// Data film di-hardcode di sini
const hardcodedFilms = [
  {
    slug: "agen62",
    band: "PK Films",
    title: "Agen +62 - Semua Bisa Jadi Agen",
    thumbnail: { url: agen62Banner },
    profilePicture: { url: agen62Poster },
    eventStage: "In Theaters",
    description: `Di Indonesia ada banyak agen. Agen pulsa, agen galon, agen koran, agen asuransi, dan juga... agen rahasia. Ini kisah Dito (Keanu) dan Martha (Rieke Diah Pitaloka), dua agen rahasia yang dianggap pecundang. Bersama-sama mereka berusaha memecahkan salah satu kasus tersulit di Indonesia. Penyamaran demi penyamaran mempertemukan mereka kepada Jessica (Cinta Laura), pemilik salon yang ternyata menyimpan rahasia gelap. Melibatkan masa depan satu negara.`,
    city: "Indonesia",
    date: "2025-07-03", // Format YYYY-MM-DD untuk perbandingan tanggal yang andal
    video: "https://www.youtube.com/watch?v=U7D_MyFkUiQ",
    tickets: [{ ticketLink: "/movies/agen62" }],
    director: "Dinna Jasanti",
    genre: "Action, Comedy",
    cast: [
      { name: "Keanu", role: "Dito" },
      { name: "Rieke Diah Pitaloka", role: "Martha" },
      { name: "Cinta Laura", role: "Jessica" },
      { name: "Fanny Fadillah", role: "Ucup" },
    ],
  },
];

const FilmDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const film = hardcodedFilms.find((f) => f.slug === slug);

  if (!film) {
    return <div>Loading film...</div>;
  }

  // Karena hari ini 5 Juli 2025, film yang rilis 3 Juli 2025 sudah tayang.
  // Maka, isUpcoming akan bernilai `false`.
  const isUpcoming = new Date(film.date) > new Date();
  
  // Format tanggal agar lebih mudah dibaca oleh pengguna
  const displayDate = new Date(film.date).toLocaleDateString("id-ID", {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <>
      <Seo
        metaTitle={`PK Entertainment | ${film.title}`}
        metaDesc={`${film.description}`}
        metaKey="Film, Sinema, Nonton"
      />
      <Header />
      
      {/* Konten utama dibungkus dengan flex-col */}
      <main className="flex flex-col bg-black text-white">
        
        {/* 1. Banner Utama */}
        {/* Tinggi tidak lagi menggunakan vh, diganti aspect-ratio */}
        <div className="relative w-full aspect-video">
          <Image
            src={film.thumbnail.url}
            alt={`Banner untuk ${film.title}`}
            layout="fill"
            objectFit="cover"
            priority={true}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 z-20 p-6 md:p-12 lg:p-16 max-w-5xl">
            <p className="font-semibold tracking-wider text-white/90">{film.eventStage}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-1 drop-shadow-lg">
              {film.title}
            </h1>
            <div className="flex items-center gap-x-4 mt-4 text-md lg:text-lg text-white/80">
              <span>{displayDate}</span>
              <span className="hidden md:block w-2 h-2 rounded-full bg-white/80"></span>
              <span className="hidden md:block">{film.city}</span>
            </div>
          </div>
        </div>

        {/* 2. ArtistInfo (jika masih diperlukan) */}
        {/* Trik -mt-44 dihapus, komponen ini sekarang berada di bawah banner */}
        {/*
          Catatan: Komponen ArtistInfo mungkin menjadi redundan karena informasinya
          sudah ditampilkan di bagian Movie Details di bawah. Anda bisa menghapusnya jika mau.
        */}
       

        {/* 3. Movie Details (Layout digabung dan disederhanakan) */}
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-8 py-10 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* Kolom Kiri: Poster */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <figure className="rounded-lg overflow-hidden shadow-xl mx-auto max-w-sm lg:max-w-none">
                <Image
                  src={film.profilePicture.url}
                  alt={`Poster ${film.title}`}
                  width={700}
                  height={1050}
                  className="w-full h-auto object-cover"
                />
              </figure>
            </div>

            {/* Kolom Kanan: Detail Teks */}
            <div className="w-full lg:w-2/3 flex flex-col space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">{film.title}</h2>
              <h3 className="text-xl lg:text-2xl font-semibold text-white/80 -mt-4">
                {film.band}
              </h3>
              <div>
                <h4 className="text-lg font-bold border-b border-white/20 pb-2 mb-3">
                  Sinopsis
                </h4>
                <p className="text-white/80 leading-relaxed">{film.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                <div>
                  <p className="font-bold">Sutradara</p>
                  <p className="text-white/80">{film.director}</p>
                </div>
                <div>
                  <p className="font-bold">Genre</p>
                  <p className="text-white/80">{film.genre}</p>
                </div>
                <div>
                  <p className="font-bold">Tanggal Tayang</p>
                  <p className="text-white/80">{displayDate}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold border-b border-white/20 pb-2 mb-3">
                  Pemeran
                </h4>
                <ul className="list-disc list-inside md:columns-2 gap-x-6 text-white/80">
                  {film.cast.map((actor, index) => (
                    <li key={index} className="mb-1">
                      {actor.name} - <span className="italic">{actor.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <PlayButton
                  target={"_blank"}
                  link={film.video}
                  text={"Watch Trailer"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FilmDetail;