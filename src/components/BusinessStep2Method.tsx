import { Laptop, Upload, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BusinessStep2MethodProps {
    onContinue: (method: string) => void;
    onBack: () => void;
}

export default function BusinessStep2Method({ onContinue, onBack }: BusinessStep2MethodProps) {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const methods = [
        {
            id: 'online',
            title: 'Online Filing',
            description: 'Enter your business financial details manually through our guided form. Best for small businesses with simple financial records.',
            icon: Laptop,
            features: [
                'Guided step-by-step process',
                'Built-in validation and checks',
                'Automatic calculations',
                'Real-time progress tracking'
            ]
        },
        {
            id: 'upload',
            title: 'Upload Documents',
            description: 'Upload financial statements, receipts, and other tax documents. Our system will extract the necessary information. Best for businesses with complex structures.',
            icon: Upload,
            features: [
                'Quick and simple process',
                'Upload all documents at once',
                'Expert review by our team',
                'Less form filling required'
            ]
        }
    ];

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-pak-green-950 mb-3 uppercase tracking-tight">
                    Choose Filing Method
                </h2>
                <p className="text-gray-400 font-bold text-sm tracking-wide uppercase">
                    Select how you would like to file your business tax return
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {methods.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    const Icon = method.icon;

                    return (
                        <motion.div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`cursor-pointer relative p-10 rounded-[40px] border-2 transition-all duration-300 flex flex-col items-center text-center ${isSelected
                                ? 'bg-white border-pak-green-500 shadow-2xl shadow-pak-green-900/10'
                                : 'bg-white/60 border-white hover:bg-white hover:border-pak-green-200'
                                }`}
                        >
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isSelected ? 'bg-pak-green-100 text-pak-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                <Icon className="w-10 h-10" />
                            </div>

                            <h3 className="text-2xl font-black text-pak-green-950 mb-4">{method.title}</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 max-w-sm">
                                {method.description}
                            </p>

                            <div className="space-y-3 w-full max-w-xs text-left">
                                {method.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-pak-green-500' : 'bg-pak-green-300'}`} />
                                        <span className={`text-xs font-bold ${isSelected ? 'text-pak-green-800' : 'text-gray-500'}`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-6 right-6 w-8 h-8 bg-pak-green-500 rounded-full flex items-center justify-center shadow-lg"
                                >
                                    <Check className="w-5 h-5 text-white" />
                                </motion.div>
                            )}
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
                    Back to Overview
                </button>

                <button
                    onClick={() => onContinue(selectedMethod || 'online')}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Continue
                    <ArrowRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
