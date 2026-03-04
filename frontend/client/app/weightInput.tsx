import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const MAIN_COLOR = '#36bc9b'; // 로겟의 새로운 시그니처 컬러!

export default function WeightInputScreen() {
  const router = useRouter();
  const [weight, setWeight] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 관리

  // 이번 주의 월요일을 구해서 7일간의 날짜 리스트 생성
  const getWeekDays = () => {
    const now = new Date();
    const day = now.getDay(); // 0(일) ~ 6(토)
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // 월요일로 맞추기
    
    const monday = new Date(now.setDate(diff));
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push({
        fullDate: date,
        dayName: date.toLocaleDateString('ko-KR', { weekday: 'short' }),
        dateNum: date.getDate(),
        isToday: date.toDateString() === new Date().toDateString(),
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. 상단 주간 달력 (월요일 시작) */}
      <View style={styles.headerContainer}>
        {weekDays.map((item, index) => {
          const isSelected = item.fullDate.toDateString() === selectedDate.toDateString();
          return (
            <Pressable 
              key={index} 
              style={[styles.dateItem, isSelected && styles.selectedItem]}
              onPress={() => setSelectedDate(item.fullDate)}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedText]}>{item.dayName}</Text>
              <Text style={[styles.dateText, isSelected && styles.selectedText]}>{item.dateNum}</Text>
              {item.isToday && !isSelected && <View style={styles.todayDot} />}
            </Pressable>
          );
        })}
      </View>

      {/* 2. 몸무게 입력 섹션 (위치 상단 배치) */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>
          {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} 몸무게
        </Text>
        
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="00.0"
            keyboardType="decimal-pad"
            value={weight}
            onChangeText={setWeight}
            autoFocus
          />
          <Text style={styles.unitText}>kg</Text>
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={() => {
            console.log(`${selectedDate.toDateString()} 저장: ${weight}kg`);
            router.back();
          }}
        >
          <Text style={styles.saveButtonText}>기록 완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  dateItem: { 
    alignItems: 'center', 
    justifyContent: 'center',
    width: 45, 
    height: 60, 
    borderRadius: 15 
  },
  selectedItem: { backgroundColor: MAIN_COLOR },
  dayText: { fontSize: 12, color: '#999', marginBottom: 4 },
  dateText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  selectedText: { color: '#FFF' },
  todayDot: { 
    width: 4, 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: MAIN_COLOR, 
    marginTop: 4 
  },
  
  inputSection: {
    flex: 1,
    paddingTop: '15%', 
    alignItems: 'center',
  },
  label: { fontSize: 18, color: '#666', marginBottom: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 50 },
  input: {
    fontSize: 70,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: MAIN_COLOR,
    textAlign: 'center',
    minWidth: 160,
    color: '#333',
  },
  unitText: { fontSize: 28, color: MAIN_COLOR, marginLeft: 10, marginBottom: 15, fontWeight: '600' },
  
  saveButton: {
    backgroundColor: MAIN_COLOR,
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 35,
    shadowColor: MAIN_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});