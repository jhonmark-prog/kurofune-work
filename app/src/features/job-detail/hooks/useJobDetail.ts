import { useState } from 'react';
import { DUMMY_JOB_DETAIL, JOB_DETAIL_TABS } from '../constants/jobDetailData';
import type { JobDetail, JobDetailTab } from '../types/job-detail.types';

export function useJobDetail(jobId: string) {
  // Replace with Supabase fetch when API is wired
  const [job, setJob] = useState<JobDetail>(DUMMY_JOB_DETAIL);
  const [activeTab, setActiveTab] = useState<JobDetailTab>('Overview');
  const [hasApplied, setHasApplied] = useState(false);

  function toggleSaved() {
    setJob((prev) => ({ ...prev, is_saved: !prev.is_saved }));
  }

  function applyForJob() {
    // Wire to Supabase applyForJob(jobId) when API is ready
    setHasApplied(true);
  }

  return {
    job,
    tabs: JOB_DETAIL_TABS,
    activeTab,
    setActiveTab,
    hasApplied,
    toggleSaved,
    applyForJob,
  };
}