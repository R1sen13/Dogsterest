import { checkResponse } from "./responseChek";

const API_URL = 'http://localhost:3000';

export const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    return checkResponse(res);
};