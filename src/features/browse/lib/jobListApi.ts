export interface HubSpotJobProperties {
    acceptance_status: string | null;
    average_workingdays: string | null;
    bonus: string | null;
    business_content: string | null;
    business_matching_kyujin: string | null;
    careworker_support: string | null;
    company_hp_url: string | null;
    company_name: string | null;
    dorm_imformation: string | null;
    drivers_license: string | null;
    furniture_support: string | null;
    genba_img: string | null;
    holiday: string | null;
    hs_all_accessible_team_ids: string | null;
    hs_all_assigned_business_unit_ids: string | null;
    hs_all_owner_ids: string | null;
    hs_all_team_ids: string | null;
    hs_created_by_user_id: string;
    hs_createdate: string;
    hs_lastmodifieddate: string;
    hs_merged_object_ids: string | null;
    hs_object_id: string;
    hs_object_source: string;
    hs_object_source_detail_1: string | null;
    hs_object_source_detail_2: string | null;
    hs_object_source_detail_3: string | null;
    hs_object_source_id: string;
    hs_object_source_label: string;
    hs_object_source_user_id: string;
    hs_owning_teams: string | null;
    hs_pinned_engagement_id: string | null;
    hs_read_only: string | null;
    hs_shared_team_ids: string | null;
    hs_shared_user_ids: string | null;
    hs_unique_creation_key: string;
    hs_updated_by_user_id: string;
    hs_user_ids_of_all_notification_followers: string | null;
    hs_user_ids_of_all_notification_unfollowers: string | null;
    hs_user_ids_of_all_owners: string | null;
    hs_was_imported: string;
    hubspot_owner_assigneddate: string | null;
    hubspot_owner_id: string | null;
    hubspot_team_id: string | null;
    industry: string | null;
    industry_category: string | null;
    japanese_level: string | null;
    job_name: string;
    kurofunework_url: string | null;
    kyougikai_status: string | null;
    kyuujinid: string | null;
    kyuujinkeisaikoushinchekku: string | null;
    kyuujinkoushinchekku: string | null;
    kyuujinshousaitsuuchizumi: string | null;
    number_recruit: string | null;
    occupation: string | null;
    office_name: string | null;
    overtime: string | null;
    pr: string | null;
    qualifi_exp: string | null;
    raise: string | null;
    recruit_date: string | null;
    recruit_range: string | null;
    recruit_ranges: string | null;
    remarks: string | null;
    required: string | null;
    ryo_img: string | null;
    salary: string | null;
    selection_process: string | null;
    social_insurance: string | null;
    status: string | null;
    status_: string | null;
    status_of_residence: string | null;
    submission_idempotent_id: string | null;
    support: string | null;
    work_place: string | null;
    work_place_area: string | null;
    workers_countries: string | null;
    working_hours: string | null;
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
    data: HubSpotJob[];
    total: number;
    from: number;
    to: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

/**
 * Fetches job list data from HubSpot webhook endpoint
 * @param params - Query parameters for pagination and search
 */
export const fetchJobListAPI = async (params: { 
    search?: string; 
    page?: number; 
    with_pagination?: string 
}): Promise<HubSpotResponse | null> => {
    // Build query string
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.with_pagination) queryParams.append('with_pagination', params.with_pagination);
    
    const jobListEndpoint = `https://barrier-erasable-uncivil.ngrok-free.dev/api/v1/hubspot/webhook${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    console.log('========================================');
    console.log('JOB LIST API REQUEST (HUBSPOT WEBHOOK)');
    console.log('========================================');
    console.log('Endpoint:', jobListEndpoint);
    console.log('Method: GET');
    console.log('Params:', params);
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

        const apiResult = await response.json();

        // Transform the API response to match our expected format
        // Check if the API returns pagination information
        const results = apiResult.results || apiResult.data || [];
        
        // Extract pagination info from API response, with fallbacks
        const total = apiResult.total || apiResult.total_count || results.length;
        const currentPage = apiResult.current_page || apiResult.page || 1;
        const perPage = apiResult.per_page || apiResult.perpage || results.length;
        const from = apiResult.from || ((currentPage - 1) * perPage + 1) || 1;
        const to = apiResult.to || (from + results.length - 1) || results.length;
        const lastPage = apiResult.last_page || Math.ceil(total / perPage) || 1;

        const result: HubSpotResponse = {
            data: results,
            total: total,
            from: from,
            to: to,
            current_page: currentPage,
            last_page: lastPage,
            per_page: perPage
        };

        console.log('Response data structure:', Object.keys(apiResult));
        console.log('Number of jobs retrieved:', result.data.length);

        if (result.data && result.data.length > 0) {
            console.log('Sample job item (first):');
            console.log(JSON.stringify(result.data[0], null, 2));
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