import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building } from 'lucide-react';
import { IRISSalaryDetails } from '../types/iris';

interface IRISStep2SalaryInfoProps {
  onContinue: (data: Partial<IRISSalaryDetails>) => void;
  onBack: () => void;
  initialData: Partial<IRISSalaryDetails>;
  selectedType: 'salary' | 'business';
  amount: number;
}

export default function IRISStep2SalaryInfo({
  onContinue,
  onBack,
  initialData,
  selectedType,
  amount,
}: IRISStep2SalaryInfoProps) {
  const [formData, setFormData] = useState<Partial<IRISSalaryDetails>>({
    employer_name: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof IRISSalaryDetails, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employer_name) {
      newErrors.employer_name = 'Employer name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onContinue(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Employment Info</h2>
          <p className="text-slate-600 text-lg mb-4">
            Enter your employment information
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Employer Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={formData.employer_name}
                onChange={e => handleInputChange('employer_name', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.employer_name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                }`}
                placeholder="Enter company name where you are working"
              />
            </div>
            {errors.employer_name && (
              <p className="text-red-500 text-sm mt-1">{errors.employer_name}</p>
            )}
            <p className="text-slate-500 text-sm mt-2">
              Company name where you are currently employed
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={onBack}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Submit
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
