import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface TypographyProps extends TextProps {
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'label';
  color?: string;
  style?: TextStyle;
}

const typographyStyles = {
  heading1: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
    fontFamily: 'NunitoSans-Bold',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    fontFamily: 'NunitoSans-SemiBold',
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    fontFamily: 'NunitoSans-SemiBold',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
  },
  label: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    fontFamily: 'NunitoSans-Medium',
  },
};

export function Typography({
  variant = 'body',
  color = Colors.textPrimary,
  style,
  children,
  ...props
}: TypographyProps) {
  const textStyle = [
    typographyStyles[variant],
    { color },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
}