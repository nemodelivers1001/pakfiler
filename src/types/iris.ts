export interface IRISSubmission {
  id?: string;
  user_id: string;
  submission_type: 'salary' | 'business';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  payment_status: 'unpaid' | 'paid';
  amount: number;
  completion_time: string;
  created_at?: string;
  updated_at?: string;
}

export interface IRISSalaryDetails {
  id?: string;
  submission_id: string;
  email: string;
  mobile: string;
  present_address: string;
  fbr_iris_registration_id: string;
  fbr_iris_pin: string;
  fbr_iris_password: string;
  bank_name: string;
  iban: string;
  employer_name?: string;
  monthly_salary?: number;
  tax_deducted?: number;
  created_at?: string;
}

export interface IRISAdditionalInfo {
  id?: string;
  submission_id: string;
  has_property: boolean;
  property_details?: string;
  has_vehicle: boolean;
  vehicle_details?: string;
  has_other_income: boolean;
  other_income_details?: string;
  created_at?: string;
}

export interface IRISFormData {
  purposeType: 'salary' | 'business' | null;
  amount: number;
  completionTime: string;
  salaryDetails: Partial<IRISSalaryDetails>;
  additionalInfo: Partial<IRISAdditionalInfo>;
}
