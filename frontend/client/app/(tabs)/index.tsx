import {View, Text, StyleSheet} from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function MainScreen(){
    const {user} = useAuth();

    return (
        <View style={styles.container}>
            <Text>{user?.name}님, 살빼세요!🐷</Text>
            <Text style={styles.text}>메인화면</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text: {fontSize: 20, fontWeight:'bold'}
});

