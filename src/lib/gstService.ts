import { supabase } from './supabase';
import { GSTApplication, BusinessInformationData } from '../types/gst';

export const createGSTApplication = async (data: BusinessInformationData): Promise<GSTApplication> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: refNumber } = await supabase.rpc('generate_reference_number');

  const applicationData = {
    user_id: user.id,
    reference_number: refNumber,
    ...data,
    submitted_at: new Date().toISOString(),
  };

  const { data: application, error } = await supabase
    .from('gst_applications')
    .insert([applicationData])
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from('application_timeline')
    .insert([{
      application_id: application.id,
      status: 'pending_payment',
      notes: 'Application submitted',
    }]);

  return application;
};

export const updateGSTApplication = async (
  applicationId: string,
  data: Partial<BusinessInformationData>
): Promise<GSTApplication> => {
  const { data: application, error } = await supabase
    .from('gst_applications')
    .update(data)
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;
  return application;
};

export const getGSTApplication = async (applicationId: string): Promise<GSTApplication | null> => {
  const { data, error } = await supabase
    .from('gst_applications')
    .select('*')
    .eq('id', applicationId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getUserApplications = async (): Promise<GSTApplication[]> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('gst_applications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
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
  const { error } = await supabase
    .from('gst_applications')
    .update(paymentData)
    .eq('id', applicationId);

  if (error) throw error;

  await supabase
    .from('application_timeline')
    .insert([{
      application_id: applicationId,
      status: paymentData.status || 'payment_verified',
      notes: `Payment ${paymentData.payment_status} via ${paymentData.payment_method}`,
    }]);
};

export const getApplicationTimeline = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('application_timeline')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const uploadDocument = async (
  applicationId: string,
  documentType: string,
  file: File
): Promise<void> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${applicationId}/${documentType}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('gst-documents')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('gst-documents')
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase
    .from('application_documents')
    .insert([{
      application_id: applicationId,
      document_type: documentType,
      file_name: file.name,
      file_url: publicUrl,
      file_size: file.size,
    }]);

  if (dbError) throw dbError;
};

export const getApplicationDocuments = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('application_documents')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const deleteDocument = async (documentId: string): Promise<void> => {
  const { error } = await supabase
    .from('application_documents')
    .delete()
    .eq('id', documentId);

  if (error) throw error;
};
