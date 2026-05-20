import { View } from 'react-native';
import { Typography, ScrollView } from '@/components';
import { contentStyles as styles } from '../../styles/JobDetailContent.styles';
import type { JobDetail, JobDetailTab } from '../../types/job-detail.types';

interface JobDetailContentProps {
  job: JobDetail;
  activeTab: JobDetailTab;
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Typography variant="label" style={styles.infoLabel}>{label}</Typography>
      <Typography variant="body" style={styles.infoValue}>{value}</Typography>
    </View>
  );
}

function EmptyTab() {
  return (
    <Typography variant="body" style={styles.emptyText}>
      No information available.
    </Typography>
  );
}

function TabContent({ job, activeTab }: { job: JobDetail; activeTab: JobDetailTab }) {
  switch (activeTab) {
    case 'Overview': {
      const ov = job.overview;
      const hasData =
        ov?.business_name ||
        ov?.company_website ||
        ov?.job_type ||
        ov?.eligible_residence_status ||
        ov?.number_of_people ||
        ov?.recruitment_range_nationality ||
        ov?.foreigner_acceptance_status;

      if (!hasData) return <EmptyTab />;
      return (
        <>
          <InfoRow label="Business name" value={ov?.business_name} />
          <InfoRow label="Company website" value={ov?.company_website} />
          <InfoRow label="Job Type" value={ov?.job_type} />
          <InfoRow label="Eligible residence status" value={ov?.eligible_residence_status} />
          <InfoRow label="Number of people recruiting" value={ov?.number_of_people} />
          <InfoRow label="Recruitment range (nationality)" value={ov?.recruitment_range_nationality} />
          <InfoRow label="Foreigner Acceptance Status" value={ov?.foreigner_acceptance_status} />
        </>
      );
    }

    case 'Job Description':
      if (!job.job_description) return <EmptyTab />;
      return (
        <Typography variant="body" style={styles.bodyText}>
          {job.job_description}
        </Typography>
      );

    case 'Working Conditions': {
      const wc = job.working_conditions;
      const hasData =
        wc?.working_hours ||
        wc?.days_off ||
        wc?.overtime ||
        wc?.trial_period ||
        wc?.employment_type ||
        wc?.insurance;

      if (!hasData) return <EmptyTab />;
      return (
        <>
          <InfoRow label="Working hours" value={wc?.working_hours} />
          <InfoRow label="Days off" value={wc?.days_off} />
          <InfoRow label="Overtime" value={wc?.overtime} />
          <InfoRow label="Trial period" value={wc?.trial_period} />
          <InfoRow label="Employment type" value={wc?.employment_type} />
          <InfoRow label="Insurance" value={wc?.insurance} />
        </>
      );
    }

    case 'Housing and Living Support': {
      const hs = job.housing_support;
      const hasData =
        hs?.moving_support ||
        hs?.dormitory ||
        hs?.dormitory_fees ||
        hs?.furniture_and_appliances;

      if (!hasData) return <EmptyTab />;
      return (
        <>
          <InfoRow label="Moving support" value={hs?.moving_support} />
          <InfoRow label="Dormitory" value={hs?.dormitory} />
          <InfoRow label="Dormitory fees" value={hs?.dormitory_fees} />
          <InfoRow label="Furniture and appliances" value={hs?.furniture_and_appliances} />
        </>
      );
    }

    case 'Application Conditions': {
      const ac = job.application_conditions;
      const hasData =
        ac?.japanese_level ||
        ac?.experience ||
        ac?.age ||
        ac?.visa_types;

      if (!hasData) return <EmptyTab />;
      return (
        <>
          <InfoRow label="Japanese level" value={ac?.japanese_level} />
          <InfoRow label="Experience" value={ac?.experience} />
          <InfoRow label="Age" value={ac?.age} />
          <InfoRow label="Visa types" value={ac?.visa_types} />
        </>
      );
    }

    case 'Selection Process':
      if (!job.selection_process) return <EmptyTab />;
      return (
        <Typography variant="body" style={styles.bodyText}>
          {job.selection_process}
        </Typography>
      );

    case 'Others':
      if (!job.others) return <EmptyTab />;
      return (
        <Typography variant="body" style={styles.bodyText}>
          {job.others}
        </Typography>
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
    >
      <TabContent job={job} activeTab={activeTab} />
    </ScrollView>
  );
}