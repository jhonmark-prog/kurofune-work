import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();

  const onNextPress = () => {
    router.push('/createPass');
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
                <Text style={{color: Colors.primary, fontSize: 18, fontWeight: '500'}}>Basic Information</Text>
                <Text style={{color: Colors.dark, fontSize: 14, fontWeight: '400'}}>To proceed, fill in the required information.</Text>
            </View>
            <View style={styles.container}>
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10}}>Email Address</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Email address"
                />
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10, marginTop: 20}}>Full Name</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Full Name"
                />
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10, marginTop: 20}}>Gender</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Gender"
                />
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10, marginTop: 20}}>Date of Birth</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Date of Birth"
                />
                <Text style={{color: Colors.black, fontSize: 14, fontWeight: '500', marginBottom: 10, marginTop: 20}}>Nationality</Text>
                <TextInput
                    style={{height: 50, borderWidth: 1.5, padding: 10, backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.gray, fontSize: 16, fontWeight: '400'}}
                    // onChangeText={onChangeText}
                    // value={'dawdawd'}
                    placeholder="Nationality"
                />
            </View>
            <Pressable
                style={{padding: 12, backgroundColor: Colors.primary, borderRadius: 5, marginBottom: 20}}
                onPress={onNextPress}
                >
                <Text style={{textAlign: 'center', color: Colors.white, fontSize: 14, fontWeight: '500'}}>Next</Text>
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