import React, { createContext, useState, useContext } from 'react';

// 1. 바구니에 담길 내용의 타입을 정의합니다.
interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
}

// 2. 실제 바구니(Context)를 생성합니다.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. 앱 전체에 바구니를 씌워주는 '공급자(Provider)'를 만듭니다.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null); // 전역 유저 상태

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. 다른 곳에서 편하게 바구니를 열어볼 수 있게 하는 커스텀 훅입니다.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('AuthProvider 안에서만 사용할 수 있어요!');
    return context;
};