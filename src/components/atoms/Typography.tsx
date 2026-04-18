import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface TypographyProps extends TextProps {
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'normalTitle' | 'label';
  color?: string;
  style?: TextStyle;
}

const typographyStyles = {
  heading1: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    fontFamily: 'NunitoSans-Bold',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600' as const,
    fontFamily: 'NunitoSans-SemiBold',
  },
  heading3: {
    fontSize: 18,
    fontWeight: '700' as const,
    fontFamily: 'NunitoSans-SemiBold',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    fontFamily: 'NunitoSans-Regular',
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    fontFamily: 'NunitoSans-Regular',
  },
  normalTitle: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    fontFamily: 'NunitoSans-Regular',
  },
  label: {
    fontSize: 12,
    fontWeight: '500' as const,
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