'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for initial development if backend is not available
  const mockItems = [
    {
      productId: {
        _id: '1',
        name: 'Pediatric Tracheostomy Care Booklet',
        price: 150000,
        image: '/Book.png'
      },
      quantity: 1
    }
  ];

  useEffect(() => {
    // Simulate fetching cart items
    const timer = setTimeout(() => {
      setCartItems(mockItems);
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

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.productId._id !== id));
    // In real app, call API here
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);

  const Skeleton = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
  );

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main className="flex-grow bg-white">
          <div className="max-w-7xl mx-auto p-6 sm:p-8 min-h-[calc(100vh-390px)]">
            {/* Breadcrumbs */}
            <div className="mb-4 text-gray-500 text-sm">
              <Link href="/" className="text-gray-400 hover:text-gray-600">Home</Link>
              <span className="mx-2">/</span>
              <span>Cart</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 overflow-x-auto">
                {isLoading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white shadow rounded-md p-4 flex items-center justify-between border border-gray-100">
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-12 h-12" />
                          <Skeleton className="w-32 h-4" />
                        </div>
                        <Skeleton className="w-16 h-4" />
                        <Skeleton className="w-12 h-4" />
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="w-6 h-6" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <table className="min-w-full border-separate border-spacing-y-4">
                      <thead className="bg-[#f4f4f4] text-left">
                        <tr className="font-inter">
                          <th className="p-4 font-medium text-gray-700">Product</th>
                          <th className="p-4 font-medium text-gray-700">Price</th>
                          <th className="p-4 font-medium text-gray-700">Quantity</th>
                          <th className="p-4 font-medium text-gray-700">Subtotal</th>
                          <th className="p-4 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.productId._id} className="bg-white shadow-sm border border-gray-100 rounded-md">
                            <td className="p-4">
                              <Link href={`/product-details/${item.productId._id}`} className="flex items-center gap-3 group">
                                <img
                                  src={item.productId.image}
                                  alt={item.productId.name}
                                  className="w-12 h-12 object-cover rounded border border-gray-200"
                                />
                                <span className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                  {item.productId.name}
                                </span>
                              </Link>
                            </td>
                            <td className="p-4 text-gray-600">{formatCurrency(item.productId.price)}</td>
                            <td className="p-4 text-gray-600">{item.quantity}</td>
                            <td className="p-4 text-gray-800 font-medium">{formatCurrency(item.productId.price * item.quantity)}</td>
                            <td className="p-4">
                              <button
                                onClick={() => handleRemoveItem(item.productId._id)}
                                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-sm font-medium"
                                title="Remove"
                              >
                                <span>❌</span>
                                <span className="hidden sm:inline">Remove</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {cartItems.length === 0 && (
                          <tr>
                            <td colSpan="5" className="p-10 text-center text-gray-500 italic">
                              Your cart is empty.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <button
                      onClick={() => router.push('/products')}
                      className="mt-6 border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition-colors font-medium text-gray-700"
                    >
                      Return To Shop
                    </button>
                  </>
                )}
              </div>

              {/* Cart Summary */}
              <div className="flex flex-col">
                <div className="border border-gray-300 rounded-md p-6 sm:p-8 w-full bg-[#fafafa]">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Cart Total</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-4 border-bottom border-gray-200">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between pb-4 border-bottom border-gray-200">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (cartItems.length === 0) {
                        alert("Your cart is empty. Please add items before proceeding to checkout.");
                      } else {
                        router.push('/billing');
                      }
                    }}
                    className="mt-8 w-full bg-[#3455b9] hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
