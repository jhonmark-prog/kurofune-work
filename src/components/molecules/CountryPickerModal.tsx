import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, StyleProp, ViewStyle} from 'react-native';
import { AnimatedButton } from '../atoms/AnimatedButton';
import { Colors } from '@/constants/colors';
import { typographyStyles } from '@/constants/textTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountryItem, CountryList, ItemTemplateProps } from 'react-native-country-codes-picker';
import { Typography } from '../atoms';
import { Ionicons } from '@expo/vector-icons';
import { staticStrings } from '@/constants/strings';

const COUNTRY_PICKER_MODAL_HEIGHT = 650;

export interface CountryPickerActions {
    show: (countryName: string) => void;
    hide: () => void;
}

interface CountryModalProps {
    showModal: boolean;
    countryName?: string;
}

export const CountryModal = forwardRef<CountryPickerActions, { onCountrySelect: (item: CountryItem)=> void }>(({onCountrySelect}, ref) => {
    const [countryInfo, setCountryInfo] = useState<CountryModalProps>({showModal: false});

    useImperativeHandle(ref, () => ({
        show: (countryName: string) => {
            setCountryInfo({countryName: countryName, showModal: true});
        },
        hide: onModalClose
    }));

    const onModalClose = () => {
        setCountryInfo(prev => ({...prev, showModal: false}));
    }

    const renderItem = (props: ItemTemplateProps) => {
        const isCountrySelected = countryInfo.countryName == props.name;
        const buttonStyle: StyleProp<ViewStyle> = [
            styles.countryButton,
            isCountrySelected && styles.selectedCountryButton
        ];

        return (
            <Pressable 
                style={buttonStyle}
                onPress={props.onPress}
            >
                <View style={styles.countryButtonContent}>
                    <View style={styles.countryButtonTextContainer}>
                        <Text style={styles.countryFlagText}>{props.item.flag}</Text>
                        <Typography variant='body'>{props.name}</Typography>
                    </View>
                    { isCountrySelected && (
                        <Ionicons
                            name={'checkmark-sharp'}
                            size={20}
                            color={Colors.primary}
                        />
                    )}
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView edges={['bottom']}>
            <Modal
                animationType="slide"
                onRequestClose={onModalClose}
                backdropColor={'rgba(0, 0, 0, 0.5)'}
                visible={countryInfo.showModal}
            >
                <View style={styles.modal_main}>
                    <View style={[styles.modal_container,{height: COUNTRY_PICKER_MODAL_HEIGHT}]}>
                        <View>
                            <View style={styles.modal_header}>
                                <Text style={styles.modal_header_text}>{staticStrings.selectCountry}</Text>
                                <AnimatedButton
                                    onPress={onModalClose}
                                    icon={'close'}
                                    variant={'text'}
                                    iconColor={Colors.dark}
                                />
                            </View>
                            <View style={styles.modal_separator}/>
                        </View>
                        <CountryList
                            lang={'en'}
                            itemTemplate={renderItem}
                            pickerButtonOnPress={onCountrySelect}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
});

const styles = StyleSheet.create({
    modal_main: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modal_container: {
        width: '100%',
        backgroundColor: Colors.white, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        paddingHorizontal: 25
    },
    modal_text:{
        ...typographyStyles.buttonTitle,
        marginLeft: 20
    },
    modal_header: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: 20
    },
    modal_header_text: {
        ...typographyStyles.buttonTitle,
        color: Colors.darkGray
    },
    modal_separator: {
        borderBottomWidth: 0.5, 
        borderColor: 'rgba(0, 0, 0, 0.2)', 
        marginTop: 10,
        marginBottom: 15
    },
    countryButton: {
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        backgroundColor: Colors.white, 
        borderColor: Colors.border, 
        borderWidth: 1, 
        marginBottom: 8, 
        borderRadius: 5
    },
    selectedCountryButton: {
        backgroundColor: Colors.primaryLight
    },
    countryButtonContent: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    countryButtonTextContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    countryFlagText: {
        marginRight: 10
    }
});
