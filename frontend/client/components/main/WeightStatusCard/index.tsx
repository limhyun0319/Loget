import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useAuth } from '@/context/AuthContext';

export default function WeightStatusCard() {
  const { user } = useAuth();

  // 아직 데이터가 없을 때를 대비한 기본값 설정
  const currentWeight = user?.startWeight || 0;
  const target = user?.targetWeight || 0;
  // 목표 체중과의 차이나 이전 기록과의 차이를 계산할 수 있습니다 (현재는 예시)
  const weightDiff = currentWeight - target; 

  return (
    <View style={styles.card}>
      <Text style={styles.label}>오늘의 몸무게</Text>
      
      <View style={styles.weightContainer}>
        <Text style={styles.weightText}>{currentWeight}</Text>
        <Text style={styles.unitText}>kg</Text>
      </View>

      <Text style={styles.diffText}>
        목표까지 {weightDiff > 0 ? `${weightDiff.toFixed(1)}kg 남았어요!` : '목표 달성! 🎉'}
      </Text>
    </View>
  );
}