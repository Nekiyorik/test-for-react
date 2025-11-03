export type Product = {
    id: string;       // = breed
    title: string;    // = breed (для удобства отображения)
    description: string; // сгенерировано из country, origin, coat, pattern
    liked: boolean;
    // Сохраняем исходные поля для редактирования (опционально, но полезно)
    country?: string;
    origin?: string;
    coat?: string;
    pattern?: string;
};

export type ProductFormData = {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
};