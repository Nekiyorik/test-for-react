// src/components/ProductCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useProductStore } from '@/store/useProductStore';

type Props = {
    product: {
        id: string;
        title: string;
        description: string;
        liked: boolean;
    };
};

export default function ProductCard({ product }: Props) {
    const router = useRouter();
    const { toggleLike, deleteProduct } = useProductStore();

    const handleCardClick = () => {
        router.push(`/products/${product.id}`);
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleLike(product.id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteProduct(product.id);
    };

    // Обрезаем описание до ~100 символов
    const shortDesc = product.description.length > 100
        ? product.description.slice(0, 100) + '...'
        : product.description;

    return (
        <div
            onClick={handleCardClick}
            className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col h-full"
        >
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <p className="text-sm text-gray-600 flex-grow">{shortDesc}</p>

            <div className="mt-3 flex justify-between items-center">
                <button onClick={handleLike} className="text-xl">
                    <FiHeart
                        className={product.liked ? 'text-red-500 fill-current' : 'text-gray-400'}
                    />
                </button>
                <button onClick={handleDelete} className="text-xl text-gray-400 hover:text-red-500">
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}