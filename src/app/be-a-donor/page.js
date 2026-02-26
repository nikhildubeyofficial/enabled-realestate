'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const children = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=500',
    name: 'Ahmad Rizki Pratama',
    age: 14,
    domicile: 'Jakarta Selatan, DKI Jakarta',
    parentsOccupation: 'Ibu bekerja sebagai pedagang kecil, Ayah sebagai buruh harian',
    description: 'Ahmad adalah anak yang ceria dan aktif di sekolah. Ia memiliki minat besar dalam bidang matematika dan sains. Keluarganya tinggal di rumah sederhana dan membutuhkan bantuan untuk biaya pendidikan dan kebutuhan sehari-hari. Ahmad sangat berharap dapat melanjutkan pendidikan ke jenjang yang lebih tinggi.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=500',
    name: 'Siti Nurhaliza',
    age: 12,
    domicile: 'Bandung, Jawa Barat',
    parentsOccupation: 'Ibu sebagai penjahit, Ayah sudah meninggal',
    description: 'Siti adalah anak perempuan yang rajin dan berbakat dalam seni. Ia suka menggambar dan membaca buku. Setelah ayahnya meninggal, ibunya bekerja keras sebagai penjahit untuk menghidupi keluarga. Siti membutuhkan dukungan untuk biaya sekolah dan perlengkapan belajar agar dapat terus mengembangkan bakatnya.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1605713288610-00c1c630ca1e?q=80&w=687&auto=format&fit=crop',
    name: 'Budi Santoso',
    age: 15,
    domicile: 'Surabaya, Jawa Timur',
    parentsOccupation: 'Ibu sebagai pemulung, Ayah sebagai tukang ojek',
    description: 'Budi adalah anak yang tekun dan memiliki semangat belajar yang tinggi. Meskipun kondisi ekonomi keluarganya terbatas, ia tidak pernah menyerah untuk mengejar cita-citanya menjadi dokter. Ia aktif dalam kegiatan sekolah dan selalu membantu orang tuanya setelah pulang sekolah. Budi membutuhkan bantuan untuk biaya pendidikan dan kebutuhan kesehatan.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=687&auto=format&fit=crop',
    name: 'Putri Ayu Lestari',
    age: 13,
    domicile: 'Yogyakarta, DI Yogyakarta',
    parentsOccupation: 'Ibu sebagai pembantu rumah tangga, Ayah sebagai tukang bangunan',
    description: 'Putri adalah anak yang cerdas dan memiliki kepedulian tinggi terhadap sesama. Ia sering membantu teman-temannya yang kesulitan dalam belajar. Keluarganya tinggal di daerah pinggiran kota dengan kondisi rumah yang sederhana. Putri sangat membutuhkan dukungan untuk melanjutkan pendidikannya dan mewujudkan impiannya menjadi guru.'
  }
];

export default function BeADonorPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = children.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.domicile.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          {/* Hero: single image (text is on the image). One image, proper fit on all devices. */}
          <section
  className="w-full bg-gray-100"
  aria-label="Hero"
>
  <div
    className="
      w-full
      flex items-center justify-center
      overflow-hidden
    "
  >
    <img
      src="/images/image.png"
      alt="Kuat bersama Enabled – Be a donor"
      className="
        w-full h-auto
        object-contain
        max-h-[90vh]

        scale-125        /* mobile zoom */
        sm:scale-100     /* reset on larger devices */

        transition-transform duration-300
      "
      loading="eager"
    />
  </div>
</section>

          {/* Listing */}
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Donate to Children Who need your Support
              </h2>
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-base"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <div className="space-y-6">
              {filtered.length > 0 ? filtered.map(child => (
                <div key={child.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-80 w-full flex-shrink-0">
                      <img
                        src={child.image}
                        alt={child.name}
                        className="w-full h-64 sm:h-80 object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">{child.name}</h3>
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-lg text-gray-700">
                            <div>
                              <span className="font-bold">Age:</span>{' '}
                              <span className="font-semibold">{child.age}</span>
                            </div>
                            <div className="hidden sm:block text-gray-300">|</div>
                            <div>
                              <span className="font-bold">Domicile:</span>{' '}
                              <span className="font-semibold">{child.domicile}</span>
                            </div>
                            <div className="hidden sm:block text-gray-300">|</div>
                            <div>
                              <span className="font-bold">Parents Occupation:</span>{' '}
                              <span className="font-semibold">{child.parentsOccupation}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xl text-gray-600 leading-relaxed">{child.description}</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => router.push(`/donate/${child.id}`)}
                          className="bg-black text-white text-lg px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto"
                        >
                          Be a Donor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-gray-500">
                  No children found matching your search.
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
