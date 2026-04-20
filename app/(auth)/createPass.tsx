import { StyleSheet, View, Image, ScrollView, Keyboard, TextInputEndEditingEvent, BackHandler } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Typography } from '@/components';
import { staticStrings } from '@/constants/strings';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { isPasswordValid } from '@/utils/common';
import { TempUser, User } from '@/store/userSlice';

type RequiredInputErrors = {
  password?: string;
  confirmPassword?: string;
};

export default function CreatePass() {
  const router = useRouter();
  const { tempUserDataEncoded } = useLocalSearchParams<{tempUserDataEncoded: string}>();
  const tempUserDataFromParams = tempUserDataEncoded ? (JSON.parse(tempUserDataEncoded) as TempUser) : null;
  const [password, setPassword] = useState(tempUserDataFromParams?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(tempUserDataFromParams?.confirmPassword || '');
  const [hidePassword, setHidePassword] = useState(false);
  const [errors, setErrors] = useState<RequiredInputErrors>({});

  useEffect(()=>{
    if(password || confirmPassword)
      validateRequiredInputs();
  },[])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.dismissTo({
            pathname: '/register',
            params: { tempUserDataEncoded: JSON.stringify({
                ...tempUserDataFromParams,
                password: password,
                confirmPassword: confirmPassword
            })}
        });
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [password, confirmPassword])
  );

  const onSubmitPress = () => {
      Keyboard.dismiss();
      if (!validateRequiredInputs()) return;

      const userInfo: User = {
        ...(tempUserDataFromParams as Omit<TempUser, 'confirmPassword'>),
        password: password
      }

      router.push({
          pathname: '/welcome',
          params: {userDataEncoded: JSON.stringify(userInfo)}
      });
  }

  const onShowPassword = () => {
      setHidePassword(!hidePassword);
  }

  const validateRequiredInputs = () => {
      const newErrors: RequiredInputErrors = {};

      if (!isPasswordValid(password)) newErrors.password = staticStrings.invalidPassword;
      if(confirmPassword === '')
        newErrors.confirmPassword = staticStrings.emptyConfirmPassword;
      else if (password !== confirmPassword)
        newErrors.confirmPassword = staticStrings.incorrectConfirmPassword;

      setErrors(newErrors);
      
      return Object.keys(newErrors).length === 0;
  };

  const onPasswordDoneEditing = (e: TextInputEndEditingEvent) => {
      const passwordText = e.nativeEvent.text;
      setErrors(prev => ({...prev, password: !isPasswordValid(passwordText) ? staticStrings.invalidPassword : undefined}));
  }

  const onConfirmPasswordDoneEditing = (e: TextInputEndEditingEvent) => {
      const confirmPasswordText = e.nativeEvent.text;
      setErrors(prev => ({...prev, 
        confirmPassword: confirmPasswordText === '' ? staticStrings.emptyConfirmPassword : 
        password !== confirmPasswordText ? staticStrings.incorrectConfirmPassword : undefined
      }));
  }

  return (
      <SafeAreaView style={styles.main} edges={['bottom']}>
          <ScrollView bounces={false}>
              <Image
                  source={require('../../src/assets/images/header-logo-landscape.png')}
                  style={styles.logo}
                  resizeMode='contain'
              />
              <View style={styles.spacing}>
                  <Typography color={Colors.primary} variant='heading3'>{staticStrings.createPassword}</Typography>
                  <Typography variant='normalTitle'>{staticStrings.createPasswordInfoText}</Typography>
              </View>
              <View style={styles.container}>
                  <Input
                      value={password}
                      label={staticStrings.password}
                      placeholder={staticStrings.password}
                      textContentType="password"
                      secureTextEntry={hidePassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={setPassword}
                      onEndEditing={onPasswordDoneEditing}
                      helperText={errors.password}
                      icon={hidePassword ? 'eye' : 'eye-off'}
                      iconOnPress={onShowPassword}
                      iconColor={Colors.dark}
                      isRequired
                  />
                  <Input
                      style={styles.spacing}
                      value={confirmPassword}
                      label={staticStrings.confirmPassword}
                      placeholder={staticStrings.confirmPassword}
                      textContentType="password"
                      secureTextEntry={hidePassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={setConfirmPassword}
                      onEndEditing={onConfirmPasswordDoneEditing}
                      helperText={errors.confirmPassword}
                      icon={hidePassword ? 'eye' : 'eye-off'}
                      iconOnPress={onShowPassword}
                      iconColor={Colors.dark}
                      isRequired
                  />
              </View>
          </ScrollView>
          <View style={styles.nextButtonContainer}>
              <AnimatedButton
                  style={styles.nextButton}
                  title={staticStrings.submit}
                  onPress={onSubmitPress}
              />
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20
  },
  spacing: {
    marginTop: 20
  },
  container: {
    flex: 1,
    marginTop: 20
  },
  logo: {
    width: 160, 
    height: 30, 
    marginTop: 50, 
    alignSelf: 'center'
  },
  nextButtonContainer: {
    paddingTop: 20
  },
  nextButton: {
    marginBottom: 15
  }
});