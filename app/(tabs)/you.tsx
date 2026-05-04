import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileView } from '@/features/profile/components/ProfileView';
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
      profile={profile}
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