
import { useSignup } from '@/hooks/useSignup';
import AuthButton from '@/components/AuthButton';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    KeyboardTypeOptions,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Text,
    TextInput,
    View,
    Alert
} from 'react-native';
import axios from 'axios';



export default function SignupScreen(){
    const router = useRouter();
    const [form, setForm] = useState({
        id: '',
        password: '',
        name: '',
        height: '',
        startWeight: '',
        targetWeight: '',
    });

    const API_URL = 'https://lubricatory-les-unsoftly.ngrok-free.dev';

    const handleSignup= async () => {
        const { id, password, name, height, startWeight, targetWeight } = form;

        if (!id.trim() || !password.trim() || !name.trim() || !height.trim() || !startWeight.trim()){
            Alert.alert("빈칸을 채워주세요", "모든 정보를 입력해주세욤.");
            return;
        }

        const signupData = {
            ...form,
            targetWeight: targetWeight.trim() === "" ? null : targetWeight
        };

        console.log('회원가입 정보:',signupData);

        try {
            // 1. 서버에 post 요청
            const response = await axios.post(`${API_URL}/auth/signup`, signupData);

            // 2. 결과 처리
            if (response.status === 200 || response.status === 201){
                const userData = response.data;

                console.log('서버가 준 회원 정보:', userData);

                Alert.alert(
                    "가입 성공!",
                    `${userData.name}님, 환영합니다 *^^*`,
                    [{text: "확인", onPress: ()=>router.replace('/')}]
                );
            }
        } catch (error:any) {
            if (error.response) {
        // 서버가 응답은 준 경우 (400, 500 등)
                console.log('서버 에러 데이터:', error.response.data);
            } else if (error.request) {
        // 서버에 요청은 보냈으나 대답을 못 받은 경우 (네트워크 문제)
                console.log('요청 전송 실패 (서버가 응답하지 않음)');
            } else {
        // 아예 요청 설정부터 잘못된 경우
                console.log('에러 메시지:', error.message);
            }
            Alert.alert("가입 실패", "터미널의 로그를 확인해주세요!");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollInner}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={28} color="#4f1616" />
                    </TouchableOpacity>

                    <Text style={styles.title}>회원가입</Text>
                    <Text style={styles.subtitle}>정보를 입력해주세요</Text>

                    <View style={styles.inputContainer}>
                        <InputField label="아이디" value={form.id} onChange={(text)=>setForm({...form,id: text})} />
                        <InputField label="비밀번호" secure value={form.password} onChange={(text) => setForm({...form,password: text})} />
                        <InputField label="이름" value={form.name} onChange={(text) => setForm({...form,name: text})} />

                        <View style={styles.row}>
                            <InputField
                                label="키 (cm)"
                                half
                                keyboardType='numeric'
                                value={form.height}
                                onChange={(text) => setForm({...form,height: text})}
                            />
                            <InputField
                                label="시작 몸무게 (kg)"
                                half
                                keyboardType='numeric'
                                value={form.startWeight}
                                onChange={(text) => setForm({...form, startWeight: text})}
                            />
                        </View>
                        <InputField
                            label="목표 몸무게 (kg) - 선택"
                            keyboardType='numeric'
                            value={form.targetWeight}
                            onChange={(text) => setForm({...form, targetWeight: text})}
                        />
                    </View>

                    <AuthButton 
                        title="가입 완료" 
                        onPress={handleSignup} 
                        isLoading={isLoading} 
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    secure?: boolean;
    half?: boolean;
    keyboardType?: KeyboardTypeOptions;
}

function InputField(
    {label, value, onChange, secure=false, half=false, keyboardType='default'}
    : InputFieldProps){
    return (
        <View style={[styles.fieldContainer, half && {width:'48%'}]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                secureTextEntry={secure}
                keyboardType={keyboardType}
                placeholderTextColor="#CCC"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFF'},
    scrollInner:{padding: 30, paddingTop: 60},
    backButton: {marginBottom: 20},
    title: {fontSize:28, fontWeight:'bold', color:'#333'},
    subtitle:{fontSize: 15, color:'#888', marginBottom: 30},
    inputContainer: {marginBottom:30},
    fieldContainer: {marginBottom: 18},
    label: {fontSize:14, fontWeight:'600', color: '#555', marginBottom: 8},
    input: {
        backgroundColor: '#F5F7F6',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        borderWidth:1,
        borderColor: '#E8E8E8'
    },
    row: {flexDirection: 'row', justifyContent:'space-between'},
    /*signupButton: {
        backgroundColor: '#4f1616',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center'
    },
    signupButtonText:{color:'#85b52a', fontSize: 18, fontWeight:'bold'}*/
});