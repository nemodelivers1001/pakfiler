import { ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BusinessStep6StatusProps {
    onContinue: (status: string) => void;
    onBack: () => void;
}

export default function BusinessStep6Status({ onContinue, onBack }: BusinessStep6StatusProps) {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const statuses = [
        {
            id: 'all',
            title: 'All Clients Deducted Withholding Tax On My Payments',
            icon: Check,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-50'
        },
        {
            id: 'none',
            title: 'None Of My Clients Deducted Any Withholding Taxes On My Payments',
            icon: null, // Custom check/x icon or just check
            color: 'text-gray-500',
            bgColor: 'bg-gray-50'
        },
        {
            id: 'some',
            title: 'Not All But Some Clients Deducted Withholding Taxes On My Payments',
            icon: AlertCircle,
            color: 'text-orange-500',
            bgColor: 'bg-orange-50'
        }
    ];

    return (
        <div className="max-w-[1000px] mx-auto">
            <div className="text-left mb-10 pl-2">
                <h2 className="text-3xl font-black text-pak-green-950 mb-2 flex items-center gap-3">
                    Withholding Tax Status
                    <span className="text-gray-400 cursor-help transform hover:scale-110 transition-transform">
                        <AlertCircle className="w-5 h-5" />
                    </span>
                </h2>
                <p className="text-gray-500 font-medium">
                    Select which withholding tax scenario applies to your business income.
                </p>
            </div>

            <div className="space-y-6 mb-12">
                {statuses.map((status) => {
                    const isSelected = selectedStatus === status.id;

                    return (
                        <motion.div
                            key={status.id}
                            onClick={() => setSelectedStatus(status.id)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`cursor-pointer relative p-6 rounded-[24px] border-2 transition-all duration-300 flex items-center gap-6 ${isSelected
                                ? 'bg-white border-pak-green-500 shadow-xl shadow-pak-green-900/10'
                                : 'bg-white border-gray-100 hover:border-pak-green-200 hover:shadow-lg'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-pak-green-500' : 'border-gray-200'}`}>
                                {isSelected && <div className="w-4 h-4 rounded-full bg-pak-green-500" />}
                            </div>

                            <div className="flex items-center gap-4 flex-1">
                                {/* Icon logic mimicking screenshot - check/check, check/x, check/! */}
                                <div className="flex items-center">
                                    {status.id === 'all' && (
                                        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">
                                            <Check className="w-5 h-5" strokeWidth={3} />
                                        </div>
                                    )}
                                    {status.id === 'none' && (
                                        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500 opacity-60">
                                            <span className="text-xs font-black">X</span> {/* Just stylistic check/x */}
                                        </div>
                                    )}
                                    {status.id === 'some' && (
                                        <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-500">
                                            <span className="text-lg font-black">!</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-sm sm:text-lg font-bold text-pak-green-950">{status.title}</h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-gray-200/50">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-pak-green-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <button
                    onClick={() => onContinue(selectedStatus || 'all')}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Continue
                    <ArrowRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
