import { useSelector, useDispatch } from 'react-redux';
import {
  selectProfile,
  selectExperiences,
  selectEducations,
  selectEditModalVisible,
  selectActiveEditTab,
  openEditModal,
  closeEditModal,
  setActiveEditTab,
  updateProfileField,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  updateCompletionPct,
} from '../../../store/profileSlice';
import type { RootState } from '../../../store/types';
import type { Profile, Experience, Education, ProfileEditTab } from '../types/profile.types';
import { calculateCompletionPct } from '../lib/profileApi';

export function useProfile() {
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => selectProfile(state as any));
  const experiences = useSelector((state: RootState) => selectExperiences(state as any));
  const educations = useSelector((state: RootState) => selectEducations(state as any));
  const editModalVisible = useSelector((state: RootState) => selectEditModalVisible(state as any));
  const activeEditTab = useSelector((state: RootState) => selectActiveEditTab(state as any));

  const openEdit = (tab: ProfileEditTab = 'Personal') => {
    dispatch(openEditModal(tab));
  };

  const closeEdit = () => {
    dispatch(closeEditModal());
  };

  const switchEditTab = (tab: ProfileEditTab) => {
    dispatch(setActiveEditTab(tab));
  };

  const savePersonal = (data: Partial<Profile>) => {
    Object.entries(data).forEach(([key, value]) => {
      dispatch(updateProfileField({ key: key as keyof Profile, value }));
    });
    const newPct = calculateCompletionPct({ ...profile, ...data }, experiences, educations);
    dispatch(updateCompletionPct(newPct));
    dispatch(closeEditModal());
  };

  const handleAddExperience = (exp: Experience) => {
    dispatch(addExperience(exp));
    const newPct = calculateCompletionPct(profile, [...experiences, exp], educations);
    dispatch(updateCompletionPct(newPct));
  };

  const handleUpdateExperience = (id: string, data: Partial<Experience>) => {
    dispatch(updateExperience({ id, data }));
  };

  const handleRemoveExperience = (id: string) => {
    dispatch(removeExperience(id));
    const remaining = experiences.filter((e) => e.id !== id);
    const newPct = calculateCompletionPct(profile, remaining, educations);
    dispatch(updateCompletionPct(newPct));
  };

  const handleAddEducation = (edu: Education) => {
    dispatch(addEducation(edu));
    const newPct = calculateCompletionPct(profile, experiences, [...educations, edu]);
    dispatch(updateCompletionPct(newPct));
  };

  const handleUpdateEducation = (id: string, data: Partial<Education>) => {
    dispatch(updateEducation({ id, data }));
  };

  const handleRemoveEducation = (id: string) => {
    dispatch(removeEducation(id));
    const remaining = educations.filter((e) => e.id !== id);
    const newPct = calculateCompletionPct(profile, experiences, remaining);
    dispatch(updateCompletionPct(newPct));
  };

  return {
    profile,
    experiences,
    educations,
    editModalVisible,
    activeEditTab,
    openEdit,
    closeEdit,
    switchEditTab,
    savePersonal,
    addExperience: handleAddExperience,
    updateExperience: handleUpdateExperience,
    removeExperience: handleRemoveExperience,
    addEducation: handleAddEducation,
    updateEducation: handleUpdateEducation,
    removeEducation: handleRemoveEducation,
  };
}