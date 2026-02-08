import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const postSignup = async (signupData: any) => {
    const response = await axios.post(`${API_URL}/auth/signup`, signupData);
    return response.data;
}