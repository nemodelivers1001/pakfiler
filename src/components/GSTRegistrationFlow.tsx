import { useState, useEffect } from 'react';
import GSTRegistrationStep1 from './GSTRegistrationStep1';
import GSTRegistrationStep2 from './GSTRegistrationStep2';
import PaymentScreen from './PaymentScreen';
import { BusinessInformationData, GSTApplication } from '../types/gst';
import { createGSTApplication, updateGSTApplication, updateApplicationPayment } from '../lib/gstService';

interface GSTRegistrationFlowProps {
  existingApplication?: GSTApplication | null;
  onComplete: () => void;
  onCancel: () => void;
}

type Step = 1 | 2 | 'payment';

export default function GSTRegistrationFlow({
  existingApplication,
  onComplete,
  onCancel,
}: GSTRegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [application, setApplication] = useState<GSTApplication | null>(existingApplication || null);
  const [businessData, setBusinessData] = useState<BusinessInformationData>({
    business_name: existingApplication?.business_name || '',
    business_type: existingApplication?.business_type || '',
    business_nature: existingApplication?.business_nature || '',
    start_date: existingApplication?.start_date || '',
    description: existingApplication?.description || '',
    consumer_number: existingApplication?.consumer_number || '',
    business_address: existingApplication?.business_address || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existingApplication && existingApplication.payment_status === 'pending') {
      setCurrentStep('payment');
    }
  }, [existingApplication]);

  const handleStep1Next = async (data: BusinessInformationData) => {
    setIsLoading(true);
    try {
      let app: GSTApplication;

      if (application) {
        app = await updateGSTApplication(application.id, data);
      } else {
        app = await createGSTApplication(data);
      }

      setApplication(app);
      setBusinessData(data);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error saving application:', error);
      alert('Failed to save application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Next = async () => {
    if (!application) return;

    setIsLoading(true);
    try {
      await updateGSTApplication(application.id, {
        submitted_at: new Date().toISOString(),
      });
      setCurrentStep('payment');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Back = () => {
    if (application) {
      setBusinessData({
        business_name: application.business_name,
        business_type: application.business_type,
        business_nature: application.business_nature,
        start_date: application.start_date,
        description: application.description,
        consumer_number: application.consumer_number,
        business_address: application.business_address,
      });
    }
    setCurrentStep(1);
  };

  const handlePaymentComplete = async () => {
    if (!application) return;

    setIsLoading(true);
    try {
      await updateApplicationPayment(application.id, {
        payment_status: 'completed',
        payment_method: 'card',
        payment_reference: `PAY-${Date.now()}`,
        status: 'payment_verified',
      });

      onComplete();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    onComplete();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Processing...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <GSTRegistrationStep1
        initialData={businessData}
        onNext={handleStep1Next}
        onCancel={onCancel}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <GSTRegistrationStep2
        applicationId={application?.id || ''}
        onNext={handleStep2Next}
        onBack={handleStep2Back}
      />
    );
  }

  if (currentStep === 'payment' && application) {
    return (
      <PaymentScreen
        application={application}
        onPaymentComplete={handlePaymentComplete}
        onCancel={handlePaymentCancel}
      />
    );
  }

  return null;
}
