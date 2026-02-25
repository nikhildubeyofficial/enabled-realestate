'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal
  } = useCart();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      updateQuantity(id, newQty);
    }
  };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 overflow-x-auto">
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
                      <tr key={item.id} className="bg-white shadow-sm border border-gray-100 rounded-md">
                        <td className="p-4">
                          <div className="flex items-center gap-4 group">
                            <img
                              src={item.image || '/Girly.png'}
                              alt={item.name}
                              className="w-16 h-16 object-contain rounded border border-gray-100 bg-gray-50 p-1"
                              onError={(e) => { e.target.src = '/Girly.png'; }}
                            />
                            <span className="text-sm sm:text-base font-bold text-gray-800">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{formatCurrency(item.price)}</td>
                        <td className="p-4 text-gray-600">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors font-bold"
                            >
                              -
                            </button>
                            <span className="w-4 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-[#f0312f] font-bold">{formatCurrency((item.price || 0) * (item.quantity || 1))}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove"
                          >
                            <span className="text-lg">🗑️</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {cartItems.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <span className="text-5xl">🛒</span>
                            <p className="text-gray-500 font-medium">Your cart is empty.</p>
                            <Link href="/products" className="bg-[#f0312f] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
                              Start Shopping
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {cartItems.length > 0 && (
                  <button
                    onClick={() => router.push('/products')}
                    className="mt-6 border-2 border-gray-200 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700"
                  >
                    ← Continue Shopping
                  </button>
                )}
              </div>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <div className="flex flex-col">
                  <div className="border border-gray-100 rounded-[32px] p-8 w-full bg-[#fafafa] shadow-lg shadow-gray-100">
                    <h3 className="text-xl font-black mb-8 text-gray-900 uppercase tracking-tight">Cart Total</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between pb-6 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Subtotal</span>
                        <span className="font-bold text-gray-900">{formatCurrency(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between pb-6 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Shipping</span>
                        <span className="text-green-600 font-black uppercase text-xs tracking-widest">Calculated at Checkout</span>
                      </div>
                      <div className="flex justify-between text-2xl font-black pt-2">
                        <span className="text-gray-900">Total</span>
                        <span className="text-[#f0312f]">{formatCurrency(cartTotal)}</span>
                      </div>
                    </div>
                    {user ? (
                      <button
                        onClick={() => router.push('/billing')}
                        className="mt-10 w-full bg-[#f0312f] hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-100 transition-all active:scale-95 uppercase tracking-widest text-sm"
                      >
                        Proceed to checkout
                      </button>
                    ) : (
                      <div className="mt-10 space-y-4">
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                          <p className="text-xs text-center text-[#f0312f] font-bold">Please login or signup to continue to checkout</p>
                        </div>
                        <button
                          onClick={() => router.push('/login')}
                          className="w-full bg-[#f0312f] hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-100 transition-all active:scale-95 uppercase tracking-widest text-sm"
                        >
                          Login to Checkout
                        </button>
                        <button
                          onClick={() => router.push('/signup')}
                          className="w-full bg-white text-gray-900 border-2 border-gray-100 hover:border-gray-900 font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-sm"
                        >
                          Create Account
                        </button>
                      </div>
                    )}
                  </div>
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
