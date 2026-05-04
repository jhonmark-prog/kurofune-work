


import type { Profile, Experience, Education } from '../types/profile.types';




export async function fetchProfile(userId: string): Promise<Profile | null> {







  return null;
}

export async function updateProfile(userId: string, data: Partial<Profile>): Promise<void> {





}

export async function fetchExperiences(profileId: string): Promise<Experience[]> {







  return [];
}

export async function upsertExperience(
  profileId: string,
  experience: Partial<Experience>
): Promise<void> {




}

export async function deleteExperience(id: string): Promise<void> {


}

export async function fetchEducations(profileId: string): Promise<Education[]> {







  return [];
}

export async function upsertEducation(
  profileId: string,
  education: Partial<Education>
): Promise<void> {




}

export async function deleteEducation(id: string): Promise<void> {


}

export async function uploadAvatar(userId: string, file: any): Promise<string> {





  return '';
}

export async function uploadCV(userId: string, file: any): Promise<{ url: string; filename: string }> {





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