'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { cartCount } = useCart();

    const handleNavbarToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleAboutUsClick = () => {
        setIsOpen(false);
        if (pathname === '/') {
            // Already on home, just scroll
            const section = document.getElementById('about-us');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Navigate to home, then scroll after page load
            router.push('/#about-us');
        }
    };

    const handleSignupLogin = () => {
        router.push('/login');
    };

    return (
        <nav className="w-full bg-[#F0312F] text-white font-inter shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Enabled.
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    <button className="hover:underline" onClick={handleAboutUsClick}>About Us</button>
                    <Link href="/products" className="hover:underline">
                        Impact Shop
                    </Link>
                    <Link href="/impact-outcomes" className="hover:underline">
                        Impact Outcomes
                    </Link>
                    <Link href="/be-a-donor" className="hover:underline">
                        Be a Donor
                    </Link>
                    <Link href="/cart" className="hover:underline flex items-center gap-1">
                        Cart {cartCount > 0 && <span className="bg-white text-[#F0312F] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                    </Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="flex items-center gap-2 bg-white text-[#F0312F] px-4 py-2 rounded font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                👤 {user.name}
                            </Link>
                            <button onClick={logout} className="text-white hover:underline transition-all">Logout</button>
                        </div>
                    ) : (
                        <button className="bg-white text-[#F0312F] px-4 py-2 rounded hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" onClick={handleSignupLogin}>
                            Signup / Login
                        </button>
                    )}
                </div>
                <button className="md:hidden" onClick={handleNavbarToggle}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-menu"
                        aria-hidden="true"
                    >
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#F0312F] px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full left-0">
                    <button className="block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-red-700" onClick={handleAboutUsClick}>
                        About Us
                    </button>
                    <Link href="/products" className="block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-red-700">
                        Impact Shop
                    </Link>
                    <Link href="/impact-outcomes" className="block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-red-700">
                        Impact Outcomes
                    </Link>
                    <Link href="/be-a-donor" className="block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-red-700">
                        Be a Donor
                    </Link>
                    <Link href="/cart" className="block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-red-700 flex items-center justify-between">
                        <span>Cart</span>
                        {cartCount > 0 && <span className="bg-white text-[#F0312F] text-[10px] font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
                    </Link>
                    <button className="block w-full mt-2 bg-white text-[#F0312F] px-4 py-2 rounded hover:bg-gray-100 transition-all duration-300 text-center font-bold hover:-translate-y-1 hover:shadow-lg" onClick={handleSignupLogin}>
                        Signup / Login
                    </button>
                </div>
            )}
        </nav>
    );
}
