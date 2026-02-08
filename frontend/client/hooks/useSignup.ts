import {useState} from 'react';
import { postSignup } from '@/api/auth';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (formData: any) => {
        setIsLoading(true);
        try {
            const data = await postSignup(formData);
            return {success: true, data};
        } catch (error: any) {
            console.error('회원가입 에러:', error.response?.data || error.message);
            return {success: false, error};
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading };
};
