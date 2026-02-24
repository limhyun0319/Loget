export interface MealItemProps {
  type: '아침' | '점심' | '저녁' | '간식';
  imageUri?: string; // 이미지가 있으면 표시
  onPress: () => void;
}