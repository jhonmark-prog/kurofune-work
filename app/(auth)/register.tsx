import { StyleSheet, View, Image, Pressable, ScrollView, TextInputEndEditingEvent, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Input, Typography } from '@/components';
import { useState } from 'react';
import { staticStrings } from '@/constants/strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { isEmailValid } from '@/utils/common';
import { TempUser } from '@/store/userSlice';

type RequiredInputErrors = {
    email?: string;
    fullName?: string;
    gender?: string;
    nationality?: string;
};

export default function Register() {
    const router = useRouter();
    const { tempUserDataEncoded } = useLocalSearchParams<{tempUserDataEncoded: string}>();
    const tempUserDataFromParams = tempUserDataEncoded ? (JSON.parse(tempUserDataEncoded) as TempUser) : null;
    const [email, setEmail] = useState(tempUserDataFromParams?.email || '');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [nationality, setNationality] = useState('');
    const [errors, setErrors] = useState<RequiredInputErrors>({});

    const onNextPress = () => {
        Keyboard.dismiss();
        if (!validateRequiredInputs()) return;

        router.push({
            pathname: '/createPass',
            params: { tempUserDataEncoded: JSON.stringify({
                email: email,
                fullName: fullName,
                gender: gender,
                birthday: birthday,
                nationality: nationality,
                password: tempUserDataFromParams?.password,
                confirmPassword: tempUserDataFromParams?.confirmPassword
            })}
        });
    }

    const validateRequiredInputs = () => {
        const newErrors: RequiredInputErrors = {};

        if (!isEmailValid(email)) newErrors.email = staticStrings.emailInvalid;
        if (!fullName) newErrors.fullName = staticStrings.emptyFullName;
        if (!gender) newErrors.gender = staticStrings.emptyGender;
        if (!nationality) newErrors.nationality = staticStrings.emptyNationality;

        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const onEmailTextChange = (emailText: string) => {
        setEmail(emailText.trim());
    }

    const onEmailDoneEditing = (e: TextInputEndEditingEvent) => {
        const emailText = e.nativeEvent.text.trim();
        setErrors(prev => ({...prev, email: !isEmailValid(email) ? staticStrings.emailInvalid : undefined}));
    }

    const onFullNameDoneEditing = (e: TextInputEndEditingEvent) => {
        const fullNameText = e.nativeEvent.text;
        setErrors(prev => ({...prev, fullName: fullNameText === '' ? staticStrings.emptyFullName : undefined}));
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
                    <Typography color={Colors.primary} variant='heading3'>{staticStrings.basicInformation}</Typography>
                    <Typography variant='normalTitle'>{staticStrings.basicInfoText}</Typography>
                </View>
                <View style={styles.container}>
                    <Input
                        value={email}
                        label={staticStrings.email}
                        placeholder={staticStrings.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                        textContentType="emailAddress"
                        onChangeText={onEmailTextChange}
                        onEndEditing={onEmailDoneEditing}
                        helperText={errors.email}
                        isRequired
                    />
                    <Input
                        style={styles.spacing}
                        value={fullName}
                        label={staticStrings.fullName}
                        placeholder={staticStrings.fullName}
                        autoCapitalize="words"
                        textContentType="name"
                        onChangeText={setFullName}
                        onEndEditing={onFullNameDoneEditing}
                        helperText={errors.fullName}
                        isRequired
                    />
                    <Pressable onPress={()=>console.log('test')}>
                        <View pointerEvents="none"> 
                            <Input
                                style={styles.spacing}
                                value={gender}
                                placeholder={`- ${staticStrings.selectOption} -`}
                                label={staticStrings.gender}
                                editable={false}
                                icon={'chevron-down-sharp'}
                                helperText={errors.gender}
                                isRequired
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>console.log('testt')}>
                        <View pointerEvents="none"> 
                            <Input
                                style={styles.spacing}
                                value={birthday}
                                placeholder={'DD/MM/YYYY'}
                                label={staticStrings.dateOfBirth}
                                editable={false}
                                icon={'calendar-outline'}
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>console.log('test')}>
                        <View pointerEvents="none"> 
                            <Input
                                style={styles.spacing}
                                value={nationality}
                                placeholder={`- ${staticStrings.selectOption} -`}
                                label={staticStrings.nationality}
                                editable={false}
                                icon={'chevron-down-sharp'}
                                helperText={errors.nationality}
                                isRequired
                            />
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={styles.nextButtonContainer}>
                <AnimatedButton
                    style={styles.nextButton}
                    title={staticStrings.next}
                    onPress={onNextPress}
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