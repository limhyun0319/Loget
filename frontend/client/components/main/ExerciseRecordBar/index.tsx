import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseRecordBar() {
  const handlePress = () => {
    console.log('운동 기록 페이지로 이동');
    // router.push('/record/exercise');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>운동 기록</Text>
      
      <TouchableOpacity style={styles.bar} onPress={handlePress} activeOpacity={0.8}>
        {/* 디자인처럼 우측에 갈색 계열이나 어두운 색 아이콘 배치 */}
        <Ionicons name="add" size={30} color="#4f1616" />
      </TouchableOpacity>
    </View>
  );
}