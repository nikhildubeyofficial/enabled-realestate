'use client';

import { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

export default function AdminDonationsPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDonation, setNewDonation] = useState({ title: '', recipient: '', amount: '', date: '', image: '', description: '' });

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await fetch('/api/admin/donations');
            const data = await res.json();
            setDonations(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDonation = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDonation),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setNewDonation({ title: '', recipient: '', amount: '', date: '', image: '', description: '' });
                fetchDonations();
            }
        } catch (error) {
            console.error('Add error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Donation Distributions</h2>
                    <p className="text-gray-400 font-medium text-sm mt-1">Found {donations.length} impact stories</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#f0312f] text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-100 active:scale-95"
                >
                    + Log New Distribution
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-gray-400 font-medium">Loading records...</div>
                ) : donations.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 font-medium">
                        No donation distributions logged yet.
                    </div>
                ) : donations.map((donation) => (
                    <div key={donation.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                            {donation.image ? (
                                <img src={donation.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="flex items-center justify-center w-full h-full">
                                    <Heart className="w-12 h-12 text-gray-300 shrink-0" aria-hidden />
                                </span>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                                    {donation.date || 'No Date'}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{donation.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">{donation.description}</p>
                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Recipient</p>
                                    <p className="text-sm font-bold text-gray-800">{donation.recipient}</p>
                                </div>
                                <button className="text-red-600 hover:text-red-700 font-bold text-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-gray-800">Log Distribution</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg" aria-label="Close"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleAddDonation} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Event Title</label>
                                <input required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all outline-none font-medium"
                                    value={newDonation.title} onChange={(e) => setNewDonation({ ...newDonation, title: e.target.value })} placeholder="e.g., Blood Oxygen Monitor Distribution" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Recipient/Location</label>
                                    <input required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all outline-none font-medium"
                                        value={newDonation.recipient} onChange={(e) => setNewDonation({ ...newDonation, recipient: e.target.value })} placeholder="e.g., Jakarta Families" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Date</label>
                                    <input type="date" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all outline-none font-medium"
                                        value={newDonation.date} onChange={(e) => setNewDonation({ ...newDonation, date: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Impact Description</label>
                                <textarea required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all outline-none font-medium h-32"
                                    value={newDonation.description} onChange={(e) => setNewDonation({ ...newDonation, description: e.target.value })} placeholder="Describe the impact produced by this donation..." />
                            </div>
                            <button type="submit" className="w-full bg-[#f0312f] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-100 hover:bg-red-700 transition-all active:scale-[0.98] mt-4">
                                Save Impact Story
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
