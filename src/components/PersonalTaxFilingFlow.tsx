import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import PersonalStep1TaxYear from './PersonalStep1TaxYear';
import PersonalStep2Method from './PersonalStep2Method';
import PersonalStep3BasicInfo from './PersonalStep3BasicInfo';
import PersonalStep4Income from './PersonalStep4Income';
import PersonalStep5TaxCredits from './PersonalStep5TaxCredits';
import PersonalStep6TaxDeducted from './PersonalStep6TaxDeducted';
import PersonalStep7WealthStatement from './PersonalStep7WealthStatement';
import PersonalStep8Expenses from './PersonalStep8Expenses';
import PersonalStep9Summary from './PersonalStep9Summary';
import PersonalStep10FBR from './PersonalStep10FBR';
import PersonalStepDocsUpload from './PersonalStepDocsUpload';

interface PersonalTaxFilingFlowProps {
    onBack: () => void;
    onComplete: () => void;
}

export default function PersonalTaxFilingFlow({ onBack, onComplete }: PersonalTaxFilingFlowProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        taxYear: '',
        method: '', // 'online' or 'document-upload'
        basicInfo: null,
        income: null,
        taxCredits: null,
        taxDeducted: null,
        wealthStatement: null,
        expenses: null,
        documents: null, // New field for uploaded docs
        // Add other steps data here
    });

    // Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem('personalTaxData');
        const savedStep = localStorage.getItem('personalTaxStep');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
        if (savedStep) {
            setCurrentStep(parseInt(savedStep));
        }
    }, []);

    // Auto-save on change
    useEffect(() => {
        localStorage.setItem('personalTaxData', JSON.stringify(formData));
        localStorage.setItem('personalTaxStep', currentStep.toString());
    }, [formData, currentStep]);

    // Dynamic Steps based on Method
    const isDocUpload = formData.method === 'document-upload';

    const steps = isDocUpload ? [
        { number: 1, title: 'Tax Year' },
        { number: 2, title: 'Filing Method' },
        { number: 3, title: 'Personal Info' },
        { number: 4, title: 'Upload Documents' },
        { number: 5, title: 'FBR Submission' }
    ] : [
        { number: 1, title: 'Tax Year' },
        { number: 2, title: 'Filing Method' },
        { number: 3, title: 'Personal Info' },
        { number: 4, title: 'Income' },
        { number: 5, title: 'Tax Credits' },
        { number: 6, title: 'Tax Deducted' },
        { number: 7, title: 'Wealth Statement' },
        { number: 8, title: 'Expenses' },
        { number: 9, title: 'Summary' },
        { number: 10, title: 'FBR Submission' }
    ];

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-pak-green-600 hover:text-pak-green-800 transition-colors mb-4 lg:mb-6 font-bold uppercase tracking-wider text-sm focus:outline-none focus:underline"
                    aria-label="Back to dashboard"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-pak-green-950 mb-2 uppercase tracking-tight" tabIndex={-1}>Personal Tax Filing</h1>
                        <p className="text-gray-400 font-bold text-xs sm:text-sm tracking-wide uppercase">
                            {isDocUpload ? 'Upload your documents for expert processing' : 'Complete your personal tax return in simple steps'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Premium Stepper */}
            <div
                className="flex items-center justify-start lg:justify-center mb-8 lg:mb-16 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                role="list"
                aria-label="Progress Steps"
            >
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-full shadow-lg shadow-pak-green-900/5 flex items-center gap-2 min-w-max">
                    {steps.map((step, index) => {
                        const isActive = step.number === currentStep;
                        const isCompleted = step.number < currentStep;

                        // Adjust step number display for visual continuity if needed, or just use step.number
                        return (
                            <div key={step.number} role="listitem" className="flex items-center">
                                <div
                                    className={`relative px-4 py-2 rounded-full flex items-center gap-3 transition-all duration-500 ${isActive
                                        ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white shadow-lg shadow-pak-green-900/20'
                                        : isCompleted
                                            ? 'bg-pak-green-50 text-pak-green-700'
                                            : 'text-gray-300'
                                        }`}
                                    aria-current={isActive ? 'step' : undefined}
                                >
                                    <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black
                        ${isActive ? 'bg-white text-pak-green-800' : isCompleted ? 'bg-pak-green-200 text-pak-green-700' : 'bg-gray-100 text-gray-400'}
                    `}>
                                        {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step.number}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${isActive ? 'block' : 'hidden'}`}>{step.title}</span>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className={`w-8 h-[2px] mx-1 ${isCompleted ? 'bg-pak-green-200' : 'bg-gray-200/50'}`} />
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
                        <PersonalStep1TaxYear
                            onContinue={(year) => {
                                setFormData({ ...formData, taxYear: year });
                                setCurrentStep(2);
                            }}
                            onBack={onBack}
                        />
                    )}

                    {currentStep === 2 && (
                        <PersonalStep2Method
                            onContinue={(method) => {
                                setFormData({ ...formData, method });
                                setCurrentStep(3);
                            }}
                            onBack={() => setCurrentStep(1)}
                        />
                    )}

                    {currentStep === 3 && (
                        <PersonalStep3BasicInfo
                            onContinue={(basicInfo) => {
                                setFormData({ ...formData, basicInfo });
                                setCurrentStep(4);
                            }}
                            onBack={() => setCurrentStep(2)}
                        />
                    )}

                    {/* Conditional Step 4 */}
                    {currentStep === 4 && (
                        isDocUpload ? (
                            <PersonalStepDocsUpload
                                onContinue={(documents) => {
                                    setFormData({ ...formData, documents });
                                    setCurrentStep(5);
                                }}
                                onBack={() => setCurrentStep(3)}
                            />
                        ) : (
                            <PersonalStep4Income
                                onContinue={(income) => {
                                    setFormData({ ...formData, income });
                                    setCurrentStep(5);
                                }}
                                onBack={() => setCurrentStep(3)}
                            />
                        )
                    )}

                    {/* Conditional Logic for Steps 5+ */}
                    {/* If Doc Upload, Step 5 is FBR. If Online, Step 5 is Tax Credits etc. */}

                    {!isDocUpload && currentStep === 5 && (
                        <PersonalStep5TaxCredits
                            onContinue={(taxCredits) => {
                                setFormData({ ...formData, taxCredits });
                                setCurrentStep(6);
                            }}
                            onBack={() => setCurrentStep(4)}
                        />
                    )}

                    {!isDocUpload && currentStep === 6 && (
                        <PersonalStep6TaxDeducted
                            onContinue={(taxDeducted) => {
                                setFormData({ ...formData, taxDeducted });
                                setCurrentStep(7);
                            }}
                            onBack={() => setCurrentStep(5)}
                        />
                    )}

                    {!isDocUpload && currentStep === 7 && (
                        <PersonalStep7WealthStatement
                            onContinue={(wealthStatement) => {
                                setFormData({ ...formData, wealthStatement });
                                setCurrentStep(8);
                            }}
                            onBack={() => setCurrentStep(6)}
                        />
                    )}

                    {!isDocUpload && currentStep === 8 && (
                        <PersonalStep8Expenses
                            onContinue={(expenses) => {
                                setFormData({ ...formData, expenses });
                                setCurrentStep(9);
                            }}
                            onBack={() => setCurrentStep(7)}
                        />
                    )}

                    {!isDocUpload && currentStep === 9 && (
                        <PersonalStep9Summary
                            formData={formData}
                            onContinue={() => setCurrentStep(10)}
                            onBack={() => setCurrentStep(8)}
                            onEdit={(step) => setCurrentStep(step)}
                        />
                    )}

                    {/* FBR Step - specific handling for Doc Upload or Online */}
                    {(isDocUpload ? currentStep === 5 : currentStep === 10) && (
                        <PersonalStep10FBR
                            onComplete={(fbrCredentials) => {
                                console.log('Final Submission Data:', { ...formData, fbrCredentials });
                                localStorage.removeItem('personalTaxData');
                                localStorage.removeItem('personalTaxStep');
                                onComplete();
                            }}
                            onBack={() => setCurrentStep(isDocUpload ? 4 : 9)}
                        />
                    )}

                    {/* Placeholder for future steps */}
                    {currentStep > 10 && (
                        <div className="bg-white p-8 rounded-3xl text-center">
                            <h2 className="text-xl font-bold text-gray-800">Step {currentStep} Component Coming Soon...</h2>
                            <button onClick={() => setCurrentStep(currentStep - 1)} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">Back</button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
