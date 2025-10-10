import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { IRISAdditionalInfo } from '../types/iris';

interface IRISStep3AdditionalInfoProps {
  onContinue: (data: Partial<IRISAdditionalInfo>) => void;
  onBack: () => void;
  initialData: Partial<IRISAdditionalInfo>;
}

export default function IRISStep3AdditionalInfo({
  onContinue,
  onBack,
  initialData,
}: IRISStep3AdditionalInfoProps) {
  const [employerName, setEmployerName] = useState(initialData.employer_name || '');

  const handleSubmit = () => {
    onContinue({ employer_name: employerName });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Additional Information</h2>
          <p className="text-slate-600 text-lg">
            Help us understand your complete financial profile
          </p>
        </div>

        <div className="mb-8">
          <div className="border-2 border-slate-200 rounded-2xl p-6 bg-white hover:border-emerald-300 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-7 h-7 text-emerald-600" />
              </div>

              <div className="flex-1">
                <label className="block text-xl font-bold text-slate-900 mb-1">
                  Employer Name
                </label>
                <p className="text-slate-600 text-sm mb-4">
                  Enter the name of your employer
                </p>
                <input
                  type="text"
                  value={employerName}
                  onChange={e => setEmployerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-slate-900"
                  placeholder="e.g., ABC Corporation Pvt Ltd"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Note:</span> This information helps us
            provide accurate tax calculations and compliance recommendations. All information is
            kept confidential and secure.
          </p>
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
            disabled={!employerName.trim()}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Submit & Continue to Payment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
