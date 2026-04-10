import { View, Text, ScrollView } from 'react-native';
import { contentStyles as styles } from '../styles/JobDetailContent.styles';
import type { JobDetail, JobDetailTab } from '../types/job-detail.types';

interface JobDetailContentProps {
  job: JobDetail;
  activeTab: JobDetailTab;
}

// Reusable label + value row
function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function TabContent({ job, activeTab }: { job: JobDetail; activeTab: JobDetailTab }) {
  switch (activeTab) {
    case 'Overview':
      return (
        <>
          <InfoRow label="Business name"                value={job.overview?.business_name} />
          <InfoRow label="Company website"              value={job.overview?.company_website} />
          <InfoRow label="Job Type"                     value={job.overview?.job_type} />
          <InfoRow label="Eligible residence status"    value={job.overview?.eligible_residence_status} />
          <InfoRow label="Number of people recruiting"  value={job.overview?.number_of_people} />
          <InfoRow label="Recruitment range (nationality)" value={job.overview?.recruitment_range_nationality} />
          <InfoRow label="Foreigner Acceptance Status"  value={job.overview?.foreigner_acceptance_status} />
        </>
      );

    case 'Job Description':
      return (
        <Text style={styles.bodyText}>{job.job_description ?? '—'}</Text>
      );

    case 'Working Conditions':
      return (
        <>
          <InfoRow label="Working hours"   value={job.working_conditions?.working_hours} />
          <InfoRow label="Days off"        value={job.working_conditions?.days_off} />
          <InfoRow label="Overtime"        value={job.working_conditions?.overtime} />
          <InfoRow label="Trial period"    value={job.working_conditions?.trial_period} />
          <InfoRow label="Employment type" value={job.working_conditions?.employment_type} />
          <InfoRow label="Insurance"       value={job.working_conditions?.insurance} />
        </>
      );

    case 'Housing and Living Support':
      return (
        <>
          <InfoRow label="Moving support"          value={job.housing_support?.moving_support} />
          <InfoRow label="Dormitory"               value={job.housing_support?.dormitory} />
          <InfoRow label="Dormitory fees"          value={job.housing_support?.dormitory_fees} />
          <InfoRow label="Furniture and appliances" value={job.housing_support?.furniture_and_appliances} />
        </>
      );

    case 'Application Conditions':
      return (
        <>
          <InfoRow label="Japanese level" value={job.application_conditions?.japanese_level} />
          <InfoRow label="Experience"     value={job.application_conditions?.experience} />
          <InfoRow label="Age"            value={job.application_conditions?.age} />
          <InfoRow label="Visa types"     value={job.application_conditions?.visa_types} />
        </>
      );

    case 'Selection Process':
      return (
        <Text style={styles.bodyText}>{job.selection_process ?? '—'}</Text>
      );

    case 'Others':
      return (
        <Text style={styles.bodyText}>{job.others ?? '—'}</Text>
      );

    default:
      return null;
  }
}

export function JobDetailContent({ job, activeTab }: JobDetailContentProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <TabContent job={job} activeTab={activeTab} />
    </ScrollView>
  );
}