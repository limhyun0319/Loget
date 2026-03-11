import React, { createContext, useState, useContext, ReactNode } from 'react';

// 컨텍스트가 가질 데이터들의 "타입"을 미리 정의합니다.
interface DateContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DateContext = createContext<DateContextType | null>(null);

interface DateProviderProps {
  children: ReactNode;
}

export function DateProvider({ children }: DateProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
}

export const useDate = () => {
    const context = useContext(DateContext);
    if(!context){
        throw new Error('useDate must be used within a DateProvider');
    }
    return context;
};