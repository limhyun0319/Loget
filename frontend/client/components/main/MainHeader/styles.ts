import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#4f1616'
  },
  titleContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF' //Colors.light.primary, // #4f1616
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
});