import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const postLogin = async (loginData: any) => {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    return response.data;
}