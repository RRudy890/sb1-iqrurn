import { supabase } from '../supabase';
import type { ApplicationData } from '../types/application';
import { validateSubmissionCooldown } from './submission';

export const submitApplication = async (data: ApplicationData): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in to submit an application');
  }

  const canSubmit = await validateSubmissionCooldown(user.id);
  if (!canSubmit) {
    throw new Error('You can only submit one application every 60 days');
  }

  const { error } = await supabase
    .from('applications')
    .insert({
      ...data,
      user_id: user.id
    });

  if (error) throw error;
};