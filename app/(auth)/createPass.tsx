import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function CreatePass() {
  const router = useRouter();

  const onSubmitPress = () => {
    //TODO: convert to useNavigation commonactions reset
    router.dismissAll();
    router.replace('/');
    router.push('/welcome'); 
  }

  return (
    <View style={styles.main}>
        <View style={{marginHorizontal: 25, flex: 1}}>
            <Image
                source={require('../../src/assets/images/header-logo-landscape.png')}
                style={{width: 160, height: 30, marginTop: 50, alignSelf: 'center'}}
                resizeMode='contain'
            />
            <View style={{marginTop: 20}}>
                <Text style={{color: Colors.primary, fontSize: 18, fontWeight: '500'}}>Create Password</Text>
                <Text style={{color: Colors.dark, fontSize: 14, fontWeight: '400'}}>Let’s finish setting you up. Please create a strong password.</Text>
            </View>
            <View style={styles.container}>
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10}}>Password</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Password"
                />
                <Text style={{color: Colors.dark, fontSize: 14, fontWeight: '400', marginTop: 5}}>Password must be at least 8 characters, alphanumeric, has uppercase and lowercase.</Text>
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10, marginTop: 20}}>Confirm Password</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Confirm Password"
                />
            </View>
            <Pressable
                style={{padding: 12, backgroundColor: Colors.primary, borderRadius: 5, marginBottom: 20}}
                onPress={onSubmitPress}
                >
                <Text style={{textAlign: 'center', color: Colors.white, fontSize: 14, fontWeight: '500'}}>Submit</Text>
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
    marginTop: 20
  }
});