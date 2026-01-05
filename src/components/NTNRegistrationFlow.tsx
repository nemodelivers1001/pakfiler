import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import NTNStep1Purpose from './NTNStep1Purpose';
import NTNStep2Documents from './NTNStep2Documents';
import NTNStep3Payment from './NTNStep3Payment';

interface NTNRegistrationFlowProps {
    onBack: () => void;
    onComplete: (amount: number) => void;
}

export default function NTNRegistrationFlow({ onBack, onComplete }: NTNRegistrationFlowProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPurpose, setSelectedPurpose] = useState<{ type: string; amount: number; title: string } | null>(null);

    const steps = [
        { number: 1, title: 'Purpose Selection' },
        { number: 2, title: 'Document Upload' },
        { number: 3, title: 'Submit Application' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            {/* Header */}
            <div className="mb-12">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-pak-green-brand hover:text-pak-green-800 transition-colors mb-6 font-bold uppercase tracking-wider text-xs"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-pak-green-950 mb-2 uppercase tracking-tight">NTN Registration</h1>
                        <p className="text-gray-400 font-bold text-sm tracking-wide uppercase">
                            Register for a National Tax Number with the Federal Board of Revenue
                        </p>
                    </div>
                </div>
            </div>

            {/* Premium Stepper */}
            <div className="flex items-center justify-center mb-16 px-4">
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-full shadow-lg shadow-pak-green-900/5 flex items-center gap-2">
                    {steps.map((step, index) => {
                        const isActive = step.number === currentStep;
                        const isCompleted = step.number < currentStep;

                        return (
                            <div key={step.number} className="flex items-center">
                                <div
                                    className={`relative px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-500 ${isActive
                                        ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white shadow-lg shadow-pak-green-900/20'
                                        : isCompleted
                                            ? 'bg-pak-green-50 text-pak-green-700'
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black
                        ${isActive ? 'bg-white text-pak-green-800' : isCompleted ? 'bg-pak-green-200 text-pak-green-700' : 'bg-gray-200 text-gray-500'}
                    `}>
                                        {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step.number}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'block' : 'hidden'}`}>{step.title}</span>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className={`w-12 h-[2px] mx-2 ${isCompleted ? 'bg-pak-green-200' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 1 && (
                        <NTNStep1Purpose
                            onContinue={(purpose) => {
                                setSelectedPurpose(purpose);
                                setCurrentStep(2);
                            }}
                        />
                    )}

                    {currentStep === 2 && selectedPurpose && (
                        <NTNStep2Documents
                            selectedPurpose={selectedPurpose}
                            onBack={() => setCurrentStep(1)}
                            onContinue={() => setCurrentStep(3)}
                        />
                    )}

                    {currentStep === 3 && selectedPurpose && (
                        <NTNStep3Payment
                            selectedPurpose={selectedPurpose}
                            onBack={() => setCurrentStep(2)}
                            onComplete={() => onComplete(selectedPurpose.amount)}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
