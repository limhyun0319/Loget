import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useAuth } from '@/context/AuthContext';

export default function MainHeader() {
  const { user } = useAuth(); // 전역 바구니에서 유저 정보 꺼내기

  // 오늘 날짜 가져오기 (예: 2월 13일)
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.userName}>{user?.name || '사용자'}님,</Text>
        <Text style={styles.subtitle}>왔으면 기록해라</Text>
      </View>
      <Text style={styles.dateText}>{dateString}</Text>
    </View>
  );
}