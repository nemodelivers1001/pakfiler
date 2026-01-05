import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check } from 'lucide-react';
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

  // VALIDATION REMOVED: Submit is always allowed
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({ employer_name: employerName });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden bg-white/40 backdrop-blur-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-pak-green-950 mb-3 uppercase tracking-tight">
            Employer Details
          </h2>
          <p className="text-gray-400 font-bold text-sm tracking-wide uppercase mb-8">
            Please provide the name of your current employer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-12">
          <div className="relative group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
              Employer / Organization Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
              <input
                type="text"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold"
                placeholder="e.g. State Bank of Pakistan"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={onBack}
              className="group flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-pak-green-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Previous Step
            </button>

            <button
              type="submit"
              className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
            >
              Submit Application
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
