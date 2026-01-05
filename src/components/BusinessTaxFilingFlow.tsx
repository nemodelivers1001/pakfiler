import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import BusinessStep1TaxYear from './BusinessStep1TaxYear';
import BusinessStep2Method from './BusinessStep2Method';
import BusinessStep3Structure from './BusinessStep3Structure';
import BusinessStep4Type from './BusinessStep4Type';
import BusinessStep5Info from './BusinessStep5Info';
import BusinessStep6Status from './BusinessStep6Status';
import BusinessStep7Financial from './BusinessStep7Financial';
import BusinessStep8Addon from './BusinessStep8Addon';
import BusinessStep9Summary from './BusinessStep9Summary';

interface BusinessTaxFilingFlowProps {
    onBack: () => void;
    onComplete: () => void;
}

export default function BusinessTaxFilingFlow({ onBack, onComplete }: BusinessTaxFilingFlowProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        taxYear: '',
        method: '',
        structure: null,
        type: '',
        info: null,
        withholdingStatus: '',
        financial: null,
        addon: null
    });

    const steps = [
        { number: 1, title: 'Tax Year' },
        { number: 2, title: 'Filing Method' },
        { number: 3, title: 'Legal Structure' },
        { number: 4, title: 'Business Type' },
        { number: 5, title: 'Business Info' },
        { number: 6, title: 'Withholding Status' },
        { number: 7, title: 'Financial Details' },
        { number: 8, title: 'Optional Add-on' }
    ];

    // For this demo, all 8 steps are active in stepper, Step 9 is implicit summary
    const activeSteps = steps;

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-pak-green-600 hover:text-pak-green-800 transition-colors mb-4 lg:mb-6 font-bold uppercase tracking-wider text-[10px] lg:text-xs"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-pak-green-950 mb-2 uppercase tracking-tight">Business Tax Filing</h1>
                        <p className="text-gray-400 font-bold text-xs sm:text-sm tracking-wide uppercase">
                            Select and file the appropriate tax services for your business
                        </p>
                    </div>
                </div>
            </div>

            {/* Premium Stepper */}
            {currentStep < 9 && (
                <div className="flex items-center justify-start lg:justify-center mb-8 lg:mb-16 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-full shadow-lg shadow-pak-green-900/5 flex items-center gap-2 min-w-max">
                        {activeSteps.map((step, index) => {
                            const isActive = step.number === currentStep;
                            const isCompleted = step.number < currentStep;

                            return (
                                <div key={step.number} className="flex items-center">
                                    <div
                                        className={`relative px-4 py-2 rounded-full flex items-center gap-3 transition-all duration-500 ${isActive
                                            ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white shadow-lg shadow-pak-green-900/20'
                                            : isCompleted
                                                ? 'bg-pak-green-50 text-pak-green-700'
                                                : 'text-gray-300'
                                            }`}
                                    >
                                        <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black
                        ${isActive ? 'bg-white text-pak-green-800' : isCompleted ? 'bg-pak-green-200 text-pak-green-700' : 'bg-gray-100 text-gray-400'}
                    `}>
                                            {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step.number}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${isActive ? 'block' : 'hidden'}`}>{step.title}</span>
                                    </div>

                                    {index < activeSteps.length - 1 && (
                                        <div className={`w-8 h-[2px] mx-1 ${isCompleted ? 'bg-pak-green-200' : 'bg-gray-200/50'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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
                        <BusinessStep1TaxYear
                            onContinue={(year) => {
                                setFormData({ ...formData, taxYear: year });
                                setCurrentStep(2);
                            }}
                            onBack={onBack}
                        />
                    )}

                    {currentStep === 2 && (
                        <BusinessStep2Method
                            onContinue={(method) => {
                                setFormData({ ...formData, method });
                                setCurrentStep(3);
                            }}
                            onBack={() => setCurrentStep(1)}
                        />
                    )}

                    {currentStep === 3 && (
                        <BusinessStep3Structure
                            onContinue={(structure) => {
                                setFormData({ ...formData, structure: structure as any });
                                setCurrentStep(4);
                            }}
                            onBack={() => setCurrentStep(2)}
                        />
                    )}

                    {currentStep === 4 && (
                        <BusinessStep4Type
                            onContinue={(type) => {
                                setFormData({ ...formData, type });
                                setCurrentStep(5);
                            }}
                            onBack={() => setCurrentStep(3)}
                        />
                    )}

                    {currentStep === 5 && (
                        <BusinessStep5Info
                            onContinue={(info) => {
                                setFormData({ ...formData, info });
                                setCurrentStep(6);
                            }}
                            onBack={() => setCurrentStep(4)}
                            selectedType={formData.type || 'dealer'}
                        />
                    )}

                    {currentStep === 6 && (
                        <BusinessStep6Status
                            onContinue={(status) => {
                                setFormData({ ...formData, withholdingStatus: status });
                                setCurrentStep(7);
                            }}
                            onBack={() => setCurrentStep(5)}
                        />
                    )}

                    {currentStep === 7 && (
                        <BusinessStep7Financial
                            withholdingStatus={formData.withholdingStatus}
                            businessType={formData.type}
                            onContinue={(financial) => {
                                setFormData({ ...formData, financial });
                                setCurrentStep(8);
                            }}
                            onBack={() => setCurrentStep(6)}
                        />
                    )}

                    {currentStep === 8 && (
                        <BusinessStep8Addon
                            onContinue={(addon) => {
                                setFormData({ ...formData, addon });
                                setCurrentStep(9);
                            }}
                            onBack={() => setCurrentStep(7)}
                        />
                    )}

                    {currentStep === 9 && (
                        <BusinessStep9Summary
                            data={formData}
                            onBack={() => setCurrentStep(8)}
                            onComplete={onComplete}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
