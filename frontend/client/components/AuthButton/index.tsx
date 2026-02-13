import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

export default function AuthButton({ title, onPress, isLoading }: AuthButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress} 
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#85b52a" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}