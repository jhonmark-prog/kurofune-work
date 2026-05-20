import { View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { settingsStyles as styles } from '../styles/SettingsScreen.styles';
import { SettingsHeader } from './molecules/SettingsHeader';
import { LANGUAGE_OPTIONS } from '../constants/settingsData';
import type { LanguageCode } from '../types/settings.types';

interface LanguageViewProps {
  selectedLanguage: LanguageCode;
  onBack: () => void;
  onSelect: (code: LanguageCode) => void;
}

export function LanguageView({ selectedLanguage, onBack, onSelect }: LanguageViewProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <SettingsHeader title="Language" onBack={onBack} />

      <FlatList
        data={LANGUAGE_OPTIONS}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
           const active = item.code === selectedLanguage;
           return (
             <TouchableOpacity
               style={styles.languageRow}
               onPress={() => onSelect(item.code)}
               activeOpacity={0.7}
             >
               <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                {active && <View style={styles.radioInner} />}
              </View>
              <Typography style={styles.languageLabel}>{item.label}</Typography>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}