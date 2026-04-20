import { StyleSheet, View, Image, ImageBackground, NativeSyntheticEvent, TextInputEndEditingEvent, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Input, Typography } from '@/components';
import { staticStrings } from '@/constants/strings';
import { useState } from 'react';
import { isEmailValid } from '@/utils/common';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Landing() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailInputErr, setEmailInputErr] = useState<string>();

  const onLoginPress = () => {
    router.push('/login');
  }

  const onGetStartedPress = () => {
    Keyboard.dismiss();
    if(!isEmailValid(email)){
      if(emailInputErr == undefined)
        setEmailInputErr(staticStrings.emailInvalid);
      return;
    }

    router.push({
      pathname: '/register',
      params: { tempUserDataEncoded: JSON.stringify({email: email}) }
    });
  }

  const onEmailTextChange = (emailText: string) => {
    setEmail(emailText.trim());
  }

  const onEmailDoneEditing = (e: TextInputEndEditingEvent) => {
    const emailText = e.nativeEvent.text.trim();
    if(emailText != '' && !isEmailValid(emailText)){
      setEmailInputErr(staticStrings.emailInvalid);
    }else{
      setEmailInputErr(undefined);
    }
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
            helperText={emailInputErr}
            onEndEditing={onEmailDoneEditing}
          />
          <View style={styles.buttonContainers}>
            <AnimatedButton
              style={styles.getStartedButton}
              title={staticStrings.getStarted}
              onPress={onGetStartedPress}
            />
            <View style={styles.loginHereButtonContainer}>
              <Typography variant='normalTitle'>{staticStrings.alreadyRegistered}</Typography>
              <AnimatedButton
                style={styles.loginHereButton}
                variant={'text'}
                title={staticStrings.loginHere}
                onPress={onLoginPress}
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
  getStartedButton: {
    marginTop: 25
  },
  loginHereButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 25
  },
  loginHereButton: {
    marginLeft: 4
  },
  languageButton: {
    marginTop: 10
  }
});