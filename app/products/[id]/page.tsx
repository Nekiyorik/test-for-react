// src/app/products/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useProductStore } from '@/store/useProductStore';
import * as React from 'react';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const { products } = useProductStore();
    const product = products.find((p) => p.id === id);

    if (!product) return notFound();

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <Link href="/products" className="text-blue-500 mb-4 inline-block">
                ← Back to products
            </Link>
            <div className="border rounded-lg p-6 shadow">
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
        </div>
    );
}