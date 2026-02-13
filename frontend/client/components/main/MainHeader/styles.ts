import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 110,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#85b52a'
  },
  titleContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.primary, // #4f1616
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.primary,
    opacity: 0.8,
    marginTop: 2,
  },
  dateText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
});