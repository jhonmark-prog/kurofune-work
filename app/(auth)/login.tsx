import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  
  const onSignupPress = () => {
    router.dismissAll(); 
    router.replace('/');
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
            style={{height: 50, width: 320, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
            // onChangeText={onChangeText}
            // value={'dawdawd'}
            placeholder="Email address"
          />
          <TextInput
            style={{height: 50, width: 320, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400', marginTop: 10}}
            // onChangeText={onChangeText}
            // value={'dawdawd'}
            placeholder="Password"
          />
          <Pressable
            style={{width: 120, padding: 12, backgroundColor: Colors.primary, borderRadius: 5, marginTop: 40}}
          >
            <Text style={{textAlign: 'center', color: Colors.white, fontSize: 14, fontWeight: '500'}}>Login</Text>
          </Pressable>
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>Not yet registered?</Text>
            <Pressable
              style={{marginLeft: 10}}
              onPress={onSignupPress}
            >
              <Text style={{textAlign: 'center', color: Colors.primary, fontSize: 14, fontWeight: '400'}}>Sign up here</Text>
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
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20}}>
        <Pressable
        >
          <Text style={{textAlign: 'center', color: Colors.primary, fontSize: 12, fontWeight: '500'}}>Terms of Use</Text>
        </Pressable>
        <Pressable
        >
          <Text style={{textAlign: 'center', color: Colors.primary, fontSize: 12, fontWeight: '500'}}>Privacy Policy</Text>
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