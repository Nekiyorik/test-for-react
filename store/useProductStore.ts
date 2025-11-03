import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductFormData } from '@/types';

type ProductStore = {
    products: Product[];
    addProduct: (product: ProductFormData) => void;
    toggleLike: (id: string) => void;
    deleteProduct: (id: string) => void;
    setProductsFromApi: (products: Product[]) => void;
    updateProduct: (id: string, data: ProductFormData) => void;

};

export const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: [],

            addProduct: (data) =>
                set((state) => {
                    // Генерируем уникальный ID
                    const id = `user-${Date.now()}`;
                    const descParts = [
                        data.origin && `Origin: ${data.origin}`,
                        data.country && `Country: ${data.country}`,
                        data.coat && `Coat: ${data.coat}`,
                        data.pattern && `Pattern: ${data.pattern}`,
                    ].filter(Boolean).join(', ');

                    return {
                        products: [
                            ...state.products,
                            {
                                id,
                                title: data.breed || 'Custom Breed',
                                description: descParts || 'No details available.',
                                liked: false,
                                country: data.country,
                                origin: data.origin,
                                coat: data.coat,
                                pattern: data.pattern,
                            },
                        ],
                    };
                }),

            toggleLike: (id) =>
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === id ? { ...p, liked: !p.liked } : p
                    ),
                })),

            deleteProduct: (id) =>
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id),
                })),

            setProductsFromApi: (products) =>
                set((state) => {
                    // Сохраняем локальные продукты + обновляем/добавляем API-продукты
                    const localProducts = state.products.filter(p => !p.id.includes(' ')); // или другой признак локальных
                    const apiProductIds = new Set(products.map(p => p.id));
                    const merged = [
                        ...localProducts,
                        ...products.filter(p => !localProducts.some(lp => lp.id === p.id))
                    ];
                    return { products: merged };
                }),

            //редактируем карточку
            updateProduct: (id, data) =>
                set((state) => {
                    const descParts = [
                        data.origin && `Origin: ${data.origin}`,
                        data.country && `Country: ${data.country}`,
                        data.coat && `Coat: ${data.coat}`,
                        data.pattern && `Pattern: ${data.pattern}`,
                    ].filter(Boolean).join(', ');

                    return {
                        products: state.products.map((p) =>
                            p.id === id
                                ? {
                                    ...p,
                                    title: data.breed,
                                    description: descParts || 'No details available.',
                                    country: data.country,
                                    origin: data.origin,
                                    coat: data.coat,
                                    pattern: data.pattern,
                                }
                                : p
                        ),
                    };
                }),
        }),
        {
            name: 'product-storage', // ключ в localStorage
        }
    )
);