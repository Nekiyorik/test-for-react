// src/lib/catApi.ts
import { Product } from '@/types';

const CAT_API_BASE_URL = 'https://catfact.ninja';

export const fetchBreeds = async (limit = 20): Promise<Product[]> => {
    const res = await fetch(`${CAT_API_BASE_URL}/breeds?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch breeds');
    const data = await res.json();

    return data.data.map((item: any) => {
        const desc = [
            item.origin && `Origin: ${item.origin}`,
            item.country && `Country: ${item.country}`,
            item.coat && `Coat: ${item.coat}`,
            item.pattern && `Pattern: ${item.pattern}`,
        ]
            .filter(Boolean)
            .join(', ');

        return {
            id: item.breed,
            title: item.breed,
            description: desc || 'No details available.',
        };
    });
};