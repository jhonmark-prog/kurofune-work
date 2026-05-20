import { BASE_URL } from '@/utils/services';
import type { Application, ApplicationCreateData } from '../types/applications.types';

interface ApplicationsResponse {
  error: string | null;
  applications: Application[];
}

interface ApplicationCreateResponse {
  error: string | null;
  application: Application | null;
}

/**
 * Fetches all applications for the current user
 */
export const fetchApplications = async (accessToken: string): Promise<ApplicationsResponse> => {
  const endpoint = `https://${BASE_URL}/api/v1/applications`;
  const result: ApplicationsResponse = { error: null, applications: [] };

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`request failed: ${response.status}`);
    }

    const data = await response.json();
    result.applications = data.data || [];
  } catch (error: unknown) {
    if (error instanceof Error) result.error = error.message;
    else if (typeof error === 'string') result.error = error;
    else result.error = 'unknown error occurred.';
  }

  return result;
};

/**
 * Creates a new job application
 */
export const createApplication = async (
  applicationData: ApplicationCreateData,
  accessToken: string
): Promise<ApplicationCreateResponse> => {
  const endpoint = `https://${BASE_URL}/api/v1/applications`;
  const result: ApplicationCreateResponse = { error: null, application: null };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error(`request failed: ${response.status}`);
    }

    const data = await response.json();
    result.application = data.data || null;
  } catch (error: unknown) {
    if (error instanceof Error) result.error = error.message;
    else if (typeof error === 'string') result.error = error;
    else result.error = 'unknown error occurred.';
  }

  return result;
};
