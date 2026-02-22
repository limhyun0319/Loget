import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function MealRecordGrid() {
  const mealTypes = ['아침', '점심', '저녁', '간식'] as const;

  const handlePress = (type: string) => {
    console.log(`${type} 기록하기 클릭!`);
    // 나중에 router.push('/record/meal') 등으로 페이지 이동 로직 추가
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {mealTypes.map((type) => (
          <TouchableOpacity 
            key={type} 
            style={styles.mealCard} 
            onPress={() => handlePress(type)}
          >
            <Text style={styles.mealLabel}>{type}</Text>
            
            {/* 사진이 없을 때는 + 아이콘, 있을 때는 Image 렌더링 (예시 구조) */}
            <Ionicons name="add" size={32} color="rgba(255,255,255,0.4)" />
            
            {/* 실제 이미지가 들어오면 아래처럼 보일 거예요 
            <Image source={{uri: '...'}} style={styles.mealImage} />
            <View style={styles.overlay} /> 
            */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}