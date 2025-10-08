export interface GSTApplication {
  id: string;
  user_id: string;
  reference_number: string;
  status: 'pending_payment' | 'payment_verified' | 'processing' | 'completed' | 'rejected';
  business_name: string;
  business_type: string;
  business_nature: string;
  start_date: string;
  description: string | null;
  consumer_number: string | null;
  business_address: string;
  service_fee: number;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_method: string | null;
  payment_reference: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationDocument {
  id: string;
  application_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number | null;
  uploaded_at: string;
  created_at: string;
}

export interface ApplicationTimeline {
  id: string;
  application_id: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface BusinessInformationData {
  business_name: string;
  business_type: string;
  business_nature: string;
  start_date: string;
  description: string;
  consumer_number: string;
  business_address: string;
}

export const BUSINESS_TYPES = [
  'Proprietorship',
  'Partnership',
  'Company/NPO',
  'Limited Liability Partnership',
  'Public Limited Company',
];

export const BUSINESS_NATURES = [
  'Manufacturing',
  'Trading',
  'Services',
  'Retail',
  'Wholesale',
  'Import/Export',
  'Construction',
  'Technology',
  'Healthcare',
  'Education',
  'Other',
];

export const DOCUMENT_TYPES = [
  'Bank account maintenance certificates',
  'Article of association certificates',
  'Form A and 29 certificates',
  'Memorandum of association or partnership or trust deed certificates',
  'Partner or director or member authorization certificates',
  'Incorporation or partnership or trust registration certificates',
  'GPS tagged photographs of business',
  'Utility meter pictures',
  'GPS tagged photographs of utility installed',
  'GPS tagged photographs of industrial utility installed',
  'CNIC list',
  'Letter head',
  'Rent agreement or ownership documents list',
  'Latest paid utility bill',
];
