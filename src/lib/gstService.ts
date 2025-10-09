import { supabase } from './supabase';
import { GSTApplication, BusinessInformationData } from '../types/gst';

export const createGSTApplication = async (data: BusinessInformationData): Promise<GSTApplication> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error('Failed to verify user profile: ' + profileError.message);
  }

  if (!profile) {
    const { error: createProfileError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        account_status: 'active',
      });

    if (createProfileError) {
      throw new Error('Failed to create user profile: ' + createProfileError.message);
    }
  }

  const { data: refNumber } = await supabase.rpc('generate_reference_number');

  const applicationData = {
    user_id: user.id,
    reference_number: refNumber,
    ...data,
    status: 'draft',
    payment_status: 'pending',
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
      status: 'draft',
      notes: 'Application created',
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

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gst-documents')
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error(`Failed to upload document: ${uploadError.message}`);
  }

  const filePath = uploadData?.path || fileName;

  const { error: dbError } = await supabase
    .from('application_documents')
    .insert([{
      application_id: applicationId,
      document_type: documentType,
      file_name: file.name,
      file_url: filePath,
      file_size: file.size,
    }]);

  if (dbError) {
    console.error('Database error:', dbError);
    throw new Error(`Failed to save document record: ${dbError.message}`);
  }
};

export const getApplicationDocuments = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('application_documents')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const documentsWithUrls = await Promise.all(
    (data || []).map(async (doc) => {
      const { data: signedUrlData } = await supabase.storage
        .from('gst-documents')
        .createSignedUrl(doc.file_url, 3600);

      return {
        ...doc,
        file_url: signedUrlData?.signedUrl || doc.file_url,
      };
    })
  );

  return documentsWithUrls;
};

export const deleteDocument = async (documentId: string): Promise<void> => {
  const { data: doc, error: fetchError } = await supabase
    .from('application_documents')
    .select('file_url')
    .eq('id', documentId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  if (doc?.file_url) {
    const { error: storageError } = await supabase.storage
      .from('gst-documents')
      .remove([doc.file_url]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
    }
  }

  const { error } = await supabase
    .from('application_documents')
    .delete()
    .eq('id', documentId);

  if (error) throw error;
};
