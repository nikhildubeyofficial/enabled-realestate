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
          dangerouslySetInnerHTML={{ __html: `<div class="min-h-screen flex flex-col"><div class="flex-1 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-6xl mx-auto"><div class="text-center mb-12" ><h1 class="text-4xl font-bold text-gray-800 mb-6">Pediatric Tracheostomy Care Booklet</h1><p class="text-lg text-gray-600 max-w-3xl mx-auto">Our comprehensive care booklet provides essential information and guidance for families and caregivers of pediatric tracheostomy patients, ensuring the best possible care and outcomes.</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" ><div class="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full"><div class="flex-1"><div class="mb-6"><h3 class="text-xl font-semibold text-gray-800 mb-2">Download Booklet</h3><p class="text-gray-600 mb-4">Download our comprehensive Pediatric Tracheostomy Care Booklet in your preferred language. This booklet is a collection of contributions from parents of pediatric tracheostomy patients in Indonesia.</p></div></div><div class="mt-auto"><div class="grid grid-cols-1 gap-3"><button class="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2" tabindex="0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span>Download Bahasa Version</span></button><button class="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2" tabindex="0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span>Download English Version</span></button></div></div></div><div class="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full"><div class="flex-1"><h2 class="text-2xl font-semibold text-gray-800 mb-4">Care Booklet Contents</h2><div class="space-y-4"><div class="flex items-start"><div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1"><svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div><h3 class="font-semibold text-gray-800">List of necessary medical supplies and equipment </h3><p class="text-gray-600 text-sm">A complete inventory of essential items required for pediatric tracheostomy care. </p></div></div><div class="flex items-start"><div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1"><svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div><h3 class="font-semibold text-gray-800">Instructions for pediatric tracheostomy care training </h3><p class="text-gray-600 text-sm">Step-by-step guidance for safely performing and managing tracheostomy care.</p></div></div><div class="flex items-start"><div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1"><svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div><h3 class="font-semibold text-gray-800">List of must-watch videos for Indonesian pediatric tracheostomy patient parents </h3><p class="text-gray-600 text-sm">Curated educational videos to support parents in caring for their children. </p></div></div><div class="flex items-start"><div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1"><svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div><h3 class="font-semibold text-gray-800">List of necessary contacts  </h3><p class="text-gray-600 text-sm">Important support resources to reach when needed.</p></div></div></div></div></div></div><div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-12" ><h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Our Booklet Matters</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="text-center"><div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2">Comprehensive Guide</h3><p class="text-gray-600">All-in-one resource for tracheostomy care</p></div><div class="text-center"><div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2">Family-Friendly</h3><p class="text-gray-600">Accessible language and format for all family members</p></div></div></div></div></div></div>` }}
        />
        <Footer />
      </div>
    </div>
  );
}
