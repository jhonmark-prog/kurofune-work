import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileView } from '@/features/profile/components/ProfileView';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/store/userSlice';
import type { Profile, Experience, Education } from '@/features/profile/types/profile.types';

export default function YouScreen() {
  const {
    profile,
    experiences,
    educations,
    editModalVisible,
    activeEditTab,
    openEdit,
    closeEdit,
    switchEditTab,
    savePersonal,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
  } = useProfile();

  const user = useSelector(selectUserData);

  // Merge user details into profile for display
  const mergedProfile: Profile = {
    ...profile,
    full_name: user.fullName ?? profile.full_name,
    email: user.email ?? profile.email,
    gender: user.gender ? user.gender.toLowerCase() : (profile.gender || ''),
    nationality: user.nationality ?? profile.nationality,
    avatar_url: user.photo ?? profile.avatar_url ?? null,
  };

  const handleSaveExperiences = (updated: Experience[]) => {
    const currentIds = experiences.map((e) => e.id);
    const updatedIds = updated.map((e) => e.id);


    currentIds.forEach((id) => {
      if (!updatedIds.includes(id)) removeExperience(id);
    });


    updated.forEach((exp) => {
      if (currentIds.includes(exp.id)) {
        updateExperience(exp.id, exp);
      } else {
        addExperience(exp);
      }
    });

    closeEdit();
  };

  const handleSaveEducations = (updated: Education[]) => {
    const currentIds = educations.map((e) => e.id);
    const updatedIds = updated.map((e) => e.id);

    currentIds.forEach((id) => {
      if (!updatedIds.includes(id)) removeEducation(id);
    });

    updated.forEach((edu) => {
      if (currentIds.includes(edu.id)) {
        updateEducation(edu.id, edu);
      } else {
        addEducation(edu);
      }
    });

    closeEdit();
  };

  return (
    <ProfileView
      profile={mergedProfile}
      experiences={experiences}
      educations={educations}
      editModalVisible={editModalVisible}
      activeEditTab={activeEditTab}
      onOpenEdit={openEdit}
      onCloseEdit={closeEdit}
      onTabChange={switchEditTab}
      onSavePersonal={savePersonal}
      onSaveExperiences={handleSaveExperiences}
      onSaveEducations={handleSaveEducations}
    />
  );
}