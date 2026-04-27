import { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { settingsStyles as styles } from '../styles/SettingsScreen.styles';
import { SettingsHeader } from './molecules/SettingsHeader';
import { DeleteAccountDialog } from './organisms/DeleteAccountDialog';
import { PASSWORD_HINT } from '../constants/settingsData';

interface AccountSettingsViewProps {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
  passwordError: string | null;
  deleteDialogVisible: boolean;
  onBack: () => void;
  onSave: () => void;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

export function AccountSettingsView({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordError,
  deleteDialogVisible,
  onBack,
  onSave,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: AccountSettingsViewProps) {
  const [pwFocused, setPwFocused] = useState(false);
  const [cpwFocused, setCpwFocused] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <SettingsHeader title="Account Settings" onBack={onBack} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
         >
           <View style={styles.formSection}>
             <View style={styles.subSectionHeader}>
               <Ionicons name="key-outline" size={16} color={Colors.textTertiary} />
               <Typography style={styles.subSectionTitle}>Update password</Typography>
             </View>

            <Typography style={styles.fieldLabel}>Password</Typography>
            <View style={[styles.inputRow, pwFocused && styles.inputRowFocused]}>
              <TextInput
                style={styles.inputRowText}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={Colors.textTertiary}
                secureTextEntry={!showPassword}
                onFocus={() => setPwFocused(true)}
                onBlur={() => setPwFocused(false)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.textTertiary}
                />
              </TouchableOpacity>
            </View>

            <Typography style={styles.passwordHint}>{PASSWORD_HINT}</Typography>

            <Typography style={styles.fieldLabel}>Confirm Password</Typography>
            <View style={[styles.inputRow, cpwFocused && styles.inputRowFocused]}>
              <TextInput
                style={styles.inputRowText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor={Colors.textTertiary}
                secureTextEntry={!showConfirmPassword}
                onFocus={() => setCpwFocused(true)}
                onBlur={() => setCpwFocused(false)}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.textTertiary}
                />
              </TouchableOpacity>
            </View>

            {passwordError ? (
              <Typography style={{ color: Colors.danger, fontSize: 13, marginBottom: 12 }}>
                {passwordError}
              </Typography>
            ) : null}
          </View>

          <View style={styles.sectionDivider} />

          {}
          <View style={styles.formSection}>
            <View style={styles.subSectionHeader}>
              <Ionicons name="remove-circle-outline" size={16} color={Colors.textTertiary} />
              <Typography style={styles.subSectionTitle}>Account Deletion</Typography>
            </View>

            <View style={styles.deleteRow}>
              <View style={styles.deleteInfo}>
                <Typography style={styles.deleteTitle}>Delete account</Typography>
                <Typography style={styles.deleteSubtitle}>
                  This action is irreversible once you confirm.
                </Typography>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={onRequestDelete}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="trash-outline" size={16} color={Colors.danger} />
                <Typography style={styles.deleteBtnText}>Delete</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.85}>
          <Typography style={styles.saveBtnText}>Save</Typography>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <DeleteAccountDialog
        visible={deleteDialogVisible}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
    </SafeAreaView>
  );
}