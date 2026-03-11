import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useAuth } from '@/context/AuthContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function MainHeader({selectedDate, onDateChange}) {
  const router = useRouter();

  const { user } = useAuth(); // 전역 바구니에서 유저 정보 꺼내기
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const displayDate = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    onDateChange(date); // 부모(MainScreen)의 날짜 상태 변경 -> API 자동 호출됨
    hideDatePicker();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.titleContainer} 
        onPress={() => router.push('/settings')} // 설정 페이지 경로
        activeOpacity={0.6}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.userName}>{user?.name || '사용자'}님</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" style={{ marginTop: 8, marginLeft: 2 }} />
        </View>
        <Text style={styles.subtitle}>왔으면 기록해라</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatePicker} activeOpacity={0.7}>
        <Text style={[styles.dateText, { color: '#fff', fontWeight: 'bold' }]}>
          {displayDate} ▾
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedDate}
        locale="ko_KR"
        confirmTextIOS="선택"
        cancelTextIOS="취소"
      />
    </View>
  );
}