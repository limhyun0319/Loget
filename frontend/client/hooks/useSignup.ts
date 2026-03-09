import {useState} from 'react';
import { postSignup } from '@/api/auth';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (formData: any) => {
        setIsLoading(true);

        // 🔥 여기 추가
        console.log("ENV API =", process.env.EXPO_PUBLIC_API_URL);

        try {
            const data = await postSignup(formData);
            return {success: true, data};
        } catch (error: any) {

            // 🔥 여기 추가
            console.log("message:", error.message);
            console.log("code:", error.code);
            console.log("status:", error.response?.status);
            console.log("resp:", error.response?.data);

            console.error('회원가입 에러:', error.response?.data || error.message);
            return {success: false, error};
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading };
};