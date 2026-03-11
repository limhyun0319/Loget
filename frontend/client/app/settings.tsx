import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const MAIN_COLOR = '#36bc9b';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth(); // AuthContext에 logout 함수가 있다고 가정

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => logout() },
    ]);
  };

  interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap; // Ionicons에 있는 아이콘 이름만 쓰도록 제한
    title: string;
    value?: string; // 있을 수도 있고 없을 수도 있음
    onPress: () => void;
    color?: string;  // 기본값이 있으므로 선택사항
  }

  const SettingItem = ({ icon, title, value, onPress, color = '#333' }: SettingItemProps) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.itemTitle, { color }]}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={18} color="#CCC" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 정보</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
          </View>
          <Text style={styles.profileName}>{user?.name}님</Text>
          <Text style={styles.profileEmail}>{user?.id || '아이디 정보 없음'}</Text>
        </View>

        {/* 신체 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>나의 신체 정보</Text>
          <View style={styles.card}>
            <SettingItem icon="resize" title="키" value={`${user?.height || '-'} cm`} onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem icon="flag" title="목표 몸무게" value={`${user?.targetWeight || '-'} kg`} onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem icon="trending-up" title="시작 몸무게" value={`${user?.startWeight || '-'} kg`} onPress={() => {}} />
          </View>
        </View>

        {/* 앱 설정 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>앱 설정</Text>
          <View style={styles.card}>
            <SettingItem icon="notifications-outline" title="알림 설정" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem icon="lock-closed-outline" title="비밀번호 변경" onPress={() => {}} />
          </View>
        </View>

        {/* 기타 섹션 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  profileSection: { alignItems: 'center', paddingVertical: 30 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  profileEmail: { fontSize: 14, color: '#999' },
  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionLabel: { fontSize: 14, color: '#999', marginBottom: 10, marginLeft: 5 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: '500' },
  itemValue: { fontSize: 16, color: MAIN_COLOR, fontWeight: '600', marginRight: 5 },
  divider: { height: 1, backgroundColor: '#F1F1F1', marginHorizontal: 15 },
  logoutButton: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'center',
  },
  logoutText: { color: '#FF5A5F', fontSize: 16, fontWeight: '600' },
  backButton: {
    padding: 5,
    marginLeft: -5, // 터치 영역 확보를 위한 마진 조정
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});