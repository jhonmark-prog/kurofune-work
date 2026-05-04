import { View, TouchableOpacity, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { settingsStyles as styles } from '../styles/SettingsScreen.styles';
import { SettingsHeader } from './molecules/SettingsHeader';
import { PAYFOREX_URL } from '../constants/settingsData';

interface SendMoneyViewProps {
  onBack: () => void;
}

export function SendMoneyView({ onBack }: SendMoneyViewProps) {
  const handleProceed = () => {
    Linking.openURL(PAYFOREX_URL);
  };

  return (
    <SafeAreaView style={styles.sendMoneyScreen} edges={['top', 'bottom']}>
       <SettingsHeader title="Send Money" onBack={onBack} />

       <View style={styles.redirectBody}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View
            style={{
              width: 120,
              height: 60,
              borderRadius: 8,
              backgroundColor: '#f0f0f0',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              style={{ fontSize: 18, fontFamily: 'NunitoSans-Bold', color: Colors.textTitleBlue }}
            >
              PayForex
            </Typography>
           </View>
        </View>

        <Typography style={styles.redirectText}>
          You will be redirected to PayForex{'\n'}which is an external link.
        </Typography>
        <Typography style={styles.redirectQuestion}>Do you want to proceed?</Typography>
      </View>

      <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed} activeOpacity={0.85}>
        <Typography style={styles.proceedBtnText}>Proceed</Typography>
      </TouchableOpacity>
    </SafeAreaView>
  );
}