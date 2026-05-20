import { StyleSheet, View, Image, ScrollView, Keyboard, TextInputEndEditingEvent, BackHandler, ActivityIndicator } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, PromptModal, Typography } from '@/components';
import { staticStrings } from '@/constants/strings';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { isPasswordValid } from '@/utils/common';
import { TempUser, User } from '@/store/userSlice';
import { PrompModalActions } from '@/components/atoms/Modal';
import { loginUser, registerUser } from '@/utils/services';

const PROMPT_HEIGHT = 385;

type RequiredInputErrors = {
  password?: string;
  confirmPassword?: string;
};

export default function CreatePass() {
  const router = useRouter();
  const { tempUserDataEncoded } = useLocalSearchParams<{tempUserDataEncoded: string}>();
  const tempUserDataFromParams = tempUserDataEncoded ? (JSON.parse(tempUserDataEncoded) as TempUser) : null;
  const promptModal = useRef<PrompModalActions>(null);
  const loadingModal = useRef<PrompModalActions>(null);
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

  const getTempUserInfo = (): User => {
    const userInfo: User = {
      ...(tempUserDataFromParams as Omit<TempUser, 'confirmPassword'>),
      password: password
    }
    return userInfo;
  }

  const onSubmitPress = () => {
      Keyboard.dismiss();
      if (!validateRequiredInputs()) return;

      onPromptModalShow(getTempUserInfo());
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

  const onPromptModalShow = (userInfo: User) => {
      const banner = (
        <View style={styles.bannerMain}>
          <Typography variant='body'>{`${staticStrings.emailShort}: ${userInfo.email}`}</Typography>
          <Typography variant='body'>{`${staticStrings.fullName}: ${userInfo.fullName}`}</Typography>
          <Typography variant='body'>{`${staticStrings.gender}: ${userInfo.gender}`}</Typography>
          { userInfo.birthday && <Typography variant='body'>{`${staticStrings.dateOfBirth}: ${userInfo.birthday}`}</Typography>}
          <Typography variant='body'>{`${staticStrings.nationality}: ${userInfo.nationality}`}</Typography>
        </View>
      )
      promptModal.current?.show(banner);
  }

  const onPromptModalClose = () => {
      promptModal.current?.hide();
  }

  const onProceedRegistrationPress = () => {
    onPromptModalClose();
    handleUserRegistration();
  }

  const onLoadingModalShow = () => {
    loadingModal.current?.show();
  }

  const onLoadingModalHide = () => {
    loadingModal.current?.hide();
  }

  const handleUserRegistration = async () => {
    onLoadingModalShow();
    const userInfo = getTempUserInfo();
    const registrationResult = await registerUser(getTempUserInfo());
    if(registrationResult.data && registrationResult.data.email){
      const loginResult = await loginUser({
        email: registrationResult.data.email,
        password: userInfo.password
      });
      setTimeout(()=>{
        onLoadingModalHide();
        if(loginResult.user){
          router.push({
              pathname: '/welcome',
              params: {userDataEncoded: JSON.stringify(loginResult.user)}
          });
        }
      },1000);
    }else{
      setTimeout(()=>{
        onLoadingModalHide();
      },1000);
    }
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
          <PromptModal 
              ref={promptModal}
              title={staticStrings.userRegistration}
              height={PROMPT_HEIGHT}
          >
              <View>
                  <Typography variant='body'>{staticStrings.userRegistrationPrompt1}</Typography>
                  <View style={styles.promptButtonContainer}>
                      <AnimatedButton
                          title={staticStrings.cancel}
                          variant='text'
                          onPress={onPromptModalClose}
                          textStyle={styles.cancelButtonText}
                      />
                      <AnimatedButton
                          style={styles.proceedButton}
                          title={staticStrings.proceed}
                          onPress={onProceedRegistrationPress}
                      />
                  </View>
              </View>
          </PromptModal>
          <PromptModal ref={loadingModal} showHeader={false} enableBackButtonClose={false}>
            <View style={styles.loadingModal}>
              <ActivityIndicator size={'large'} color={Colors.primary}/>
              <Typography style={styles.loadingModalText} variant='buttonTitle'>{staticStrings.creatingUserAccount}</Typography>
            </View>
          </PromptModal>
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
  },
  promptButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    marginTop: 20
  },
  bannerMain: {
    padding: 10, 
    backgroundColor: Colors.bannerBg, 
    borderRadius: 7, 
    marginBottom: 15
  },
  cancelButtonText: {
    color: Colors.textTitleBlue
  },
  proceedButton: {
    marginLeft: 20
  },
  loadingModal: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 25, 
    marginLeft: 10
  },
  loadingModalText: {
    marginLeft: 20
  }
});