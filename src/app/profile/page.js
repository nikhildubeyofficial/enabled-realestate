'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock user data since Firebase is not yet connected
        const mockUser = {
            displayName: "Guest User",
            email: "guest@example.com"
        };

        // Simulate checking auth state
        const timer = setTimeout(() => {
            setUser(mockUser);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        // In real app, call firebase.signOut()
        alert("Logging out...");
        router.push('/login');
    };

    return (
        <div className="font-sans">
            <div className="flex flex-col min-h-screen font-inter">
                <Navbar />
                <main className="flex-grow bg-[#fafafa] flex items-center justify-center py-12 px-4">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Profile</h2>
                            {user && <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                {user.displayName ? user.displayName[0] : 'U'}
                            </div>}
                        </div>

                        {isLoading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                            </div>
                        ) : user ? (
                            <div className="space-y-6">
                                <div className="group">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="text-lg text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                                        {user.displayName || "N/A"}
                                    </p>
                                </div>

                                <div className="group">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-lg text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                                        {user.email}
                                    </p>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <button
                                        onClick={() => router.push('/orders')}
                                        className="w-full border border-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-all font-medium"
                                    >
                                        View My Orders
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-[#3455b9] text-white p-3 rounded-lg hover:bg-blue-800 shadow-md transition-all active:scale-95 font-bold"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-6 font-medium italic">Please log in to view your profile.</p>
                                <Link
                                    href="/login"
                                    className="inline-block bg-[#3455b9] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md"
                                >
                                    Login Now
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
