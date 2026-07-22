import { request } from "./utils/api";

// Получения списка изображений\видео
export const getDoggos = async (): Promise<{
    filename: string;
    likes: number;
}> => {
    return request('/publications');
};

// Получение конкретного изображения\видео по имени файла
export const getDog = async (fileName: string): Promise<{
    success: boolean;
    data: string
}> => {
    return request(`${fileName}`);
};