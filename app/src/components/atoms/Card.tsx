import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
}

const cardStyles = {
  none: { padding: 0 },
  small: { padding: 8 },
  medium: { padding: 16 },
  large: { padding: 24 },
};

const shadowStyle = {
  shadowColor: Colors.textPrimary,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

export function Card({ children, style, padding = 'medium', shadow = false }: CardProps) {
  const cardStyle = [
    {
      backgroundColor: Colors.backgroundPrimary,
      borderRadius: 8,
    },
    cardStyles[padding],
    shadow && shadowStyle,
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
}