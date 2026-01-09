import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';



export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin=()=>{

    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>

          <View style={styles.logoContainer}>
            <Entypo name="new-message" size={70} color="#4f1616" />
            <Text style={styles.title}>Loget</Text>
            <Text style={styles.subtitle}>Team NH 넘예쁘네</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#4f1616" style={styles.icon} />
              <TextInput
                style={styles.input} 
                placeholder="아이디" 
                value={userId}
                onChangeText={setUserId}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#4f1616" style={styles.icon} />
              <TextInput 
                style={styles.input} 
                placeholder="비밀번호" 
                secureTextEntry 
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>계정이 없으신가요? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signupText}>회원가입</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBFA' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 36, fontWeight: '900', color: '#85b52a', marginTop: 10, letterSpacing: 2 },
  subtitle: { fontSize: 14, color: '#777', marginTop: 5 },
  inputContainer: { marginBottom: 20 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#EEE', borderRadius: 12,
    paddingHorizontal: 15, marginBottom: 15, height: 55,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  loginButton: {
    backgroundColor: '#4f1616', height: 55, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  loginButtonText: { color: '#85b52a', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#888', fontSize: 14 },
  signupText: { color: '#4f1616', fontSize: 14, fontWeight: 'bold' },
});
