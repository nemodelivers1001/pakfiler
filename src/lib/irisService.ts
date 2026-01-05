import {
  IRISSubmission,
  IRISSalaryDetails,
  IRISAdditionalInfo,
  IRISBusinessDetails,
  IRISFormData,
} from '../types/iris';

const STORAGE_KEY_IRIS = 'pakfiler_mock_iris_submissions';

const getSubmissions = (): any[] => {
  const data = localStorage.getItem(STORAGE_KEY_IRIS);
  return data ? JSON.parse(data) : [];
};

const saveSubmissions = (subs: any[]) => {
  localStorage.setItem(STORAGE_KEY_IRIS, JSON.stringify(subs));
};

export async function createIRISSubmission(formData: IRISFormData, userId: string) {
  await new Promise(resolve => setTimeout(resolve, 500));

  const referenceNumber = `IRIS-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const submissionId = crypto.randomUUID();
  const submissionData = {
    id: submissionId,
    user_id: userId,
    reference_number: referenceNumber,
    submission_type: formData.purposeType!,
    status: 'pending',
    payment_status: 'unpaid',
    amount: formData.amount,
    completion_time: formData.completionTime,
    submitted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    // Store related data embedded for simplicity in mock
    salaryDetails: formData.purposeType === 'salary' ? {
      submission_id: submissionId,
      ...formData.salaryDetails
    } : undefined,
    additionalInfo: formData.purposeType === 'salary' ? {
      submission_id: submissionId,
      employer_name: formData.additionalInfo.employer_name || '',
      property_ownership: formData.additionalInfo.has_property || false,
      property_details: formData.additionalInfo.property_details || '',
      vehicle_ownership: formData.additionalInfo.has_vehicle || false,
      vehicle_details: formData.additionalInfo.vehicle_details || '',
      other_income: formData.additionalInfo.has_other_income || false,
      other_income_details: formData.additionalInfo.other_income_details || '',
    } : undefined,
    businessDetails: formData.purposeType === 'business' ? {
      submission_id: submissionId,
      businesses: formData.businessDetails.businesses
    } : undefined
  };

  const subs = getSubmissions();
  subs.push(submissionData);
  saveSubmissions(subs);

  return submissionData;
}

export async function getUserIRISSubmissions(): Promise<IRISSubmission[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const subs = getSubmissions();
  // Filter for current user mock if needed, but assuming single user context for simplicity often works or read from local storage
  const sessionStr = localStorage.getItem('pakfiler_mock_session');
  if (sessionStr) {
    const session = JSON.parse(sessionStr);
    return subs.filter(s => s.user_id === session.user.id);
  }
  return [];
}

export async function getIRISSubmissionById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const subs = getSubmissions();
  const submission = subs.find(s => s.id === id);

  if (!submission) {
    throw new Error('Submission not found');
  }

  if (submission.submission_type === 'salary') {
    return {
      submission,
      salaryDetails: submission.salaryDetails,
      additionalInfo: submission.additionalInfo,
    };
  } else {
    return {
      submission,
      businessDetails: submission.businessDetails,
    };
  }
}

export async function updateIRISPaymentStatus(submissionId: string, status: 'paid') {
  await new Promise(resolve => setTimeout(resolve, 300));
  const subs = getSubmissions();
  const index = subs.findIndex(s => s.id === submissionId);
  if (index !== -1) {
    subs[index].payment_status = status;
    subs[index].status = 'payment_verified';
    saveSubmissions(subs);
  }
}
