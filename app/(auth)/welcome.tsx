import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable, ScrollView, BackHandler } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { useDispatch } from 'react-redux';
import { login, User } from '../../src/store/userSlice';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { staticStrings } from '@/constants/strings';
import { Typography } from '@/components';

export default function Welcome() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userDataEncoded } = useLocalSearchParams<{userDataEncoded: string}>();
  const userDataFromParams = userDataEncoded ? (JSON.parse(userDataEncoded) as User) : null;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.dismissTo('/');
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const onProceedPress = () => {
    if(userDataFromParams){
      dispatch(login({data: userDataFromParams}));
    }
  }

  return (
    <SafeAreaView style={styles.main} edges={['bottom']}>
      <Image
          source={require('../../src/assets/images/header-logo-landscape.png')}
          style={styles.logo}
          resizeMode='contain'
      />
      <View style={styles.container}>
          <Image
              source={require('../../src/assets/images/success-signup.png')}
              style={styles.graphic}
              resizeMode='contain'
          />
          <View style={styles.textContainer}>
            <Typography variant='heading3'>{staticStrings.thankYou}</Typography>
            <Typography style={styles.text} color={Colors.dark} variant='normalTitle'>{staticStrings.successCreateInfoText}</Typography>
          </View>
      </View>
      <AnimatedButton
          style={styles.letsgoButton}
          title={staticStrings.letsGo}
          onPress={onProceedPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40
  },
  logo: {
    width: 160, 
    height: 30, 
    marginTop: 50, 
    alignSelf: 'center'
  },
  graphic: {
    width: 260, 
    height: 200, 
    alignSelf: 'center'
  },
  letsgoButton: {
    marginBottom: 15
  },
  textContainer: {
    marginTop: 30, 
    alignItems: 'center'
  },
  text: {
    textAlign: 'center', 
    marginTop: 5
  }
});