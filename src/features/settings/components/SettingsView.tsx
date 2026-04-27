import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { settingsStyles as styles } from '../styles/SettingsScreen.styles';
import { SettingsHeader } from './molecules/SettingsHeader';

interface SettingsViewProps {
  onBack: () => void;
  onLogout: () => void;
  onAccountSettings: () => void;
  onLanguage: () => void;
  onPrivacyPolicy: () => void;
  onTerms: () => void;
  onSendMoney: () => void;
}

interface MenuRowProps {
  icon: any;
  label: string;
  onPress: () => void;
  showSeparator?: boolean;
}

function MenuRow({ icon, label, onPress, showSeparator = true }: MenuRowProps) {
  return (
    <>
      <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.menuIcon}>
          <Ionicons name={icon} size={20} color={Colors.textPrimary} />
        </View>
        <Typography style={styles.menuLabel}>{label}</Typography>
      </TouchableOpacity>
      {showSeparator && <View style={styles.menuSeparator} />}
    </>
  );
}

export function SettingsView({
  onBack,
  onLogout,
  onAccountSettings,
  onLanguage,
  onPrivacyPolicy,
  onTerms,
  onSendMoney,
}: SettingsViewProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <SettingsHeader
        title="Settings"
        onBack={onBack}
        rightContent={
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            onPress={onLogout}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="log-out-outline" size={16} color={Colors.danger} />
            <Typography style={styles.logoutText}>Logout</Typography>
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Typography style={styles.sectionLabel}>Account and Preferences</Typography>
        <MenuRow
          icon="settings-outline"
          label="Account Settings"
          onPress={onAccountSettings}
        />
        <MenuRow
          icon="language-outline"
          label="Language"
          onPress={onLanguage}
          showSeparator={false}
        />

        <Typography style={styles.sectionLabel}>Others</Typography>
        <MenuRow
          icon="lock-closed-outline"
          label="Privacy Policy"
          onPress={onPrivacyPolicy}
        />
        <MenuRow
          icon="document-text-outline"
          label="Terms & Conditions"
          onPress={onTerms}
          showSeparator={false}
        />

        <TouchableOpacity
          style={styles.sendMoneyBanner}
          onPress={onSendMoney}
          activeOpacity={0.85}
        >
          <View style={styles.sendMoneyTextWrap}>
            <Typography style={styles.sendMoneyTitle}>Send Money</Typography>
            <Typography style={styles.sendMoneySubtitle}>
              Connecting money across borders,{'\n'}from here to anywhere.
            </Typography>
          </View>
          <View style={styles.sendMoneyIconWrap}>
            <Ionicons name="cash-outline" size={28} color="#ffffff" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}