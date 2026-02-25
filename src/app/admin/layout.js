'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAuthChecking, setIsAuthChecking] = useState(true);

    useEffect(() => {
        // Auth check for all /admin routes except /admin/login
        if (pathname !== '/admin/login') {
            const token = sessionStorage.getItem('admin_token');
            if (!token) {
                router.push('/admin/login');
            } else {
                setIsAuthChecking(false);
            }
        } else {
            setIsAuthChecking(false);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_email');
        router.push('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Products', href: '/admin/products', icon: '🛍️' },
        { name: 'Donations', href: '/admin/donations', icon: '💝' },
        { name: 'Orders', href: '/admin/orders', icon: '📦' },
        { name: 'Go to Website', href: '/', icon: '🌐' },
    ];

    if (isAuthChecking) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#f0312f] border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Don't wrap login page in the dashboard layout
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#f8f9fa] font-inter">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-gray-200 transition-all duration-300 shadow-sm ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-6 flex items-center gap-3 border-b border-gray-100">
                    <div className="w-8 h-8 bg-[#f0312f] rounded flex items-center justify-center text-white font-bold text-lg">E</div>
                    {isSidebarOpen && <span className="font-black text-xl tracking-tight text-gray-800">Admin.</span>}
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-red-50 text-[#f0312f] font-bold shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-medium'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {isSidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-500 hover:bg-red-50 hover:text-[#f0312f] font-medium"
                    >
                        <span className="text-xl">🚪</span>
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? '⬅️' : '➡️'}
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {navItems.find(i => i.href === pathname)?.name || 'Admin'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-800">Administrator</p>
                            <p className="text-xs text-gray-400 font-medium">Full Access</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=f0312f&color=fff" alt="Admin" />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
