import Link from 'next/link';

export default function ProductsGrid() {
    return (
        <section className="py-8 px-4 sm:px-6 md:px-10 lg:px-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Available Products</h2>
                <Link
                    href="/products"
                    className="bg-[#f0312f] text-white px-6 py-2 rounded hover:bg-red-700 text-center w-fit transition-colors"
                >
                    View All
                </Link>
            </div>
            {/* Intentionally left empty grid as per original HTML structure (it seems populated via client-fetching or is empty in original design) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
        </section>
    );
}
