import { View, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { editModalStyles as styles } from '../../styles/ProfileEditModal.styles';
import { PersonalTab } from './PersonalTab';
import { ExperienceTab } from './ExperienceTab';
import { EducationTab } from './EducationTab';
import type { Profile, Experience, Education, ProfileEditTab } from '../../types/profile.types';

const EDIT_TABS: ProfileEditTab[] = ['Personal', 'Experience', 'Education'];

interface ProfileEditModalProps {
  visible: boolean;
  activeTab: ProfileEditTab;
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  onClose: () => void;
  onTabChange: (tab: ProfileEditTab) => void;
  onSavePersonal: (data: Partial<Profile>) => void;
  onSaveExperiences: (experiences: Experience[]) => void;
  onSaveEducations: (educations: Education[]) => void;
}

export function ProfileEditModal({
  visible,
  activeTab,
  profile,
  experiences,
  educations,
  onClose,
  onTabChange,
  onSavePersonal,
  onSaveExperiences,
  onSaveEducations,
}: ProfileEditModalProps) {
   return (
     <Modal
       visible={visible}
       transparent
       animationType="slide"
       onRequestClose={onClose}
     >
       <TouchableOpacity
         style={styles.overlay}
         activeOpacity={1}
         onPress={onClose}
       >
         <KeyboardAvoidingView
           style={styles.keyboardAvoid}
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
           <View style={styles.sheetInner}>
             <View style={styles.sheet}>
                <View style={styles.sheetHandle} />
                <View style={styles.sheetHeader}>
                 <Typography style={styles.sheetTitle}>Profile Details</Typography>
                 <TouchableOpacity
                   style={styles.closeBtn}
                   onPress={onClose}
                   hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                 >
                   <Ionicons name="close" size={16} color={Colors.textPrimary} />
                 </TouchableOpacity>
                </View>

                <View style={styles.tabRow}>
                 {EDIT_TABS.map((tab) => {
                   const active = tab === activeTab;
                   return (
                     <TouchableOpacity
                       key={tab}
                       style={styles.tab}
                       onPress={() => onTabChange(tab)}
                       activeOpacity={0.75}
                     >
                       <Typography
                         style={[styles.tabLabel, active && styles.tabLabelActive]}
                       >
                         {tab}
                       </Typography>
                       {active && <View style={styles.tabUnderline} />}
                     </TouchableOpacity>
                   );
                 })}
                </View>
                {activeTab === 'Personal' && (
                 <PersonalTab profile={profile} onSave={onSavePersonal} />
               )}
               {activeTab === 'Experience' && (
                 <ExperienceTab
                   experiences={experiences}
                   onSave={onSaveExperiences}
                 />
               )}
               {activeTab === 'Education' && (
                 <EducationTab
                   educations={educations}
                   onSave={onSaveEducations}
                 />
               )}
             </View>
           </View>
         </KeyboardAvoidingView>
       </TouchableOpacity>
     </Modal>
   );
}