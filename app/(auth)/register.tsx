import { StyleSheet, View, Image, Pressable, ScrollView, TextInputEndEditingEvent, Keyboard, BackHandler, Text } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { DATE_FORMAT, DatePickerActions, DatePickerModal, Input, PromptModal, Typography } from '@/components';
import { useCallback, useRef, useState } from 'react';
import { staticStrings } from '@/constants/strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/atoms/AnimatedButton';
import { isEmailValid } from '@/utils/common';
import { GENDER, TempUser } from '@/store/userSlice';
import { CountryModal, CountryPickerActions } from '@/components/molecules/CountryPickerModal';
import { CountryItem } from 'react-native-country-codes-picker';
import { PrompModalActions } from '@/components/atoms/Modal';
import dayjs from 'dayjs';
import { DateType } from 'react-native-ui-datepicker';

const EXIT_PROMPT_MODAL_HEIGHT = 230;
const GENDER_PROMPT_MODAL_HEIGHT = 250;
const INITIAL_DATE = '01/01/1991';

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
    const exitPromptModal = useRef<PrompModalActions>(null);
    const genderPromptModal = useRef<PrompModalActions>(null);
    const countryPromptModal = useRef<CountryPickerActions>(null);
    const datePickerModal = useRef<DatePickerActions>(null);
    const [email, setEmail] = useState(tempUserDataFromParams?.email || '');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [nationality, setNationality] = useState('');
    const [errors, setErrors] = useState<RequiredInputErrors>({});

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if(fullName?.trim() || gender?.trim() || birthday?.trim() || nationality?.trim())
                    onPromptModalShow();
                else
                    onExitButtonPress();

                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [fullName, gender, birthday, nationality, exitPromptModal])
    );

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
        setErrors(prev => ({...prev, email: !isEmailValid(emailText) ? staticStrings.emailInvalid : undefined}));
    }

    const onFullNameDoneEditing = (e: TextInputEndEditingEvent) => {
        const fullNameText = e.nativeEvent.text;
        setErrors(prev => ({...prev, fullName: fullNameText === '' ? staticStrings.emptyFullName : undefined}));
    }

    const onPromptModalShow = () => {
        exitPromptModal.current?.show();
    }

    const onPromptModalClose = () => {
        exitPromptModal.current?.hide();
    }

    const onExitButtonPress = () => {
        router.dismissTo('/');
    }

    const onGenderPromptShow = () => {
        genderPromptModal.current?.show();
    }

    const onGenderPromptHide = () => {
        genderPromptModal.current?.hide();
    }

    const onGenderSelect = (gender: string) => {
        setGender(gender);
        onGenderPromptHide();
        if(errors.gender)
            setErrors(prev => ({...prev, gender: undefined}));
    }

    const onCountryPromptShow = () => {
        countryPromptModal.current?.show(nationality);
    }

    const onCountryPromptHide = () => {
        countryPromptModal.current?.hide();
    }

    const onCountrySelect = (country: CountryItem) => {
        setNationality(country.name['en']);
        onCountryPromptHide();
        if(errors.nationality)
            setErrors(prev => ({...prev, nationality: undefined}));
    }

    const onDatePickerShow = () => {
        if(birthday){
            datePickerModal.current?.show(birthday);
        }else
            datePickerModal.current?.show(INITIAL_DATE);
    }

    const onDatePickerHide = () => {
        datePickerModal.current?.hide();
    }

    const onDateSelect = (selectedDate: DateType) => {
        if(selectedDate)
            setBirthday(dayjs(selectedDate).format(DATE_FORMAT));
        onDatePickerHide();
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
                    <Pressable onPress={onGenderPromptShow}>
                        <View pointerEvents="none"> 
                            <Input
                                style={styles.spacing}
                                value={gender ? gender == GENDER.FEMALE ? staticStrings.female : staticStrings.male : ''}
                                placeholder={`- ${staticStrings.selectOption} -`}
                                label={staticStrings.gender}
                                editable={false}
                                icon={'chevron-down-sharp'}
                                helperText={errors.gender}
                                isRequired
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={onDatePickerShow}>
                        <View pointerEvents="none"> 
                            <Input
                                style={styles.spacing}
                                value={birthday}
                                placeholder={DATE_FORMAT}
                                label={staticStrings.dateOfBirth}
                                editable={false}
                                icon={'calendar-outline'}
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={onCountryPromptShow}>
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
            <PromptModal 
                ref={exitPromptModal}
                title={staticStrings.cancelUserRegistration}
                height={EXIT_PROMPT_MODAL_HEIGHT}
            >
                <View>
                    <Typography variant='body'>{staticStrings.exitPrompt1}</Typography>
                    <View style={styles.exitPromptButtonContainer}>
                        <AnimatedButton
                            title={staticStrings.cancel}
                            variant='text'
                            onPress={onPromptModalClose}
                            textStyle={{color: Colors.textTitleBlue}}
                        />
                        <AnimatedButton
                            style={styles.exitButton}
                            title={staticStrings.exit}
                            onPress={onExitButtonPress}
                        />
                    </View>
                </View>
            </PromptModal>
            <PromptModal 
                ref={genderPromptModal}
                title={staticStrings.selectGender}
                height={GENDER_PROMPT_MODAL_HEIGHT}
            >
                <View>
                    <Pressable onPress={()=>onGenderSelect(GENDER.FEMALE)}>
                        <View pointerEvents="none"> 
                            <Input
                                value={staticStrings.female}
                                editable={false}
                                icon={gender == GENDER.FEMALE ? 'checkmark-sharp' : undefined}
                                style={{backgroundColor: gender == GENDER.FEMALE ? Colors.primaryLight: Colors.white}}
                                iconColor={Colors.primary}
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>onGenderSelect(GENDER.MALE)}>
                        <View pointerEvents="none"> 
                            <Input
                                style={{...styles.spacingSmall, backgroundColor: gender == GENDER.MALE ? Colors.primaryLight: Colors.white}}
                                value={staticStrings.male}
                                editable={false}
                                icon={gender == GENDER.MALE ? 'checkmark-sharp' : undefined}
                                iconColor={Colors.primary}
                            />
                        </View>
                    </Pressable>
                </View>
            </PromptModal>
            <CountryModal ref={countryPromptModal} onCountrySelect={onCountrySelect}/>
            <DatePickerModal ref={datePickerModal} onDateSelect={onDateSelect}/>
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
  spacingSmall: {
    marginTop: 5
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
  exitPromptButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    marginTop: 15
  },
  exitButton: {
    marginLeft: 20, 
    backgroundColor: Colors.danger
  }
});