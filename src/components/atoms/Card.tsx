import { ReactNode } from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
  onPress?: () => void;
}

const cardStyles = {
  none: { padding: 0 },
  small: { padding: 10 },
  medium: { padding: 14 },
  large: { padding: 20 },
};

const shadowStyle = {
  shadowColor: '#b6aeae',
  shadowOpacity: 0.03,
  shadowOffset: { width: 0, height: 0 },
  elevation: 5,
};

export function Card({ children, style, padding = 'medium', shadow = true, onPress }: CardProps) {
  const cardStyle = [
    {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      marginBottom: 20,
    },
    cardStyles[padding],
    shadow && shadowStyle,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}