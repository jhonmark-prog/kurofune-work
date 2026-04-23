// src/features/profile/lib/profileApi.ts
// Supabase query functions — called by hooks only, never by components directly

import type { Profile, Experience, Education } from '../types/profile.types';

// TODO: Replace stubs with real supabase calls when backend is wired
// import { supabase } from '@/lib/supabase';

export async function fetchProfile(userId: string): Promise<Profile | null> {
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .eq('id', userId)
  //   .single();
  // if (error) throw error;
  // return data;
  return null;
}

export async function updateProfile(userId: string, data: Partial<Profile>): Promise<void> {
  // const { error } = await supabase
  //   .from('profiles')
  //   .update(data)
  //   .eq('id', userId);
  // if (error) throw error;
}

export async function fetchExperiences(profileId: string): Promise<Experience[]> {
  // const { data, error } = await supabase
  //   .from('experiences')
  //   .select('*')
  //   .eq('profile_id', profileId)
  //   .order('start_date', { ascending: false });
  // if (error) throw error;
  // return data ?? [];
  return [];
}

export async function upsertExperience(
  profileId: string,
  experience: Partial<Experience>
): Promise<void> {
  // const { error } = await supabase
  //   .from('experiences')
  //   .upsert({ ...experience, profile_id: profileId });
  // if (error) throw error;
}

export async function deleteExperience(id: string): Promise<void> {
  // const { error } = await supabase.from('experiences').delete().eq('id', id);
  // if (error) throw error;
}

export async function fetchEducations(profileId: string): Promise<Education[]> {
  // const { data, error } = await supabase
  //   .from('education')
  //   .select('*')
  //   .eq('profile_id', profileId)
  //   .order('graduation_year', { ascending: false });
  // if (error) throw error;
  // return data ?? [];
  return [];
}

export async function upsertEducation(
  profileId: string,
  education: Partial<Education>
): Promise<void> {
  // const { error } = await supabase
  //   .from('education')
  //   .upsert({ ...education, profile_id: profileId });
  // if (error) throw error;
}

export async function deleteEducation(id: string): Promise<void> {
  // const { error } = await supabase.from('education').delete().eq('id', id);
  // if (error) throw error;
}

export async function uploadAvatar(userId: string, file: any): Promise<string> {
  // const filePath = `${userId}/avatar.jpg`;
  // const { error } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
  // if (error) throw error;
  // const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  // return data.publicUrl;
  return '';
}

export async function uploadCV(userId: string, file: any): Promise<{ url: string; filename: string }> {
  // const filePath = `${userId}/${file.name}`;
  // const { error } = await supabase.storage.from('resumes').upload(filePath, file, { upsert: true });
  // if (error) throw error;
  // const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
  // return { url: data.publicUrl, filename: file.name };
  return { url: '', filename: '' };
}

export function calculateCompletionPct(profile: Partial<Profile>, experiences: Experience[], educations: Education[]): number {
  const requiredFields: (keyof Profile)[] = [
    'full_name',
    'email',
    'phone',
    'location',
    'job_title',
    'nationality',
  ];
  const filledFields = requiredFields.filter((f) => !!profile[f]).length;
  const hasExperience = experiences.length > 0 ? 1 : 0;
  const hasEducation = educations.length > 0 ? 1 : 0;
  const total = requiredFields.length + 2;
  return Math.round(((filledFields + hasExperience + hasEducation) / total) * 100);
}