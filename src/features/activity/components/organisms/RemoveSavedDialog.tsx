import { View, Modal, TouchableOpacity } from 'react-native';
import { Typography } from '@/components';
import { activityStyles as styles } from '../../styles/ActivityScreen.styles';

interface RemoveSavedDialogProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function RemoveSavedDialog({ visible, onCancel, onConfirm }: RemoveSavedDialogProps) {
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
          <Typography style={styles.dialogTitle}>Remove from Saved</Typography>
          <Typography style={styles.dialogBody}>
            Are you sure you want to remove this item from your saved items?
          </Typography>

          <View style={styles.dialogActions}>
            <TouchableOpacity
              style={styles.dialogBtnCancel}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Typography style={styles.dialogBtnCancelText}>No, cancel.</Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dialogBtnConfirm}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Typography style={styles.dialogBtnConfirmText}>Yes, remove.</Typography>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}