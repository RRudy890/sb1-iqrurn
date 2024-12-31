import { supabase } from '../supabase';

export interface SubmissionStatus {
  canSubmit: boolean;
  nextAllowedDate: Date | null;
  submissionCount: number;
  lastSubmission: Date | null;
}

export const getSubmissionStatus = async (userId: string): Promise<SubmissionStatus> => {
  const { data, error } = await supabase
    .from('submission_tracking')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No submissions yet
      return {
        canSubmit: true,
        nextAllowedDate: null,
        submissionCount: 0,
        lastSubmission: null
      };
    }
    throw error;
  }

  const now = new Date();
  const nextAllowed = data.next_allowed_submission ? new Date(data.next_allowed_submission) : null;

  return {
    canSubmit: !nextAllowed || now >= nextAllowed,
    nextAllowedDate: nextAllowed,
    submissionCount: data.submission_count,
    lastSubmission: data.last_submission ? new Date(data.last_submission) : null
  };
};

export const validateSubmissionCooldown = async (userId: string): Promise<boolean> => {
  const status = await getSubmissionStatus(userId);
  return status.canSubmit;
};