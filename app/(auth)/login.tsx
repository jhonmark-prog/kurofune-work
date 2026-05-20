import { StyleSheet, View, Image, ImageBackground, TextInputEndEditingEvent, Keyboard, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Input, PromptModal, Typography } from '@/components';
import { useRef, useState } from 'react';
import { staticStrings } from '@/constants/strings';
import { isEmailValid } from '@/utils/common';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { login } from '@/store/userSlice';
import { loginUser } from '@/utils/services';
import { PrompModalActions } from '@/components/atoms/Modal';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loadingModal = useRef<PrompModalActions>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputErr, setInputErr] = useState<string>();
  const [hidePassword, setHidePassword] = useState(true);

  const onSignupPress = () => {
    router.dismissAll(); 
    router.replace('/');
  }

  const onLoginPress = () => {
    Keyboard.dismiss();
    if(!isEmailValid(email) || !password){
      if(inputErr == undefined)
        setInputErr(staticStrings.invalidEmailOrPass);
      return;
    }
    handleLogin();
  }

  const handleLogin = async () => {
    onLoadingModalShow();
    const loginResult = await loginUser({
      email: email,
      password: password
    });
    setTimeout(()=>{
      onLoadingModalHide();
      if(loginResult.user && loginResult.user.active){
        dispatch(login({data: loginResult.user}));
      }else{
        if(inputErr == undefined)
          setInputErr(staticStrings.invalidEmailOrPass);
      }
    },1000);
  }

  const onShowPassword = () => {
    setHidePassword(!hidePassword);
  }

  const onEmailTextChange = (emailText: string) => {
    setEmail(emailText.trim());
  }

  const onEmailDoneEditing = (e: TextInputEndEditingEvent) => {
    const emailText = e.nativeEvent.text.trim();
    if(emailText != '' && !isEmailValid(emailText)){
      setInputErr(staticStrings.invalidEmailOrPass);
    }else{
      setInputErr(undefined);
    }
  }

  const onPasswordDoneEditing = (e: TextInputEndEditingEvent) => {
    const passwordText = e.nativeEvent.text;
    if(passwordText == ''){
      setInputErr(undefined);
    }
  }

  const onLoadingModalShow = () => {
    loadingModal.current?.show();
  }

  const onLoadingModalHide = () => {
    loadingModal.current?.hide();
  }

  return (
    <SafeAreaView style={styles.main} edges={['bottom']}>
      <ImageBackground
          source={require('../../src/assets/images/blured-bg.png')}
          style={styles.imageBackground}
          resizeMode='cover'
      >
          <Image 
              source={require('../../src/assets/images/header-logo.png')}
              style={styles.imageLogo}
              resizeMode='contain'
          />
      </ImageBackground>
      <View style={styles.container}>
          <Input
            value={email}
            placeholder={staticStrings.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            onChangeText={onEmailTextChange}
            onEndEditing={onEmailDoneEditing}
            helperText={inputErr ? ' ' : undefined}
          />
          <Input
            style={styles.spacing}
            value={password}
            placeholder={'Password'}
            secureTextEntry={hidePassword}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setPassword}
            icon={hidePassword ? 'eye' : 'eye-off'}
            iconOnPress={onShowPassword}
            iconColor={Colors.dark}
            helperText={inputErr}
            onEndEditing={onPasswordDoneEditing}
          />
          <View style={styles.buttonContainers}>
            <AnimatedButton
              style={styles.loginButton}
              title={staticStrings.login}
              onPress={onLoginPress}
            />
            <View style={styles.signupHereButtonContainer}>
              <Typography variant='normalTitle'>{staticStrings.notYetRegistered}</Typography>
              <AnimatedButton
                style={styles.singupHereButton}
                variant={'text'}
                title={staticStrings.signUpHere}
                onPress={onSignupPress}
              />
            </View>
            <AnimatedButton
              style={styles.languageButton}
              variant={'text'}
              icon={'globe'}
              title={'EN'}
            />
          </View>
      </View>
      <View style={styles.bottomButtonsContainer}>
        <AnimatedButton
          variant={'text'}
          title={staticStrings.termsOfUse}
        />
        <AnimatedButton
          variant={'text'}
          title={staticStrings.privacyPolicy}
        />
      </View>
      <PromptModal ref={loadingModal} showHeader={false} enableBackButtonClose={false}>
        <View style={styles.loadingModal}>
          <ActivityIndicator size={'large'} color={Colors.primary}/>
          <Typography style={styles.loadingModalText} variant='buttonTitle'>{staticStrings.signingIn}</Typography>
        </View>
      </PromptModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -20
  },
  imageBackground: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    overflow: 'hidden'
  },
  imageLogo: {
    width: 120, 
    height: 120
  },
  buttonContainers: {
    alignItems: 'center'
  },
  loginButton: {
    marginTop: 25
  },
  signupHereButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 25
  },
  singupHereButton: {
    marginLeft: 4
  },
  languageButton: {
    marginTop: 10
  },
  bottomButtonsContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    marginBottom: 10
  },
  spacing: {
    marginTop: 10
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