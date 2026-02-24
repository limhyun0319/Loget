import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#EEEEEE', // 디자인의 연한 회색 배경
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  progressContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // 원형 테두리 (나중에 라이브러리를 쓰면 더 예쁘게 가능합니다)
  circleOutline: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 12,
    borderColor: '#85b52a', // 연두색 진행바
    borderTopColor: '#4f1616', // 일부는 갈색으로 포인트
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  timerText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
  },
  timerSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },
});