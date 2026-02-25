'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products via our proxy API to avoid CORS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        // Handle both array and { products: [] } shaped responses
        setAllProducts(Array.isArray(data) ? data : (data.products || data.data || []));
      } catch (err) {
        console.error('Products fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter + sort
  const filteredProducts = allProducts
    .filter((p) => {
      const q = searchTerm.toLowerCase();
      return (
        (p.name || p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const nameA = (a.name || a.title || '').toLowerCase();
      const nameB = (b.name || b.title || '').toLowerCase();
      if (sortOrder === 'asc') return nameA.localeCompare(nameB);
      if (sortOrder === 'desc') return nameB.localeCompare(nameA);
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleAddToCart = (product) => {
    const name = product.name || product.title || 'item';
    alert(`"${name}" has been added to your cart!`);
  };

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
            {/* Search and Sort Controls */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <input
                placeholder="Search by name, category, or description..."
                className="flex-1 p-3 border-2 border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0312f] focus:border-[#f0312f] transition-all"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
              />
              <select
                className="p-3 border-2 border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0312f] bg-white hover:border-[#f0312f] transition-all cursor-pointer"
                value={sortOrder}
                onChange={handleSort}
              >
                <option value="default">Default</option>
                <option value="asc">A-Z (Alphabetical)</option>
                <option value="desc">Z-A (Reverse)</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col gap-3 p-4 rounded-xl shadow-sm">
                    <div className="bg-gray-300 h-40 w-full rounded-md"></div>
                    <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                    <div className="bg-gray-300 h-10 w-full rounded-md mt-2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16">
                <p className="text-red-500 text-lg font-semibold mb-2">Could not load products</p>
                <p className="text-gray-500 text-sm">{error}</p>
                <button
                  className="mt-4 bg-[#f0312f] text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No products found matching &quot;{searchTerm}&quot;</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {paginatedProducts.map((product, idx) => (
                      <div
                        key={product._id || product.id || idx}
                        className="flex flex-col rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={product.image || product.imageUrl || '/Girly.png'}
                          alt={product.name || product.title || 'Product'}
                          className="h-40 w-full object-contain bg-gray-50 p-2"
                          onError={(e) => { e.target.src = '/Girly.png'; }}
                        />
                        <div className="flex flex-col flex-grow p-4 gap-2">
                          <h3 className="font-bold text-gray-800 line-clamp-2">
                            {product.name || product.title || 'Product'}
                          </h3>
                          {product.price !== undefined && (
                            <p className="text-[#f0312f] font-semibold">
                              Rp {Number(product.price).toLocaleString('id-ID')}
                            </p>
                          )}
                          {product.description && (
                            <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                          )}
                          <button
                            className="mt-auto w-full bg-[#f0312f] text-white py-2 rounded-md hover:bg-red-700 transition font-medium"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Previous / Next Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                      className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={safePage <= 1}
                    >
                      ← Previous
                    </button>
                    <span className="text-gray-600 text-sm">
                      Page {safePage} of {totalPages}
                    </span>
                    <button
                      className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage >= totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
