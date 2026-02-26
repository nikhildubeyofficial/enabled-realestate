'use client';

import { ShoppingBag, Heart, Package, Plus, FileText } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Products', value: '12', Icon: ShoppingBag, color: 'bg-blue-500', trend: '+2 this month' },
        { label: 'Total Donations', value: '45', Icon: Heart, color: 'bg-red-500', trend: '+5 this month' },
        { label: 'Recent Orders', value: '8', Icon: Package, color: 'bg-green-500', trend: '+1 today' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between">
                            <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <stat.Icon className="w-6 h-6 text-current opacity-80" aria-hidden />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {stat.trend}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Recent Activity Stubs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-[#f0312f] transition-all border border-transparent hover:border-red-100 group min-h-[120px]">
                            <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform shrink-0" aria-hidden />
                            <span className="font-bold text-sm">Add Product</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-[#f0312f] transition-all border border-transparent hover:border-red-100 group min-h-[120px]">
                            <FileText className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform shrink-0" aria-hidden />
                            <span className="font-bold text-sm">Post Update</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-4">Health Status</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                            <span className="text-sm font-bold text-green-800">Backend Connected</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                            <span className="text-sm font-bold text-blue-800">Database (JSON) Ready</span>
                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
