export interface IRISSubmission {
  id?: string;
  user_id: string;
  reference_number?: string;
  submission_type: 'salary' | 'business';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  payment_status: 'unpaid' | 'paid';
  amount: number;
  completion_time: string;
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IRISSalaryDetails {
  id?: string;
  submission_id: string;
  employer_name?: string;
  employer_ntn?: string;
  monthly_salary?: number;
  tax_deducted?: number;
  employment_start_date?: string;
  employment_type?: string;
  salary_account_bank?: string;
  created_at?: string;
  updated_at?: string;
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

export interface IRISBusiness {
  id: string;
  name: string;
  nature: string;
  electricityConsumerNo: string;
  commencementDate: string;
  address: string;
  bankAccounts: IRISBankAccount[];
}

export interface IRISBankAccount {
  id: string;
  bank: string;
  iban: string;
}

export interface IRISBusinessDetails {
  id?: string;
  submission_id: string;
  businesses: IRISBusiness[];
  created_at?: string;
}

export interface IRISFormData {
  purposeType: 'salary' | 'business' | null;
  amount: number;
  completionTime: string;
  salaryDetails: Partial<IRISSalaryDetails>;
  additionalInfo: Partial<IRISAdditionalInfo>;
  businessDetails: { businesses: IRISBusiness[] };
}
