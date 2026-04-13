import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Welcome() {
  const router = useRouter();

  const onProceedPress = () => {
    router.dismissAll();
    router.replace('/browse');
  }

  return (
    <View style={styles.main}>
        <View style={{marginHorizontal: 25, flex: 1}}>
            <Image
                source={require('../../src/assets/images/header-logo-landscape.png')}
                style={{width: 160, height: 30, marginTop: 50, alignSelf: 'center'}}
                resizeMode='contain'
            />
            <View style={styles.container}>
                <Image
                    source={require('../../src/assets/images/success-signup.png')}
                    style={{width: 260, height: 200, alignSelf: 'center'}}
                    resizeMode='contain'
                />
                <Text style={{textAlign: 'center', fontWeight: '700', marginTop: 5, fontSize: 18, color: Colors.black}}>Thank you!</Text>
                <Text style={{textAlign: 'center', fontWeight: '400', marginTop: 5, fontSize: 14, color: Colors.darkGray}}>You have successfully signed up! Now enjoy, and make the most out of this app!</Text>
            </View>
            <Pressable
                style={{padding: 12, backgroundColor: Colors.primary, borderRadius: 5, marginBottom: 20}}
                onPress={onProceedPress}
                >
                <Text style={{textAlign: 'center', color: Colors.white, fontSize: 14, fontWeight: '500'}}>Let's go!</Text>
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
    justifyContent: 'center',
    marginTop: -40
  }
});