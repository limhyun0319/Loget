import {useState} from 'react';
import {postLogin} from '@/api/login';
import {Alert} from 'react-native';
import {useRouter} from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useAuth();
    const router = useRouter();
    
    const login = async (id: string, password:string) => {
        if (!id.trim() || !password.trim()){
            Alert.alert("빈칸을 채워주세요", "아이디 패스워드를 입력해주세요");
            return;
        }

        setIsLoading(true);
        try {
            const userData = await postLogin({id, password});
            const {user} = userData;
            setUser(user);
            console.log('로그인 성공:', user);
            
            router.replace('/(tabs)');
            return userData;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "아이디 또는 비밀번호가 틀렸습니다.";
            Alert.alert("로그인 실패", errorMsg);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {login, isLoading};
};