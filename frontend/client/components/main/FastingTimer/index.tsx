import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function FastingTimer() {
  // 나중에 실제 타이머 로직이 들어갈 자리입니다.
  const remainingTime = "14:02:30"; 

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>간헐적 단식 시간</Text>
      
      <View style={styles.progressContainer}>
        {/* 원형 그래프 레이아웃 */}
        <View style={styles.circleOutline}>
          <Text style={styles.timerText}>{remainingTime}</Text>
          <Text style={styles.timerSub}>남은 단식 시간</Text>
        </View>
      </View>
    </View>
  );
}