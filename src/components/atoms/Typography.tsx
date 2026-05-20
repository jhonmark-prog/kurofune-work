import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { typographyStyles } from '@/constants/textTypes';

interface TypographyProps extends TextProps {
  variant?: keyof typeof typographyStyles;
  color?: string;
  style?: StyleProp<TextStyle>;
}

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