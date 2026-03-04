import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', 
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    // 🔥 헤더와 살짝 겹치게 위로 올림
    marginTop: 10, 
    // 그림자 효과 (iOS/Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
    marginBottom: 8,
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  weightText: {
    color: '#000',
    fontSize: 36,
    fontWeight: '900',
  },
  unitText: {
    color: '#000',
    fontSize: 18,
    marginLeft: 4,
    fontWeight: '600',
  },
  diffText: {
    color: '#000',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },
});