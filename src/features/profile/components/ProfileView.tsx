import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from '@/components';
import { HeaderBanner } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../styles/ProfileScreen.styles';
import { ProfileInfoCard } from './organisms/ProfileInfoCard';
import { ProfileExperienceSection } from './organisms/ProfileExperienceSection';
import { ProfileEducationSection } from './organisms/ProfileEducationSection';
import { ProfileCVSection } from './organisms/ProfileCVSection';
import { ProfileEditModal } from './organisms/ProfileEditModal';
import type { Profile, Experience, Education, ProfileEditTab } from '../types/profile.types';
import { PROFILE_COMPLETION_PCT } from '@/features/browse/constants/browseData';
import { ProfileCompletionBanner } from '@/features/browse/components';

interface ProfileViewProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  editModalVisible: boolean;
  activeEditTab: ProfileEditTab;
  onOpenEdit: (tab: ProfileEditTab) => void;
  onCloseEdit: () => void;
  onTabChange: (tab: ProfileEditTab) => void;
  onSavePersonal: (data: Partial<Profile>) => void;
  onSaveExperiences: (experiences: Experience[]) => void;
  onSaveEducations: (educations: Education[]) => void;
}

export function ProfileView({
  profile,
  experiences,
  educations,
  editModalVisible,
  activeEditTab,
  onOpenEdit,
  onCloseEdit,
  onTabChange,
  onSavePersonal,
  onSaveExperiences,
  onSaveEducations,
}: ProfileViewProps) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <HeaderBanner
        title="Your Profile"
        rightContent={
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="notifications-outline" size={17} color={Colors.buttonStrokePrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="settings-outline" size={17} color={Colors.buttonStrokePrimary} />
            </TouchableOpacity>
          </View>
        }
      />

      {(PROFILE_COMPLETION_PCT < 100) && (
        <ProfileCompletionBanner
          percentage={PROFILE_COMPLETION_PCT}
          onPress={() => console.log('Navigate to profile completion tips')}
        />
      )}

      <ScrollView style={styles.content} contentStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Info (Identity + Contact + About) */}
        <ProfileInfoCard
          profile={profile}
          onEdit={() => onOpenEdit('Personal')}
        />

        {/* Experience */}
        <ProfileExperienceSection
          experiences={experiences}
          onEdit={() => onOpenEdit('Experience')}
        />

        {/* Education */}
        <ProfileEducationSection
          educations={educations}
          onEdit={() => onOpenEdit('Education')}
        />

        {/* CV/Resume */}
        <ProfileCVSection
          cvFilename={profile.cv_filename}
          cvUploadedAt={profile.cv_uploaded_at}
          onEdit={() => onOpenEdit('Personal')}
        />
      </ScrollView>

      {/* Edit modal */}
      <ProfileEditModal
        visible={editModalVisible}
        activeTab={activeEditTab}
        profile={profile}
        experiences={experiences}
        educations={educations}
        onClose={onCloseEdit}
        onTabChange={onTabChange}
        onSavePersonal={onSavePersonal}
        onSaveExperiences={onSaveExperiences}
        onSaveEducations={onSaveEducations}
      />
    </SafeAreaView>
  );
}