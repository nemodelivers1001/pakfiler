import { GSTApplication, BusinessInformationData } from '../types/gst';

const STORAGE_KEY_GST = 'pakfiler_mock_gst_applications';
const STORAGE_KEY_DOCS = 'pakfiler_mock_gst_documents';

// Helper to get all applications
const getApplications = (): GSTApplication[] => {
  const data = localStorage.getItem(STORAGE_KEY_GST);
  return data ? JSON.parse(data) : [];
};

// Helper to save applications
const saveApplications = (apps: GSTApplication[]) => {
  localStorage.setItem(STORAGE_KEY_GST, JSON.stringify(apps));
};

export const createGSTApplication = async (data: BusinessInformationData): Promise<GSTApplication> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get current user from storage (AuthContext handles the session storage)
  const sessionStr = localStorage.getItem('pakfiler_mock_session');
  if (!sessionStr) throw new Error('User not authenticated');
  const session = JSON.parse(sessionStr);
  const user = session.user;

  const refNumber = `GST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newApp: GSTApplication = {
    id: crypto.randomUUID(), // Use Web Crypto API or a simple random string
    user_id: user.id,
    reference_number: refNumber,
    ...data,
    status: 'draft',
    payment_status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const apps = getApplications();
  apps.push(newApp);
  saveApplications(apps);

  return newApp;
};

export const updateGSTApplication = async (
  applicationId: string,
  data: Partial<BusinessInformationData>
): Promise<GSTApplication> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const apps = getApplications();
  const index = apps.findIndex(app => app.id === applicationId);
  if (index === -1) throw new Error('Application not found');

  apps[index] = {
    ...apps[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  saveApplications(apps);
  return apps[index];
};

export const getGSTApplication = async (applicationId: string): Promise<GSTApplication | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const apps = getApplications();
  return apps.find(app => app.id === applicationId) || null;
};

export const getUserApplications = async (): Promise<GSTApplication[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const sessionStr = localStorage.getItem('pakfiler_mock_session');
  if (!sessionStr) throw new Error('User not authenticated');
  const session = JSON.parse(sessionStr);

  const apps = getApplications();
  return apps.filter(app => app.user_id === session.user.id);
};

export const updateApplicationPayment = async (
  applicationId: string,
  paymentData: {
    payment_status: 'completed' | 'failed';
    payment_method: string;
    payment_reference: string;
    status?: string;
  }
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const apps = getApplications();
  const index = apps.findIndex(app => app.id === applicationId);
  if (index === -1) throw new Error('Application not found');

  apps[index] = {
    ...apps[index],
    payment_status: paymentData.payment_status,
    status: paymentData.status || apps[index].status,
    updated_at: new Date().toISOString(),
  };

  saveApplications(apps);
};

export const getApplicationTimeline = async (applicationId: string) => {
  // Mock timeline
  return [
    {
      id: '1',
      application_id: applicationId,
      status: 'draft',
      notes: 'Application created',
      created_at: new Date().toISOString()
    }
  ];
};

export const uploadDocument = async (
  applicationId: string,
  documentType: string,
  file: File
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  // Create a fake URL for the file
  const fakeUrl = URL.createObjectURL(file);

  const docs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOCS) || '[]');
  docs.push({
    id: crypto.randomUUID(),
    application_id: applicationId,
    document_type: documentType,
    file_name: file.name,
    file_url: fakeUrl, // NOTE: This URL is only valid for the session, persistency is limited
    created_at: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(docs));
};

export const getApplicationDocuments = async (applicationId: string) => {
  const docs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOCS) || '[]');
  return docs.filter((d: any) => d.application_id === applicationId);
};

export const deleteDocument = async (documentId: string): Promise<void> => {
  const docs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOCS) || '[]');
  const newDocs = docs.filter((d: any) => d.id !== documentId);
  localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(newDocs));
};
