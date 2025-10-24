export const createExcerpt = (
  text: string, 
  maxLength: number = 100, 
  suffix: string = '...'
): string => {
  
  // Handle jika teks tidak valid
  if (!text || text.length === 0) {
    return '';
  }

  // Jika teks sudah cukup pendek, kembalikan apa adanya
  if (text.length <= maxLength) {
    return text;
  }

  // Cari spasi terakhir sebelum atau tepat di maxLength
  // Kita potong dulu agar 'lastIndexOf' tidak mencari terlalu jauh
  const truncatedText = text.substring(0, maxLength + 1);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');

  // Jika tidak ada spasi (satu kata panjang) atau spasi ada di paling depan
  if (lastSpaceIndex <= 0) {
    // Potong paksa di maxLength
    return text.substring(0, maxLength) + suffix;
  }

  // Kembalikan string yang dipotong di spasi terakhir + suffix
  return text.substring(0, lastSpaceIndex) + suffix;
};

export const isConcertUpcoming = (dateString: string): boolean => {
  const dateNow = new Date();
  const concertDate = new Date(dateString);
  dateNow.setHours(0, 0, 0, 0); 
  return concertDate >= dateNow; // 'true' jika hari ini atau di masa depan
};

export const cleanHtmlSpaces = (text: string): string => {
  if (!text) return '';
  // Regex /&nbsp;/g mencari semua (&nbsp;) 
  // dan menggantinya dengan spasi tunggal (" ")
  return text.replace(/&nbsp;/g, ' ');
};

 const gradientColors = [
  '#FF0000', // Merah
  '#0000FF', // Biru
  '#00FF00', // Hijau
  '#FFFFFF', // Putih
  '#FFFF00', // Kuning (opsional, jika mau lebih banyak variasi)
  '#00FFFF', // Cyan (opsional)
  '#FF00FF', // Magenta (opsional)
];

const stringToNumberHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/**
 * Menghasilkan array warna acak yang konsisten berdasarkan ID.
 */
export const generateConsistentRandomGradientColors = (id: string, count: number = 4): string[] => {
  const hash = stringToNumberHash(id);
  const shuffledColors = [...gradientColors] // Buat salinan
    .sort(() => 0.5 - Math.sin(hash)); // "Shuffle" berdasarkan hash

  return Array.from({ length: count }, (_, i) => shuffledColors[i % shuffledColors.length]);
};





