import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, Building2, FileText, CreditCard } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';
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
  const isMobile = useMobile();

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
        description: application.description || '',
        consumer_number: application.consumer_number || '',
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
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, label: 'Business Info', icon: Building2 },
    { id: 2, label: 'Documents', icon: FileText },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const getStepStatus = (stepId: Step) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#effaf3]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pak-green-100/20 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation / Header */}
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onCancel}
              className="group flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-all text-gray-600 font-black text-xs uppercase tracking-[1px] hover:text-pak-green-700"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {isMobile ? 'Back' : 'Back to Dashboard'}
            </button>
            {!isMobile && (
              <div className="flex items-center gap-4 px-6 py-2.5 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-pak-green-900 uppercase tracking-[2px]">Step {steps.findIndex(s => s.id === currentStep) + 1} of 3</span>
              </div>
            )}
          </div>

          {/* One-Liner Stepper */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
              {steps.map((step, idx) => {
                const status = getStepStatus(step.id as Step);
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center gap-2 shrink-0">
                    <motion.div
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-500 ${status === 'active'
                        ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand border-pak-green-500/50 text-white shadow-lg shadow-pak-green-900/20'
                        : status === 'completed'
                          ? 'bg-pak-green-50 border-pak-green-100 text-pak-green-700'
                          : 'bg-white/50 border-white/60 text-gray-400 opacity-60'
                        }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${status === 'active' ? 'bg-pak-green-500 text-white' : status === 'completed' ? 'bg-pak-green-100 text-pak-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                        {status === 'completed' ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[1px] whitespace-nowrap ${status === 'active' ? 'block' : 'hidden'}`}>{step.label}</span>
                    </motion.div>
                    {idx < steps.length - 1 && (
                      <div className="w-8 h-[2px] bg-white/40 rounded-full mx-1 hidden sm:block"></div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Mobile Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#effaf3] to-transparent pointer-events-none sm:hidden"></div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[60vh] flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 border-4 border-pak-green-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-pak-green-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-pak-green-600" />
                </div>
              </div>
              <p className="mt-8 text-[11px] font-black text-pak-green-900 uppercase tracking-[4px] animate-pulse">Processing Request</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {currentStep === 1 && (
                <GSTRegistrationStep1
                  initialData={businessData}
                  onNext={handleStep1Next}
                  onCancel={onCancel}
                />
              )}
              {currentStep === 2 && (
                <GSTRegistrationStep2
                  applicationId={application?.id || ''}
                  onNext={handleStep2Next}
                  onBack={handleStep2Back}
                />
              )}
              {currentStep === 'payment' && application && (
                <PaymentScreen
                  application={application}
                  onPaymentComplete={handlePaymentComplete}
                  onCancel={onCancel}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
