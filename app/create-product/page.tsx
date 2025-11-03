// src/app/create-product/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import Link from 'next/link';

export default function CreateProductPage() {
    const router = useRouter();
    const { addProduct } = useProductStore();

    const [formData, setFormData] = useState({
        breed: '',
        country: '',
        origin: '',
        coat: '',
        pattern: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.breed.trim()) newErrors.breed = 'Breed is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            addProduct(formData);
            router.push('/products');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Create Cat Breed</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Breed *</label>
                    <input
                        type="text"
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Persian"
                    />
                    {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Country</label>
                    <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Iran"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Origin</label>
                    <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Natural"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Coat</label>
                    <input
                        type="text"
                        value={formData.coat}
                        onChange={(e) => setFormData({ ...formData, coat: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Long"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Pattern</label>
                    <input
                        type="text"
                        value={formData.pattern}
                        onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Solid"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Save Breed
                    </button>
                    <Link
                        href="/products"
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}