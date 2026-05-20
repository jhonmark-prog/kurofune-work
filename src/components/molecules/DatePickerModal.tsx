import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { AnimatedButton } from '../atoms/AnimatedButton';
import { Colors } from '@/constants/colors';
import { typographyStyles } from '@/constants/textTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { staticStrings } from '@/constants/strings';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_PICKER_MODAL_HEIGHT = 550;

export interface DatePickerActions {
    show: (selected?: DateType) => void;
    hide: () => void;
}

interface DatePickerProps {
    showModal: boolean;
    selectedDate?: DateType;
}

export const DatePickerModal = forwardRef<DatePickerActions, { onDateSelect: (selectedDate: DateType) => void }>(({onDateSelect}, ref) => {
    const [dateInfo, setDateInfo] = useState<DatePickerProps>({showModal: false});

    useImperativeHandle(ref, () => ({
        show: (selected?: DateType) => {
            const isValidDate = !!selected;
            
            if(isValidDate){
                setDateInfo({selectedDate: dayjs(selected,DATE_FORMAT), showModal: true});
            }else
                setDateInfo({showModal: true});
        },
        hide: onModalClose
    }));

    const onModalClose = () => {
        setDateInfo(prev => ({...prev, showModal: false}));
    }

    const onDateSelected = () => {
        onDateSelect(dateInfo.selectedDate);
    }

    return (
        <SafeAreaView edges={['bottom']}>
            <Modal
                animationType="slide"
                onRequestClose={onModalClose}
                backdropColor={'rgba(0, 0, 0, 0.5)'}
                visible={dateInfo.showModal}
            >
                <View style={styles.modal_main}>
                    <View style={[styles.modal_container, {height: DATE_PICKER_MODAL_HEIGHT}]}>
                        <View>
                            <View style={styles.modal_header}>
                                <Text style={styles.modal_header_text}>{staticStrings.selectDateOfBirth}</Text>
                                <AnimatedButton
                                    onPress={onModalClose}
                                    icon={'close'}
                                    variant={'text'}
                                    iconColor={Colors.dark}
                                />
                            </View>
                            <View style={styles.modal_separator}/>
                        </View>
                        <DateTimePicker
                            mode={'single'}
                            date={dateInfo.selectedDate}
                            maxDate={dayjs()}
                            onChange={({ date }) =>  setDateInfo(prev => ({...prev, selectedDate: date}))}
                            styles={calendarStyles}
                            components={{
                                IconNext: <Ionicons name={'chevron-forward-sharp'} size={20} color={Colors.dark}/>,
                                IconPrev: <Ionicons name={'chevron-back-sharp'} size={20} color={Colors.dark}/>,
                            }}
                        />
                        <View style={styles.buttonsContainer}>
                            <AnimatedButton
                                title={staticStrings.cancel}
                                variant='text'
                                onPress={onModalClose}
                                textStyle={styles.cancelButtonText}
                            />
                            <AnimatedButton
                                style={styles.setDateButton}
                                title={staticStrings.setDate}
                                disabled={dateInfo.selectedDate == undefined}
                                onPress={onDateSelected}
                            />
                        </View>
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
    buttonsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },
    cancelButtonText: {
        color: Colors.textTitleBlue
    },
    setDateButton: {
        marginLeft: 20
    }
});

const calendarStyles = StyleSheet.create({
    day_label: {
        ...typographyStyles.normalTitle,
    }, 
    selected: {
        borderColor: Colors.primary,
        borderWidth: 2,
        backgroundColor: Colors.primaryLight,
        borderRadius: 10
    },
    selected_label: {
        color: Colors.dark,
        fontFamily: 'NunitoSans-Bold',
    },
    disabled_label: {
        ...typographyStyles.buttonTitle,
        color: Colors.buttonDisabled,
    },
    today: {
        backgroundColor: Colors.primaryLight,
        borderRadius: 10
    },
    month_label: {
        ...typographyStyles.normalTitle,
        fontSize: 15,
    },
    year_label: {
        ...typographyStyles.normalTitle,
        fontSize: 15,
    },
    weekday_label: {
        ...typographyStyles.buttonTitle,
        fontFamily: 'NunitoSans-Bold'
    },
    month_selector_label: {
        ...typographyStyles.buttonTitle,
        fontFamily: 'NunitoSans-Bold',
        fontSize: 15
    },
    month_selector: {
        marginRight: 10,
        borderColor: Colors.border,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    year_selector_label: {
        ...typographyStyles.buttonTitle,
        fontFamily: 'NunitoSans-Bold',
        fontSize: 15,
        borderColor: Colors.border,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    header: {
        marginBottom: 15
    },
    selected_month_label: {
        ...typographyStyles.buttonTitle,
        fontFamily: 'NunitoSans-Bold',
        borderColor: Colors.primary,
        borderWidth: 2,
        backgroundColor: Colors.primaryLight,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    selected_year_label: {
        ...typographyStyles.buttonTitle,
        fontFamily: 'NunitoSans-Bold',
        borderColor: Colors.primary,
        borderWidth: 2,
        backgroundColor: Colors.primaryLight,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6        
    }
});