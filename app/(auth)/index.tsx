import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Landing() {
  const router = useRouter();

  const onLoginPress = () => {
    router.push('/login');
  }

  const onGetStartedPress = () => {
    router.push('/register');
  }

  return (
    <View style={styles.main}>
      <ImageBackground
          source={require('../../src/assets/images/blured-bg.png')}
          style={styles.image_bg}
          resizeMode='cover'
      >
          <Image 
              source={require('../../src/assets/images/header-logo.png')}
              style={styles.image_logo}
              resizeMode='contain'
          />
      </ImageBackground>
      <View style={styles.container}>
          <TextInput
            style={{height: 50, width: '85%', borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
            // onChangeText={onChangeText}
            // value={'dawdawd'}
            placeholder="Email address"
          />
          <Pressable
            style={{width: 120, padding: 12, backgroundColor: Colors.primary, borderRadius: 5, marginTop: 40}}
            onPress={onGetStartedPress}
          >
            <Text style={{textAlign: 'center', color: Colors.white, fontSize: 14, fontWeight: '500'}}>Get Started</Text>
          </Pressable>
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>Already registered?</Text>
            <Pressable
              style={{marginLeft: 10}}
              onPress={onLoginPress}
            >
              <Text style={{textAlign: 'center', color: Colors.primary, fontSize: 14, fontWeight: '400'}}>Login here</Text>
            </Pressable>
          </View>
          <Pressable
              style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center', marginTop: 20}}
            >
              <Ionicons
                name={'globe'}
                size={24}
                color={Colors.primary}
              />
              <Text style={{textAlign: 'center', color: Colors.primary, fontSize: 14, fontWeight: '400', marginLeft: 10}}>EN</Text>
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: -20
  },
  image_bg: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    overflow: 'hidden'
  },
  image_logo: {
    width: 120, 
    height: 120
  }
});