import { Pressable, ViewStyle, TextStyle, StyleProp, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { ComponentProps, useRef } from 'react';
import { Typography } from './Typography';

interface BaseButtonProps {
    onPress?: () => void;
    variant?: keyof typeof styles.buttonVariants;
    disabled?: boolean;
    iconColor?: string;
    iconSize?: number;
    iconPosition?: 'left' | 'right';
    style?: ViewStyle;
    textStyle?: TextStyle;
}
type ButtonWithTitle = BaseButtonProps & { 
    title: string; 
    icon?: ComponentProps<typeof Ionicons>['name'] 
};
type ButtonWithIcon = BaseButtonProps & { 
    icon: ComponentProps<typeof Ionicons>['name']; 
    title?: string 
};
type ButtonProps = ButtonWithTitle | ButtonWithIcon;

export function AnimatedButton({
    title,
    onPress,
    variant = 'normal',
    disabled = false,
    icon,
    iconColor = Colors.primary,
    iconPosition = 'left',
    iconSize = 24,
    style,
    textStyle
}:ButtonProps) {
    const scaleValue = useRef(new Animated.Value(1)).current;
    
    const buttonStyle: StyleProp<ViewStyle> = [
        styles.base,
        styles.buttonVariants[variant],
        disabled && styles.disabledButton[variant],
        style,
        { transform: [{ scale: scaleValue }] }
    ];

    const buttonTextStyle: StyleProp<TextStyle> = [
        styles.baseText,
        styles.buttonTitle[variant],
        disabled && styles.disabledButtonTitle[variant],
        textStyle,
    ]

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const renderIcon = (marginPos: 'marginRight' | 'marginLeft') => {
        if (!icon) return null;

        return (
            <Ionicons
                name={icon}
                size={iconSize}
                color={iconColor}
                style={{ [marginPos]: title ? 8 : 0 }}
            />
        );
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={disabled}
        >
            <Animated.View style={buttonStyle}>
                {iconPosition === 'left' && renderIcon('marginRight')}
                {title && <Typography style={buttonTextStyle} variant='buttonTitle'>{title}</Typography>}
                {iconPosition === 'right' && renderIcon('marginLeft')}
            </Animated.View>
        </Pressable>
    )
}

const styles = {
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    } as const,
    baseText: {
        textAlign: 'center'
    } as const,
    buttonVariants: {
        normal: {
            backgroundColor: Colors.primary,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10
        },
        text: {
            backgroundColor: 'transparent',
            paddingVertical: 5,
            paddingHorizontal: 6,
        },
    },
    buttonTitle: {
        normal: { color: Colors.textInverse },
        text: { color: Colors.primary }
    },
    disabledButton: {
        normal: { backgroundColor: Colors.buttonDisabled },
        text: { backgroundColor: 'transparent' }
    },
    disabledButtonTitle: {
        normal: { color: Colors.darkGray },
        text: { color: Colors.darkGray }
    }
};