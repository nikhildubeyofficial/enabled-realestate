'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Mock orders for development
    const mockOrders = [
        {
            _id: 'ord_1',
            products: [
                {
                    productId: '1',
                    name: 'Pediatric Tracheostomy Care Booklet',
                    price: 150000,
                    quantity: 1,
                    image: '/Book.png'
                }
            ],
            totalPrice: 150000,
            address: {
                fullName: "Guest User",
                email: "guest@example.com",
                phone: "+6287784629666",
                street: "Jl. Example No. 123",
                city: "Jakarta",
                state: "DKI Jakarta",
                postalCode: "12345",
                country: "Indonesia"
            },
            createdAt: new Date().toISOString()
        }
    ];

    useEffect(() => {
        // Simulate fetching orders
        const timer = setTimeout(() => {
            setOrders(mockOrders);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const Skeleton = ({ className }) => (
        <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
    );

    return (
        <div className="font-sans">
            <div className="flex flex-col min-h-screen font-inter">
                <Navbar />
                <main className="flex-grow bg-[#fafafa] py-10">
                    <div className="max-w-5xl mx-auto p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                            <h2 className="text-3xl font-bold text-gray-800">Your Orders</h2>
                        </div>

                        {isLoading ? (
                            <div className="space-y-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="rounded-lg p-4 shadow-sm bg-white space-y-4 border border-gray-100">
                                        <Skeleton className="h-4 w-2/3" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                ))}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-lg">No orders found.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map(order => (
                                    <div key={order._id} className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center border border-gray-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={order.products[0]?.image || "/placeholder.jpg"}
                                                alt={order.products[0]?.name}
                                                className="w-20 h-20 object-cover rounded border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                                    {order.address?.fullName || "Order Items"}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {order.products.map(p => p.name).join(", ")}
                                                </p>
                                                <div className="flex gap-4 text-sm text-gray-500">
                                                    <span>Qty: {order.products.reduce((acc, p) => acc + p.quantity, 0)}</span>
                                                    <span>Total: {formatCurrency(order.totalPrice)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex-1 md:flex-none text-[#3455b9] font-semibold hover:underline px-4 py-2"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Order Details Modal */}
                    {selectedOrder && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 transition-all">
                            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    ×
                                </button>
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h3>

                                <div className="space-y-4 mb-8">
                                    {selectedOrder.products.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4 shadow-sm bg-gray-50">
                                            <img
                                                src={item.image || "/placeholder.jpg"}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-800">{formatCurrency(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center text-xl font-black text-gray-900 border-t pt-4 mb-8">
                                    <span>Total Price</span>
                                    <span>{formatCurrency(selectedOrder.totalPrice)}</span>
                                </div>

                                <div className="border-t pt-6 bg-gray-50 -mx-6 px-6 -mb-6 rounded-b-2xl">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">Customer Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                                            <p className="text-gray-800 font-medium">{selectedOrder.address?.fullName || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                            <p className="text-gray-800 font-medium">{selectedOrder.address?.email || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                                            <p className="text-gray-800 font-medium">{selectedOrder.address?.phone || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="pb-6">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Shipping Address</p>
                                        <p className="text-gray-800 leading-relaxed font-medium">
                                            {selectedOrder.address?.street}, {selectedOrder.address?.city}, {selectedOrder.address?.state}, {selectedOrder.address?.postalCode}, {selectedOrder.address?.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}
