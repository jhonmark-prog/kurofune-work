import { ComponentProps, useState } from 'react';
import { TextInput, View, Text, TextInputProps, TextStyle, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '@/constants/colors';
import { typographyStyles } from '@/constants/textTypes';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedButton } from './AnimatedButton';

interface InputProps extends Omit<TextInputProps, 'style'> {
  style?: ViewStyle;
  textStyle?: TextStyle;
  helperText?: string;
  label?: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
  iconOnPress?: () => void;
  iconColor?: string;
  isRequired?: boolean;
}

export function Input({ 
  style, 
  textStyle, 
  label, 
  icon, 
  iconOnPress, 
  iconColor = Colors.black,
  isRequired,
  helperText,
  ...props 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showHelperText = !!helperText?.trim() && !isFocused;

  const inputContainerStyle: StyleProp<ViewStyle> = [
      styles.container,
      helperText && styles.inputError,
      isFocused && styles.inputFocused,
  ];
  const inputStyle: StyleProp<TextStyle> = [
      styles.input,
      textStyle
  ];

  const getLabel = () => {
    if(isRequired){
      return (
        <View style={styles.requiredlabelContainer}>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={[styles.labelText, {color: Colors.red}]}>{' *'}</Text>
        </View>
      );
    }else{
      return <Text style={styles.labelText}>{label}</Text>;
    }
  }

  return (
    <View style={[styles.base, style]}>
      {label && getLabel()}
      <View style={inputContainerStyle}>
        <TextInput
          style={inputStyle}
          placeholderTextColor={Colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {icon && <AnimatedButton style={styles.icon} variant={'text'} icon={icon} iconColor={iconColor} iconSize={20} onPress={iconOnPress} />}
      </View>
      {showHelperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

const styles = {
  base: {
    backgroundColor: Colors.white,
  },
  container: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  } as const,
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.textPrimary,
    ...typographyStyles.body
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  helperText: {
    marginLeft: 4,
    marginTop: 4,
    color: Colors.danger,
    ...typographyStyles.inputHelperText
  },
  labelText: {
    marginLeft: 4,
    marginBottom: 8,
    color: Colors.black,
    ...typographyStyles.inputLabel 
  },
  requiredlabelContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  } as const,
  icon: {
    paddingRight: 10
  }
};