import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import MainHeader from '@/components/main/MainHeader';
import WeightStatusCard from '@/components/main/WeightStatusCard';
import FastingTimer from '@/components/main/FastingTimer';
import MealRecordGrid from '@/components/main/MealRecordGrid';
import ExerciseRecordBar from '@/components/main/ExerciseRecordBar';

export default function MainScreen(){
    const {user} = useAuth();


    return (
        <View style={styles.container}>
            <MainHeader />
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                <WeightStatusCard />
                <FastingTimer />
                {/* 섹션 타이틀을 하나 넣어주면 더 깔끔합니다 */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 25 }}>식단 기록</Text>
                <MealRecordGrid />
                <ExerciseRecordBar />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F9FBFA'},
    scrollContent: { 
        // 하단에 넉넉한 여백을 줘서 마지막 아이템이 잘 보이게 합니다.
        paddingBottom: 40, 
    },
    content: { padding: 20, paddingTop: 60, alignItems: 'center', justifyContent: 'center' },
    text: {fontSize: 20, fontWeight:'bold'}
});

