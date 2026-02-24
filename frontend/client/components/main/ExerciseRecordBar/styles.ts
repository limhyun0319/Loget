import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40, // 최하단 여백
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  bar: {
    backgroundColor: '#85b52a', // 연두색 배경
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // 플러스 아이콘을 오른쪽으로
    paddingHorizontal: 20,
    // 그림자
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});