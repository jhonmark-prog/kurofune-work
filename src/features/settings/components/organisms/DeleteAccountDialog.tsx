import { View, Modal, TouchableOpacity } from 'react-native';
import { Typography } from '@/components';
import { settingsStyles as styles } from '../../styles/SettingsScreen.styles';

interface DeleteAccountDialogProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteAccountDialog({ visible, onCancel, onConfirm }: DeleteAccountDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.dialogOverlay}
        activeOpacity={1}
        onPress={onCancel}
      >
        <TouchableOpacity activeOpacity={1} style={styles.dialogBox}>
          <Typography style={styles.dialogTitle}>Delete account?</Typography>
          <Typography style={styles.dialogBody}>
            Are you sure you want to delete your account? This action is irreversible once you proceed.
          </Typography>
          <View style={styles.dialogActions}>
            <TouchableOpacity
              style={styles.dialogBtnCancel}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Typography style={styles.dialogBtnCancelText}>No, go back.</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dialogBtnDelete}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Typography style={styles.dialogBtnDeleteText}>Yes, delete.</Typography>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}