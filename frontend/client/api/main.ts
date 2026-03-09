import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getMainData = async (userId: number, date: string) => {
    const response = await axios.get(`${API_URL}/main`, {
        params: {userId, date}
    });
    return response.data;
}

export const getWeightRecord = async (userId: number, date: string) => {
    const response = await axios.get(`${API_URL}/weight`, {
        params: {userId, date}
    });
    return response.data;
}

export const postWeightRecord = async (weightData: {userId: number; date:string; currentWeight:number}) => {
    const response = await axios.post(`${API_URL}/weight`, weightData);
    return response.data
}