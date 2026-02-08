import { useSignup } from '@/hooks/useSignup';
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

    const {signup, isLoading} = useSignup();

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

        // 2. 훅의 함수 사용 (await로 기다림)
        const result = await signup(signupData);

        if (result.success) {
            Alert.alert("가입 성공!", `${result.data.name}님 환영합니다!`, [
                { text: "확인", onPress: () => router.replace('/') }
            ]);
        } else {
            Alert.alert("가입 실패", "서버 에러가 발생했습니다.");
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

                    <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
                        <Text style={styles.signupButtonText}>가입 완료</Text>
                    </TouchableOpacity>
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
    signupButton: {
        backgroundColor: '#4f1616',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center'
    },
    signupButtonText:{color:'#85b52a', fontSize: 18, fontWeight:'bold'}
});