import { supabase } from './supabase';
import {
  IRISSubmission,
  IRISSalaryDetails,
  IRISAdditionalInfo,
  IRISBusinessDetails,
  IRISFormData,
} from '../types/iris';

export async function createIRISSubmission(formData: IRISFormData, userId: string) {
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (profileError) {
    throw new Error('Failed to verify user profile: ' + profileError.message);
  }

  if (!profile) {
    const { error: createProfileError } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        account_status: 'active',
      });

    if (createProfileError) {
      throw new Error('Failed to create user profile: ' + createProfileError.message);
    }
  }

  const referenceNumber = `IRIS-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const submissionData: Partial<IRISSubmission> = {
    user_id: userId,
    reference_number: referenceNumber,
    submission_type: formData.purposeType!,
    status: 'pending',
    payment_status: 'unpaid',
    amount: formData.amount,
    completion_time: formData.completionTime,
    submitted_at: new Date().toISOString(),
  };

  const { data: submission, error: submissionError } = await supabase
    .from('iris_submissions')
    .insert(submissionData)
    .select()
    .maybeSingle();

  if (submissionError || !submission) {
    throw new Error(submissionError?.message || 'Failed to create submission');
  }

  if (formData.purposeType === 'salary') {
    const salaryData: Partial<IRISSalaryDetails> = {
      submission_id: submission.id,
      ...formData.salaryDetails,
    };

    const { error: salaryError } = await supabase
      .from('iris_salary_details')
      .insert(salaryData);

    if (salaryError) {
      throw new Error(salaryError.message);
    }

    const additionalInfoData = {
      submission_id: submission.id,
      property_ownership: formData.additionalInfo.has_property || false,
      property_details: formData.additionalInfo.property_details || '',
      vehicle_ownership: formData.additionalInfo.has_vehicle || false,
      vehicle_details: formData.additionalInfo.vehicle_details || '',
      other_income: formData.additionalInfo.has_other_income || false,
      other_income_details: formData.additionalInfo.other_income_details || '',
    };

    const { error: additionalError } = await supabase
      .from('iris_additional_info')
      .insert(additionalInfoData);

    if (additionalError) {
      throw new Error(additionalError.message);
    }
  } else if (formData.purposeType === 'business') {
    const businessData = {
      submission_id: submission.id,
      businesses: formData.businessDetails.businesses,
    };

    const { error: businessError } = await supabase
      .from('iris_business_details')
      .insert(businessData);

    if (businessError) {
      throw new Error(businessError.message);
    }
  }

  return submission;
}

export async function getUserIRISSubmissions(): Promise<IRISSubmission[]> {
  const { data, error } = await supabase
    .from('iris_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getIRISSubmissionById(id: string) {
  const { data: submission, error: submissionError } = await supabase
    .from('iris_submissions')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (submissionError || !submission) {
    throw new Error(submissionError?.message || 'Submission not found');
  }

  if (submission.submission_type === 'salary') {
    const { data: salaryDetails } = await supabase
      .from('iris_salary_details')
      .select('*')
      .eq('submission_id', id)
      .maybeSingle();

    const { data: additionalInfo } = await supabase
      .from('iris_additional_info')
      .select('*')
      .eq('submission_id', id)
      .maybeSingle();

    return {
      submission,
      salaryDetails,
      additionalInfo,
    };
  } else {
    const { data: businessDetails } = await supabase
      .from('iris_business_details')
      .select('*')
      .eq('submission_id', id)
      .maybeSingle();

    return {
      submission,
      businessDetails: businessDetails
        ? {
            ...businessDetails,
            businesses: JSON.parse(businessDetails.businesses as string),
          }
        : null,
    };
  }
}

export async function updateIRISPaymentStatus(submissionId: string, status: 'paid') {
  const { error } = await supabase
    .from('iris_submissions')
    .update({
      payment_status: status,
      status: 'payment_verified',
    })
    .eq('id', submissionId);

  if (error) {
    throw new Error(error.message);
  }
}
