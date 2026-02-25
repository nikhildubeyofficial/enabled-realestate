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
      // Handle internal link navigation
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
      // Handle button interactions
      const btn = e.target.closest('button');
      if (btn) {
        const text = btn.innerText?.trim();
        if (text === 'Be a Donor') {
          const card = btn.closest('.rounded-lg, .bg-white') || btn.closest('div');
          const name = card?.querySelector('h3, h2')?.innerText?.trim() || 'a child in need';
          const msg = encodeURIComponent(`Hi, I would like to be a donor and support ${name}. Please guide me through the process.`);
          window.open(`https://wa.me/6287784629666?text=${msg}`, '_blank', 'noopener,noreferrer');
        } else if (text === 'Add to Cart' || text === 'Add To Cart') {
          const card = btn.closest('.rounded-xl, .rounded-lg') || btn.closest('div');
          const title = card?.querySelector('h2, h3, [class*="font-bold"]')?.innerText?.trim() || 'item';
          alert(`"${title}" has been added to your cart!`);
        } else if (text === 'Get In Touch' || text === 'Contact Us') {
          window.open('https://wa.me/6287784629666', '_blank', 'noopener,noreferrer');
        }
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form).entries());
      console.log('Form submitted:', data);
      alert('Thank you! Your form has been submitted. We will get back to you on WhatsApp shortly.');
    };

    const el = mainRef.current;
    if (el) {
      el.addEventListener('click', handleClick);
      el.addEventListener('submit', handleSubmit);
    }
    return () => {
      if (el) {
        el.removeEventListener('click', handleClick);
        el.removeEventListener('submit', handleSubmit);
      }
    };
  }, [router]);

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main
          ref={mainRef}
          className="flex-grow"
          dangerouslySetInnerHTML={{ __html: `<div class="min-h-screen flex flex-col"><div class="flex-1 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-6xl mx-auto"><div class="text-center mb-12" ><h1 class="text-4xl font-bold text-gray-800 mb-6">Patient Journey Documentary</h1><p class="text-lg text-gray-600 max-w-3xl mx-auto">Our documentary series captures the real stories of families navigating the challenges and triumphs of raising family members with special needs. These authentic narratives provide hope, guidance, and community for those on similar journeys</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" ><div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" ><div class="aspect-video"><iframe src="https://www.youtube.com/embed/zpQ_pIgrnOE" title="Love for Faustine: An Angel with Angelman Syndrome" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="w-full h-full"></iframe></div><div class="p-6"><h3 class="text-lg font-semibold text-gray-800 mb-2">Love for Faustine: An Angel with Angelman Syndrome</h3><p class="text-gray-600 text-sm">Follow Ibu Rani’s journey in raising Faustine, an angel with Angelman Syndrome</p></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" ><div class="aspect-video"><iframe src="https://www.youtube.com/embed/ITLPGQhNZt8" title="Mata Hati Koffie Journey: Life Beyond Limits" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="w-full h-full"></iframe></div><div class="p-6"><h3 class="text-lg font-semibold text-gray-800 mb-2">Mata Hati Koffie Journey: Life Beyond Limits</h3><p class="text-gray-600 text-sm">Follow Ibu Hikmah and Hilmy’s journey in growing Mata Hati Koffie, a business where patrons are served by visually impaired employees </p></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" ><div class="aspect-video"><iframe src="https://www.youtube.com/embed/SxJHtrpjN3Y" title="The Dark Side of The Indonesian Healthcare System" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="w-full h-full"></iframe></div><div class="p-6"><h3 class="text-lg font-semibold text-gray-800 mb-2">The Dark Side of The Indonesian Healthcare System</h3><p class="text-gray-600 text-sm"> A documentary revealing the unspoken struggles of those impacted by Indonesia’s healthcare system</p></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" ><div class="aspect-video"><iframe src="https://www.youtube.com/embed/I8zTqOVET1I" title="Little Aufa, Big Heart of Ibu Nurul" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="w-full h-full"></iframe></div><div class="p-6"><h3 class="text-lg font-semibold text-gray-800 mb-2">Little Aufa, Big Heart of Ibu Nurul</h3><p class="text-gray-600 text-sm"> A story of love from Ibu Nurul and her family, who never gave up on one another </p></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12" ></div></div></div></div>` }}
        />
        <Footer />
      </div>
    </div>
  );
}
