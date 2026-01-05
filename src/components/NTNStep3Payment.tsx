import { Check, ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface NTNStep3PaymentProps {
    onComplete: () => void;
    onBack: () => void;
    selectedPurpose: { type: string; amount: number; title: string };
}

export default function NTNStep3Payment({
    onComplete,
    onBack,
    selectedPurpose,
}: NTNStep3PaymentProps) {

    // VALIDATION REMOVED: Submit always allowed

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass-card p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden bg-white/40 backdrop-blur-xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-pak-green-950 mb-3 uppercase tracking-tight">
                        Review & Submit
                    </h2>
                    <p className="text-gray-400 font-bold text-sm tracking-wide uppercase mb-6">
                        Review your application details before submission
                    </p>
                </div>

                <div className="bg-white/50 rounded-[32px] p-8 border border-white/60 mb-12">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Registration Type</p>
                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">{selectedPurpose.title}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Total Fee</p>
                            <h3 className="text-xl font-black text-pak-green-600 uppercase tracking-tight">Rs {selectedPurpose.amount.toLocaleString()}</h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-pak-green-50/50 rounded-2xl border border-pak-green-100/50">
                        <div className="w-10 h-10 bg-pak-green-100 rounded-xl flex items-center justify-center text-pak-green-600">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-pak-green-900 uppercase tracking-wide">Secure Submission</p>
                            <p className="text-[10px] font-medium text-pak-green-700/70">Your data is encrypted and sent directly to FBR</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-pak-green-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Previous Step
                    </button>

                    <button
                        onClick={onComplete}
                        className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                    >
                        Submit Application
                        <Check className="w-5 h-5 text-pak-green-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}
