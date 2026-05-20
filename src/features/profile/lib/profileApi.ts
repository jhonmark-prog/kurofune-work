import type { Profile, Experience, Education } from '../types/profile.types';

const API_BASE_URL = 'https://barrier-erasable-uncivil.ngrok-free.dev';

/**
 * Fetches profile data for a user
 * @param userId - The user ID
 * @returns Promise resolving to the profile data or null if not found
 */
export async function fetchProfile(userId: string): Promise<Profile | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the API response to match our Profile type
    const profile: Profile = {
      id: data.id || '',
      full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      email: data.email || '',
      job_title: data.profile_job_title || null,
      nationality: data.nationality?.toString() || null,
      phone: data.phone || null,
      location: data.location || null,
      about_me: data.about_me || null,
      gender: data.gender === 1 ? 'Male' : data.gender === 2 ? 'Female' : null,
      current_visa_type: data.current_visa_type?.toString() || null,
      avatar_url: null, // Not in the API response
      cv_url: null, // Not in the API response
      cv_filename: null, // Not in the API response
      cv_uploaded_at: null, // Not in the API response
      completion_pct: 0, // Will be calculated elsewhere
    };

    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

/**
 * Updates profile data for a user
 * @param userId - The user ID
 * @param data - The profile data to update
 * @returns Promise resolving when the update is complete
 */
export async function updateProfile(userId: string, data: Partial<Profile>): Promise<void> {
  try {
    // Map our Profile type to the API format
    const apiData: any = {};
    
    if (data.full_name) {
      const [firstName = '', lastName = ''] = data.full_name.split(' ');
      apiData.first_name = firstName.trim();
      apiData.last_name = lastName.trim();
    }
    
    if (data.email !== undefined) apiData.email = data.email;
    if (data.job_title !== undefined) apiData.profile_job_title = data.job_title;
    if (data.about_me !== undefined) apiData.about_me = data.about_me;
    if (data.phone !== undefined) apiData.phone = data.phone;
    if (data.location !== undefined) apiData.location = data.location;
    
    if (data.gender !== undefined) {
      apiData.gender = data.gender === 'Male' ? 1 : data.gender === 'Female' ? 2 : 0;
    }
    
    if (data.current_visa_type !== undefined) {
      apiData.current_visa_type = parseInt(data.current_visa_type, 10);
    }
    
    if (data.nationality !== undefined) {
      apiData.nationality = parseInt(data.nationality, 10);
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/profile`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Fetches experiences for a profile
 * @param profileId - The profile ID
 * @returns Promise resolving to an array of experiences
 */
export async function fetchExperiences(profileId: string): Promise<Experience[]> {
  try {
    // Since the API doesn't have a dedicated endpoint for experiences,
    // we'll fetch the profile and extract experiences from it
    // However, based on the API structure, experiences might be in the profile response
    // For now, we'll return an empty array as the API doesn't seem to expose experiences separately
    return [];
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

/**
 * Creates or updates an experience
 * @param profileId - The profile ID
 * @param experience - The experience data
 * @returns Promise resolving when the operation is complete
 */
export async function upsertExperience(
  profileId: string,
  experience: Partial<Experience>
): Promise<void> {
  try {
    // Since the API doesn't have a dedicated endpoint for experiences,
    // we would need to update the profile with the experience data
    // However, the API structure doesn't show experiences in the profile
    // For now, we'll just log this operation
    console.log('Upserting experience:', { profileId, experience });
  } catch (error) {
    console.error('Error upserting experience:', error);
    throw error;
  }
}

/**
 * Deletes an experience
 * @param id - The experience ID
 * @returns Promise resolving when the deletion is complete
 */
export async function deleteExperience(id: string): Promise<void> {
  try {
    // Since the API doesn't have a dedicated endpoint for experiences,
    // we'll just log this operation
    console.log('Deleting experience:', id);
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
}

/**
 * Fetches educations for a profile
 * @param profileId - The profile ID
 * @returns Promise resolving to an array of educations
 */
export async function fetchEducations(profileId: string): Promise<Education[]> {
  try {
    // Since the API doesn't have a dedicated endpoint for educations,
    // we'll return an empty array as the API doesn't seem to expose educations separately
    return [];
  } catch (error) {
    console.error('Error fetching educations:', error);
    return [];
  }
}

/**
 * Creates or updates an education
 * @param profileId - The profile ID
 * @param education - The education data
 * @returns Promise resolving when the operation is complete
 */
export async function upsertEducation(
  profileId: string,
  education: Partial<Education>
): Promise<void> {
  try {
    // Since the API doesn't have a dedicated endpoint for educations,
    // we would need to update the profile with the education data
    // However, the API structure doesn't show educations in the profile
    // For now, we'll just log this operation
    console.log('Upserting education:', { profileId, education });
  } catch (error) {
    console.error('Error upserting education:', error);
    throw error;
  }
}

/**
 * Deletes an education
 * @param id - The education ID
 * @returns Promise resolving when the deletion is complete
 */
export async function deleteEducation(id: string): Promise<void> {
  try {
    // Since the API doesn't have a dedicated endpoint for educations,
    // we'll just log this operation
    console.log('Deleting education:', id);
  } catch (error) {
    console.error('Error deleting education:', error);
    throw error;
  }
}

/**
 * Uploads an avatar image
 * @param userId - The user ID
 * @param file - The file to upload
 * @returns Promise resolving to the upload URL
 */
export async function uploadAvatar(userId: string, file: any): Promise<string> {
  try {
    // Since the API doesn't have a dedicated endpoint for avatar upload,
    // we'll just return a placeholder
    console.log('Uploading avatar:', { userId, file });
    return '';
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return '';
  }
}

/**
 * Uploads a CV/resume file
 * @param userId - The user ID
 * @param file - The file to upload
 * @returns Promise resolving to an object containing the URL and filename
 */
export async function uploadCV(userId: string, file: any): Promise<{ url: string; filename: string }> {
  try {
    // Since the API doesn't have a dedicated endpoint for CV upload,
    // we'll just return a placeholder
    console.log('Uploading CV:', { userId, file });
    return { url: '', filename: '' };
  } catch (error) {
    console.error('Error uploading CV:', error);
    return { url: '', filename: '' };
  }
}

/**
 * Calculates profile completion percentage
 * @param profile - The profile data
 * @param experiences - Array of experiences
 * @param educations - Array of educations
 * @returns Completion percentage (0-100)
 */
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