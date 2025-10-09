import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import IRISStep1Purpose from './IRISStep1Purpose';
import IRISStep2SalaryInfo from './IRISStep2SalaryInfo';
import IRISStep3AdditionalInfo from './IRISStep3AdditionalInfo';
import { IRISFormData } from '../types/iris';

interface IRISProfileFlowProps {
  onBack: () => void;
  onComplete: (submissionId: string, amount: number) => void;
}

export default function IRISProfileFlow({ onBack, onComplete }: IRISProfileFlowProps) {
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

  const handleStep3Complete = async (additionalInfo: Partial<IRISFormData['additionalInfo']>) => {
    updateFormData({ additionalInfo });

    const submissionId = crypto.randomUUID();
    onComplete(submissionId, formData.amount);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">IRIS Profile Update</h1>
          <p className="text-slate-600 text-lg">
            Update your income details in the IRIS system for accurate tax calculation
          </p>
        </div>

        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <StepIndicator
              number={1}
              label="Purpose Selection"
              active={currentStep === 1}
              completed={currentStep > 1}
            />
            <StepConnector completed={currentStep > 1} />
            <StepIndicator
              number={2}
              label="Form Filling"
              active={currentStep === 2}
              completed={currentStep > 2}
            />
            <StepConnector completed={currentStep > 2} />
            <StepIndicator
              number={3}
              label="Additional Info"
              active={currentStep === 3}
              completed={currentStep > 3}
            />
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
          {currentStep === 3 && (
            <IRISStep3AdditionalInfo
              onContinue={handleStep3Complete}
              onBack={handleBack}
              initialData={formData.additionalInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ number, label, active, completed }: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
          completed
            ? 'bg-emerald-500 text-white scale-105 shadow-lg shadow-emerald-500/30'
            : active
            ? 'bg-emerald-500 text-white scale-110 shadow-xl shadow-emerald-500/40 ring-4 ring-emerald-100'
            : 'bg-white text-slate-400 border-2 border-slate-200'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span
        className={`text-sm font-medium whitespace-nowrap transition-colors ${
          active ? 'text-emerald-600' : completed ? 'text-emerald-500' : 'text-slate-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StepConnector({ completed }: { completed: boolean }) {
  return (
    <div className="w-24 h-0.5 relative">
      <div className="absolute inset-0 bg-slate-200" />
      <div
        className={`absolute inset-0 bg-emerald-500 transition-all duration-500 origin-left ${
          completed ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </div>
  );
}
