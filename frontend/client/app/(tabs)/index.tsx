import React, { useState, useEffect } from 'react';
import {ActivityIndicator, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { useDate } from '@/context/DateContext';
import MainHeader from '@/components/main/MainHeader';
import WeightStatusCard from '@/components/main/WeightStatusCard';
import FastingTimer from '@/components/main/FastingTimer';
import MealRecordGrid from '@/components/main/MealRecordGrid';
import ExerciseRecordBar from '@/components/main/ExerciseRecordBar';
import {getMainData} from '@/api/main';

export default function MainScreen(){
    const isFocused = useIsFocused();

    const {user} = useAuth();
    const router = useRouter();

    const {selectedDate, setSelectedDate} = useDate();
    const [mainData, setMainData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isFocused){
            loadMainData();
        }
    }, [isFocused, selectedDate]);

    const loadMainData = async () => {
        setLoading(true);
        try {
            const dateString = selectedDate.toISOString().split('T')[0];
            const result = await getMainData(user.userId, dateString);
            console.log("받은 main data: ", result);
            setMainData(result);
        } catch (error) {
            console.error('메인 데이터 로드 실패:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <MainHeader
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
            
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    {/* size는 'large' 또는 'small'을 쓸 수 있어요 */}
                    <ActivityIndicator size="large" color="#36bc9b" />
                </View>
            ) : (
                <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => router.push('../weightInput')}>
                    <WeightStatusCard weight={mainData?.currentWeight}/>
                </TouchableOpacity>
                <FastingTimer />
                {/* 섹션 타이틀을 하나 넣어주면 더 깔끔합니다 */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 25 }}>식단 기록</Text>
                <MealRecordGrid />
                <ExerciseRecordBar />
                </ScrollView>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#f5f5f5'},
    scrollContent: { 
        // 하단에 넉넉한 여백을 줘서 마지막 아이템이 잘 보이게 합니다.
        paddingBottom: 40, 
    },
    content: { padding: 20, paddingTop: 60, alignItems: 'center', justifyContent: 'center' },
    text: {fontSize: 20, fontWeight:'bold'}
});

