import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createIRISSubmission } from '../lib/irisService';
import { ArrowLeft } from 'lucide-react';
import IRISStep1Purpose from './IRISStep1Purpose';
import IRISStep2SalaryInfo from './IRISStep2SalaryInfo';
import IRISStep3AdditionalInfo from './IRISStep3AdditionalInfo';
import IRISStep3BusinessInfo from './IRISStep3BusinessInfo';
import { IRISFormData } from '../types/iris';

interface IRISProfileFlowProps {
  onBack: () => void;
  onComplete: (submissionId: string, amount: number) => void;
}

export default function IRISProfileFlow({ onBack, onComplete }: IRISProfileFlowProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IRISFormData>({
    purposeType: null,
    amount: 0,
    completionTime: '',
    salaryDetails: {},
    additionalInfo: {
      has_property: false,
      has_vehicle: false,
      has_other_income: false,
    },
    businessDetails: { businesses: [] },
  });

  const updateFormData = (data: Partial<IRISFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleStep1Complete = (type: 'salary' | 'business', amount: number, completionTime: string) => {
    updateFormData({ purposeType: type, amount, completionTime });
    setCurrentStep(2);
  };

  const handleStep2Complete = (salaryDetails: Partial<IRISFormData['salaryDetails']>) => {
    updateFormData({ salaryDetails });
    setCurrentStep(3);
  };

  const handleStep3Complete = async (data: any) => {
    let finalFormData: IRISFormData;

    if (formData.purposeType === 'salary') {
      finalFormData = { ...formData, additionalInfo: data };
    } else {
      finalFormData = { ...formData, businessDetails: data };
    }

    try {
      if (!user) throw new Error('User not authenticated');

      const submission = await createIRISSubmission(finalFormData, user.id);
      onComplete(submission.id!, formData.amount);
    } catch (error) {
      console.error('Error creating IRIS submission:', error);
      alert('Failed to create submission. Please try again.');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-pak-green-50/40 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8 relative z-10">
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-md transition-all mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-pak-green-600" />
          </div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] group-hover:text-pak-green-900 transition-colors">Back to Dashboard</span>
        </button>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black text-pak-green-950 mb-6 tracking-tight leading-[1.1]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pak-green-900 via-pak-green-700 to-pak-green-900 animate-gradient-x">
                IRIS Profile
              </span>
              Update
            </h1>
            <p className="text-lg font-bold text-gray-400 max-w-xl leading-relaxed">
              Seamlessly update your income details in the FBR IRIS system. Enhance your filing accuracy with our expedited process.
            </p>
          </div>

          {/* Premium Stepper */}
          <div className="w-full lg:w-auto">
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-[24px] shadow-2xl shadow-pak-green-900/5 inline-flex flex-col sm:flex-row gap-2">
              {[
                { id: 1, label: 'Purpose' },
                { id: 2, label: 'Details' },
                { id: 3, label: 'Review' }
              ].map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="relative flex items-center">
                    <div
                      className={`relative px-4 py-2 rounded-full flex items-center gap-3 transition-all duration-500 ${isActive
                        ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white shadow-lg shadow-pak-green-900/20'
                        : isCompleted
                          ? 'bg-pak-green-50 text-pak-green-700'
                          : 'text-gray-400 hover:bg-white/50'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${isActive ? 'bg-white/20 text-white' : isCompleted ? 'bg-pak-green-200 text-pak-green-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                        {step.id}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[2px] ${isActive ? 'block' : 'hidden'}`}>{step.label}</span>
                    </div>
                    {idx < 2 && (
                      <div className="hidden sm:block w-8 h-[2px] bg-gray-200 mx-2">
                        <div className={`h-full bg-pak-green-500 transition-all duration-500 ${isCompleted ? 'w-full' : 'w-0'}`}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          {currentStep === 1 && (
            <IRISStep1Purpose onContinue={handleStep1Complete} />
          )}
          {currentStep === 2 && (
            <IRISStep2SalaryInfo
              onContinue={handleStep2Complete}
              onBack={handleBack}
              initialData={formData.salaryDetails}
              selectedType={formData.purposeType!}
              amount={formData.amount}
            />
          )}
          {currentStep === 3 && formData.purposeType === 'salary' && (
            <IRISStep3AdditionalInfo
              onContinue={handleStep3Complete}
              onBack={handleBack}
              initialData={formData.additionalInfo}
            />
          )}
          {currentStep === 3 && formData.purposeType === 'business' && (
            <IRISStep3BusinessInfo
              onContinue={handleStep3Complete}
              onBack={handleBack}
              initialData={formData.businessDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}
