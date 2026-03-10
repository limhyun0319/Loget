import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Pressable, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { getWeightRecord, postWeightRecord } from '@/api/main';

const MAIN_COLOR = '#36bc9b'; // 로겟의 새로운 시그니처 컬러!

export default function WeightInputScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [weight, setWeight] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 관리
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  
  useEffect(() => {
    loadWeightData();
  }, [selectedDate]);

  const loadWeightData = async () => {
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const result = await getWeightRecord(user.userId, dateString);
      
      if (result && result.currentWeight) {
        setWeight(result.currentWeight.toString());
        setIsExistingRecord(true);
      } else {
        setWeight('');
        setIsExistingRecord(false);
      }
    } catch (error) {
      console.log('기록 없음 또는 에러:', error);
      setWeight('');
      setIsExistingRecord(false);
    }
  };

  const handleSave = async () => {
    if (!weight || parseFloat(weight) <= 0) {
      Alert.alert('알림', '올바른 몸무게를 입력해주세요.');
      return;
    }

    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      await postWeightRecord({
        userId: user.userId,
        date: dateString,
        currentWeight: parseFloat(weight)
      });
      
      Alert.alert(
        '완료', 
        isExistingRecord ? '몸무게가 수정되었습니다.' : '몸무게가 기록되었습니다.',
        [{ text: '확인', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('몸무게 저장 실패:', error);
      Alert.alert('오류', '저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>몸무게 기록</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 주간 달력 */}
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

        {/* 몸무게 입력 */}
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
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {isExistingRecord ? '수정 완료' : '기록 완료'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
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