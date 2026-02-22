import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#85b52a', // 연두색 배경
    borderRadius: 25,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 25,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealCard: {
    width: '48%', // 2열 격자
    height: 140,
    backgroundColor: '#4f1616', // 갈색 카드
    borderRadius: 15,
    marginBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // 이미지가 튀어나가지 않게
  },
  mealLabel: {
    position: 'absolute',
    top: 10,
    left: 12,
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    zIndex: 1, // 텍스트가 이미지 위로 오게
  },
  mealImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', // 이미지가 있어도 글자가 잘 보이게 어둡게 처리
  }
});