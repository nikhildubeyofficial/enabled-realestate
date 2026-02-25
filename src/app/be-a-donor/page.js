'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Page() {
  const router = useRouter();
  const mainRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      // Handle internal links
      const link = e.target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
          e.preventDefault();
          router.push(href);
          window.scrollTo(0, 0);
          return;
        }
      }
      const btn = e.target.closest('button');
      if (btn && btn.innerText?.trim() === 'Be a Donor') {
        router.push('/signup');
      }
    };

    const el = mainRef.current;
    if (el) el.addEventListener('click', handleClick);
    return () => { if (el) el.removeEventListener('click', handleClick); };
  }, [router]);

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main
          ref={mainRef}
          className="flex-grow"
          dangerouslySetInnerHTML={{ __html: `<div class="min-h-screen flex flex-col bg-gray-50"><div class="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden"><img alt="Hero Background" class="absolute inset-0 w-full h-full object-cover object-center" src="/BG.jpg"><div class="absolute inset-0 bg-black opacity-50"></div><div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"><h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">KUAT BERSAMA ENABLED.</h1><p class="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">Setiap anak berhak mendapatkan kesempatan yang sama untuk meraih impian mereka. Bersama kita bisa memberikan harapan dan dukungan bagi anak-anak yang membutuhkan. Bantuan Anda dapat mengubah hidup mereka dan membuka jalan menuju masa depan yang lebih cerah.</p></div></div><div class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8"><div class="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><h2 class="text-xl sm:text-2xl font-bold text-gray-900">Donate to Children Who need your Support</h2><div class="relative w-full sm:w-96"><input placeholder="Search" class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-base" type="text" value=""><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></div></div><div class="space-y-6"><div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"><div class="flex flex-col sm:flex-row"><div class="sm:w-80 w-full flex-shrink-0"><img alt="Ahmad Rizki Pratama" class="w-full h-64 sm:h-80 object-cover" src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&amp;h=500"></div><div class="flex-1 p-4 sm:p-6 flex flex-col justify-between"><div><h3 class="text-3xl font-bold text-gray-900 mb-3">Ahmad Rizki Pratama</h3><div class="mb-3"><p class="text-lg text-gray-700"><span class="font-bold">Age:</span> <span class="font-semibold">14</span> <span class="mx-2">|</span><span class="font-bold">Domicile:</span> <span class="font-semibold">Jakarta Selatan, DKI Jakarta</span> <span class="mx-2">|</span><span class="font-bold">Parents Occupation:</span> <span class="font-semibold">Ibu bekerja sebagai pedagang kecil, Ayah sebagai buruh harian</span></p></div><p class="text-xl text-gray-600 leading-relaxed">Ahmad adalah anak yang ceria dan aktif di sekolah. Ia memiliki minat besar dalam bidang matematika dan sains. Keluarganya tinggal di rumah sederhana dan membutuhkan bantuan untuk biaya pendidikan dan kebutuhan sehari-hari. Ahmad sangat berharap dapat melanjutkan pendidikan ke jenjang yang lebih tinggi.</p></div><div class="mt-4"><button class="bg-black text-white text-lg px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto">Be a Donor</button></div></div></div></div><div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"><div class="flex flex-col sm:flex-row"><div class="sm:w-80 w-full flex-shrink-0"><img alt="Siti Nurhaliza" class="w-full h-64 sm:h-80 object-cover" src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&amp;h=500"></div><div class="flex-1 p-4 sm:p-6 flex flex-col justify-between"><div><h3 class="text-3xl font-bold text-gray-900 mb-3">Siti Nurhaliza</h3><div class="mb-3"><p class="text-lg text-gray-700"><span class="font-bold">Age:</span> <span class="font-semibold">12</span> <span class="mx-2">|</span><span class="font-bold">Domicile:</span> <span class="font-semibold">Bandung, Jawa Barat</span> <span class="mx-2">|</span><span class="font-bold">Parents Occupation:</span> <span class="font-semibold">Ibu sebagai penjahit, Ayah sudah meninggal</span></p></div><p class="text-xl text-gray-600 leading-relaxed">Siti adalah anak perempuan yang rajin dan berbakat dalam seni. Ia suka menggambar dan membaca buku. Setelah ayahnya meninggal, ibunya bekerja keras sebagai penjahit untuk menghidupi keluarga. Siti membutuhkan dukungan untuk biaya sekolah dan perlengkapan belajar agar dapat terus mengembangkan bakatnya.</p></div><div class="mt-4"><button class="bg-black text-white text-lg px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto">Be a Donor</button></div></div></div></div><div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"><div class="flex flex-col sm:flex-row"><div class="sm:w-80 w-full flex-shrink-0"><img alt="Budi Santoso" class="w-full h-64 sm:h-80 object-cover" src="https://images.unsplash.com/photo-1605713288610-00c1c630ca1e?q=80&amp;w=687&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></div><div class="flex-1 p-4 sm:p-6 flex flex-col justify-between"><div><h3 class="text-3xl font-bold text-gray-900 mb-3">Budi Santoso</h3><div class="mb-3"><p class="text-lg text-gray-700"><span class="font-bold">Age:</span> <span class="font-semibold">15</span> <span class="mx-2">|</span><span class="font-bold">Domicile:</span> <span class="font-semibold">Surabaya, Jawa Timur</span> <span class="mx-2">|</span><span class="font-bold">Parents Occupation:</span> <span class="font-semibold">Ibu sebagai pemulung, Ayah sebagai tukang ojek</span></p></div><p class="text-xl text-gray-600 leading-relaxed">Budi adalah anak yang tekun dan memiliki semangat belajar yang tinggi. Meskipun kondisi ekonomi keluarganya terbatas, ia tidak pernah menyerah untuk mengejar cita-citanya menjadi dokter. Ia aktif dalam kegiatan sekolah dan selalu membantu orang tuanya setelah pulang sekolah. Budi membutuhkan bantuan untuk biaya pendidikan dan kebutuhan kesehatan.</p></div><div class="mt-4"><button class="bg-black text-white text-lg px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto">Be a Donor</button></div></div></div></div><div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"><div class="flex flex-col sm:flex-row"><div class="sm:w-80 w-full flex-shrink-0"><img alt="Putri Ayu Lestari" class="w-full h-64 sm:h-80 object-cover" src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&amp;w=687&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></div><div class="flex-1 p-4 sm:p-6 flex flex-col justify-between"><div><h3 class="text-3xl font-bold text-gray-900 mb-3">Putri Ayu Lestari</h3><div class="mb-3"><p class="text-lg text-gray-700"><span class="font-bold">Age:</span> <span class="font-semibold">13</span> <span class="mx-2">|</span><span class="font-bold">Domicile:</span> <span class="font-semibold">Yogyakarta, DI Yogyakarta</span> <span class="mx-2">|</span><span class="font-bold">Parents Occupation:</span> <span class="font-semibold">Ibu sebagai pembantu rumah tangga, Ayah sebagai tukang bangunan</span></p></div><p class="text-xl text-gray-600 leading-relaxed">Putri adalah anak yang cerdas dan memiliki kepedulian tinggi terhadap sesama. Ia sering membantu teman-temannya yang kesulitan dalam belajar. Keluarganya tinggal di daerah pinggiran kota dengan kondisi rumah yang sederhana. Putri sangat membutuhkan dukungan untuk melanjutkan pendidikannya dan mewujudkan impiannya menjadi guru.</p></div><div class="mt-4"><button class="bg-black text-white text-lg px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto">Be a Donor</button></div></div></div></div></div></div></div>` }}
        />
        <Footer />
      </div>
    </div>
  );
}
