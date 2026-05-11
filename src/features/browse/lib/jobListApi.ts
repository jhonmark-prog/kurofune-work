export interface HubSpotJobProperties {
    company_name: string | null;
    hs_createdate: string;
    hs_lastmodifieddate: string;
    hs_object_id: string;
    industry: string | null;
    industry_category: string | null;
    job_name: string;
    work_place_area: string | null;
}

export interface HubSpotJob {
    id: string;
    properties: HubSpotJobProperties;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    url: string;
}

export interface HubSpotResponse {
    results: HubSpotJob[];
    paging: {
        next: {
            after: string;
            link: string;
        };
    };
}

/**
 * Fetches job list data from HubSpot webhook endpoint
 * Logs detailed information to console before and after API call
 */
export const fetchJobListAPI = async (): Promise<HubSpotResponse | null> => {
    const jobListEndpoint = `https://ab8c-139-135-77-110.ngrok-free.app/api/v1/hubspot/webhook`;

    console.log('========================================');
    console.log('JOB LIST API REQUEST (HUBSPOT WEBHOOK)');
    console.log('========================================');
    console.log('Endpoint:', jobListEndpoint);
    console.log('Method: GET');
    console.log('Timestamp:', new Date().toISOString());
    console.log('========================================');

    try {
        const response = await fetch(jobListEndpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        console.log('----------------------------------------');
        console.log('RESPONSE RECEIVED');
        console.log('----------------------------------------');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        console.log('OK:', response.ok);
        console.log('----------------------------------------');

        if (!response.ok) {
            const errorText = await response.text();
            console.log('ERROR RESPONSE BODY:');
            console.log(errorText);
            console.log('----------------------------------------');
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }

        const result: HubSpotResponse = await response.json();

        console.log('Response data structure:', Object.keys(result));
        console.log('Number of jobs retrieved:', result.results?.length || 0);

        if (result.results && result.results.length > 0) {
            console.log('Sample job item (first):');
            console.log(JSON.stringify(result.results[1], null, 2));
        }

        console.log('========================================');
        console.log('JOB LIST API SUCCESS');
        console.log('========================================');

        return result;

    } catch (error: unknown) {
        console.log('========================================');
        console.log('JOB LIST API ERROR');
        console.log('========================================');
        
        if (error instanceof Error) {
            console.log('Error name:', error.name);
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
        } else if (typeof error === 'string') {
            console.log('Error (string):', error);
        } else {
            console.log('Unknown error:', error);
        }
        
        console.log('========================================');
        return null;
    }
};