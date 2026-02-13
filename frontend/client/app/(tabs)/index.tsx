import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import MainHeader from '@/components/main/MainHeader';

export default function MainScreen(){
    const {user} = useAuth();


    return (
        <ScrollView style={styles.container}>
            <MainHeader />
            <View style={styles.content}>
                <Text>{user?.name}님, 살빼세요!🐷</Text>
                <Text style={styles.text}>메인화면</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F9FBFA'},
    content: { padding: 20, paddingTop: 60, alignItems: 'center', justifyContent: 'center' },
    text: {fontSize: 20, fontWeight:'bold'}
});

