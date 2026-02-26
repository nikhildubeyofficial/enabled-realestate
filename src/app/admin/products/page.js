'use client';

import { useState, useEffect } from 'react';
import { FileText, Pencil, Trash2, X } from 'lucide-react';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        status: 'Available',
        image: '/Girly.png',
        description: '',
        pdfFile: '',
        features: '',
        inStock: true
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            // Process features into an array if they are comma-separated
            const processedProduct = {
                ...newProduct,
                features: newProduct.features.split(',').map(f => f.trim()).filter(f => f),
                price: Number(newProduct.price)
            };

            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedProduct),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setNewProduct({
                    name: '',
                    price: '',
                    category: '',
                    status: 'Available',
                    image: '/Girly.png',
                    description: '',
                    pdfFile: '',
                    features: '',
                    inStock: true
                });
                fetchProducts();
            }
        } catch (error) {
            console.error('Add error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Manage Products</h2>
                    <p className="text-gray-400 font-medium text-sm mt-1">Total {products.length} products listed</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#f0312f] text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-100 active:scale-95"
                >
                    + Add New Product
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">PDF</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400 font-medium">Loading products...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400 font-medium">No products found.</td></tr>
                        ) : products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                            <img src={product.image} alt="" className="w-full h-full object-contain" onError={(e) => e.target.src = '/Girly.png'} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{product.name}</p>
                                            <p className="text-xs text-gray-400 font-medium truncate max-w-[200px]">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 text-sm font-black text-gray-900">Rp {Number(product.price).toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${product.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {product.pdfFile ? (
                                        <span className="text-blue-500 font-black text-[10px] uppercase flex items-center gap-1">
                                            <FileText className="w-3 h-3 shrink-0" aria-hidden /> Linked
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 font-black text-[10px] uppercase">No PDF</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                                        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-gray-800">Add New Product</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg" aria-label="Close"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Product Name</label>
                                    <input
                                        required
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="e.g. Sterimar nose hygiene"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Category</label>
                                    <input
                                        required
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        placeholder="e.g. Medical Supplies"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Price (Rp)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Image URL / Path</label>
                                    <input
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                        placeholder="/Girly.png"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">PDF File URL (Optional)</label>
                                <input
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                    value={newProduct.pdfFile}
                                    onChange={(e) => setNewProduct({ ...newProduct, pdfFile: e.target.value })}
                                    placeholder="e.g. /pdfs/manual.pdf"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Status</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                        value={newProduct.status}
                                        onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                        <option value="Discontinued">Discontinued</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 pt-6 pl-4">
                                    <input
                                        type="checkbox"
                                        id="inStock"
                                        checked={newProduct.inStock}
                                        onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                                        className="w-5 h-5 accent-[#f0312f]"
                                    />
                                    <label htmlFor="inStock" className="text-sm font-bold text-gray-600 cursor-pointer">In Stock</label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Product Features (Comma separated)</label>
                                <input
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium"
                                    value={newProduct.features}
                                    onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
                                    placeholder="e.g. Waterproof, 2 Year Warranty, Portable"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Description</label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#f0312f] transition-all font-medium h-24"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#f0312f] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-100 hover:bg-red-700 transition-all active:scale-[0.98] mt-4"
                            >
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
