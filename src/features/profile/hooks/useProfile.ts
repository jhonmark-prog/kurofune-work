import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
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
import { 
  calculateCompletionPct, 
  fetchProfile as apiFetchProfile, 
  updateProfile as apiUpdateProfile, 
  fetchExperiences as apiFetchExperiences, 
  fetchEducations as apiFetchEducations 
} from '../lib/profileApi';

export function useProfile() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => selectProfile(state));
  const experiences = useSelector((state: RootState) => selectExperiences(state));
  const educations = useSelector((state: RootState) => selectEducations(state));
  const editModalVisible = useSelector((state: RootState) => selectEditModalVisible(state));
  const activeEditTab = useSelector((state: RootState) => selectActiveEditTab(state));

  // Fetch profile data on mount
  useEffect(() => {
    const loadProfileData = async () => {
      // In a real app, we would get the userId from auth state
      // For now, we'll use a placeholder or try to get it from userSlice
      const userId = '1'; // Placeholder - should come from auth state
      
      const profileData = await apiFetchProfile(userId);
      if (profileData) {
        dispatch(setProfile(profileData));
        
        // Fetch experiences and educations
        const expData = await apiFetchExperiences(profileData.id);
        const eduData = await apiFetchEducations(profileData.id);
        
        if (expData.length > 0) {
          dispatch(setExperiences(expData));
        }
        if (eduData.length > 0) {
          dispatch(setEducations(eduData));
        }
        
        // Update completion percentage
        const completionPct = calculateCompletionPct(profileData, expData, eduData);
        dispatch(updateCompletionPct(completionPct));
      }
    };
    
    loadProfileData();
  }, [dispatch]);

  const openEdit = (tab: ProfileEditTab = 'Personal') => {
    dispatch(openEditModal(tab));
  };

  const closeEdit = () => {
    dispatch(closeEditModal());
  };

  const switchEditTab = (tab: ProfileEditTab) => {
    dispatch(setActiveEditTab(tab));
  };

  const savePersonal = async (data: Partial<Profile>) => {
    try {
      // Update the profile in the backend
      const userId = '1'; // Placeholder - should come from auth state
      await apiUpdateProfile(userId, data);
      
      // Update the profile in Redux
      Object.entries(data).forEach(([key, value]) => {
        dispatch(updateProfileField({ key: key as keyof Profile, value }));
      });
      
      const newPct = calculateCompletionPct({ ...profile, ...data }, experiences, educations);
      dispatch(updateCompletionPct(newPct));
      dispatch(closeEditModal());
    } catch (error) {
      console.error('Error saving profile:', error);
      // TODO: Show error to user
    }
  };

  const handleAddExperience = async (exp: Experience) => {
    try {
      // In a real implementation, we would call upsertExperience API
      // For now, we'll just add it to Redux and log
      dispatch(addExperience(exp));
      
      // Calculate new completion percentage
      const newPct = calculateCompletionPct(profile, [...experiences, exp], educations);
      dispatch(updateCompletionPct(newPct));
    } catch (error) {
      console.error('Error adding experience:', error);
      // TODO: Show error to user
    }
  };

  const handleUpdateExperience = async (id: string, data: Partial<Experience>) => {
    try {
      // In a real implementation, we would call upsertExperience API
      // For now, we'll just update it in Redux and log
      dispatch(updateExperience({ id, data }));
    } catch (error) {
      console.error('Error updating experience:', error);
      // TODO: Show error to user
    }
  };

  const handleRemoveExperience = async (id: string) => {
    try {
      // In a real implementation, we would call deleteExperience API
      // For now, we'll just remove it from Redux and log
      dispatch(removeExperience(id));
      
      const remaining = experiences.filter((e) => e.id !== id);
      const newPct = calculateCompletionPct(profile, remaining, educations);
      dispatch(updateCompletionPct(newPct));
    } catch (error) {
      console.error('Error removing experience:', error);
      // TODO: Show error to user
    }
  };

  const handleAddEducation = async (edu: Education) => {
    try {
      // In a real implementation, we would call upsertEducation API
      // For now, we'll just add it to Redux and log
      dispatch(addEducation(edu));
      
      // Calculate new completion percentage
      const newPct = calculateCompletionPct(profile, experiences, [...educations, edu]);
      dispatch(updateCompletionPct(newPct));
    } catch (error) {
      console.error('Error adding education:', error);
      // TODO: Show error to user
    }
  };

  const handleUpdateEducation = async (id: string, data: Partial<Education>) => {
    try {
      // In a real implementation, we would call upsertEducation API
      // For now, we'll just update it in Redux and log
      dispatch(updateEducation({ id, data }));
    } catch (error) {
      console.error('Error updating education:', error);
      // TODO: Show error to user
    }
  };

  const handleRemoveEducation = async (id: string) => {
    try {
      // In a real implementation, we would call deleteEducation API
      // For now, we'll just remove it from Redux and log
      dispatch(removeEducation(id));
      
      const remaining = educations.filter((e) => e.id !== id);
      const newPct = calculateCompletionPct(profile, experiences, remaining);
      dispatch(updateCompletionPct(newPct));
    } catch (error) {
      console.error('Error removing education:', error);
      // TODO: Show error to user
    }
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