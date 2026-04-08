import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const buttonStyles = {
  primary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

const buttonSizes = {
  small: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  medium: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  large: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
};

const textStyles = {
  primary: { color: Colors.textInverse },
  secondary: { color: Colors.primary },
  ghost: { color: Colors.primary },
};

const textSizes = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    buttonStyles[variant],
    buttonSizes[size],
    disabled && { opacity: 0.5 },
    style,
  ];

  const titleStyle = [
    textStyles[variant],
    textSizes[size],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && iconPosition === 'left' && (
        <Ionicons
          name={icon}
          size={textSizes[size].fontSize}
          color={textStyles[variant].color}
          style={{ marginRight: title ? 8 : 0 }}
        />
      )}
      {title && <Text style={titleStyle}>{title}</Text>}
      {icon && iconPosition === 'right' && (
        <Ionicons
          name={icon}
          size={textSizes[size].fontSize}
          color={textStyles[variant].color}
          style={{ marginLeft: title ? 8 : 0 }}
        />
      )}
    </TouchableOpacity>
  );
}