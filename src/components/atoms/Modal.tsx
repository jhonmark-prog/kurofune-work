import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { AnimatedButton } from '../atoms/AnimatedButton';
import { Colors } from '@/constants/colors';
import { typographyStyles } from '@/constants/textTypes';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface PrompModalActions {
    show: (overrideBanner?: ReactNode) => void;
    hide: () => void;
}

interface PromptModalProps {
    children: any;
    title?: string;
    height?: number;
    showHeader?: boolean;
    banner?: ReactNode;
    enableBackButtonClose?: boolean;
}

export const PromptModal = forwardRef<PrompModalActions, PromptModalProps>(({
    children,
    title = '',
    height = 90,
    showHeader = true,
    banner = null,
    enableBackButtonClose = true
}: PromptModalProps, ref) => {
    const [show, setShow] = useState(false);
    const [localBanner, setLocalBanner] = useState<ReactNode>(banner);

    useImperativeHandle(ref, () => ({
        show: (overrideBanner?: ReactNode) => {
            if(overrideBanner)
                setLocalBanner(overrideBanner);
            setShow(true);
        },
        hide: ()=>setShow(false)
    }));

    const onModalClose = () => {
        if(enableBackButtonClose)
            setShow(false);
    }

    return (
        <SafeAreaView edges={['bottom']}>
            <Modal
                animationType="slide"
                onRequestClose={onModalClose}
                backdropColor={'rgba(0, 0, 0, 0.5)'}
                visible={show}
            >
                <View style={styles.modal_main}>
                    <View style={[styles.modal_container, {height}]}>
                        { showHeader && (
                            <View>
                                <View style={styles.modal_header}>
                                    <Text style={styles.modal_header_text}>{title}</Text>
                                    <AnimatedButton
                                        onPress={onModalClose}
                                        icon={'close'}
                                        variant={'text'}
                                        iconColor={Colors.dark}
                                    />
                                </View>
                                <View style={styles.modal_separator}/>
                            </View>
                        )}
                        { localBanner && <View>{localBanner}</View>}
                        {children}
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
    }
});