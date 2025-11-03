// src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiHeart, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import { useProductStore } from '@/store/useProductStore';
import { fetchBreeds } from '@/lib/catApi';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

type Filter = 'all' | 'liked';

export default function ProductsPage() {
    const router = useRouter();
    const { products, setProductsFromApi } = useProductStore();
    const [filter, setFilter] = useState<Filter>('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (products.length === 0) {
            fetchBreeds(20).then(setProductsFromApi).catch(console.error);
        }
    }, []);

    const filteredProducts = products
        .filter((p) => (filter === 'liked' ? p.liked : true))
        .filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link
                    href="/create-product"
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    <FiPlus />
                    <span>Create Product</span>
                </Link>
            </div>

            {/* Фильтры */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('liked')}
                    className={`px-4 py-2 rounded ${filter === 'liked' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                >
                    Liked
                </button>
            </div>

            {/* Поиск */}
            <div className="mb-6 relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 w-full p-2 border rounded"
                />
            </div>

            {/* Список карточек */}
            {filteredProducts.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}