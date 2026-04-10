import React from 'react';
import { TextInput, View, Text, TextInputProps, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface InputProps extends Omit<TextInputProps, 'style'> {
  style?: TextStyle;
  error?: string;
}

const styles = {
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundPrimary,
    fontFamily: 'NunitoSans-Regular',
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    marginTop: 4,
    fontFamily: 'NunitoSans-Regular',
  },
};

export function Input({ style, error, ...props }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const inputStyle: TextStyle = {
    ...styles.input,
    ...(isFocused && styles.inputFocused),
    ...(error && styles.inputError),
    ...style,
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyle}
        placeholderTextColor={Colors.textTertiary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}