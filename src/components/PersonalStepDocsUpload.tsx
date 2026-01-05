import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Landmark,
    TrendingUp,
    Home,
    Heart,
    Scissors,
    History,
    UploadCloud,
    CheckCircle2,
    X,
    ArrowRight
} from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStepDocsUploadProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

export default function PersonalStepDocsUpload({ onContinue, onBack }: PersonalStepDocsUploadProps) {
    const [uploads, setUploads] = useState<Record<string, File | null>>({});

    const docCategories = [
        { id: 'salary', label: 'Salary Certificate', icon: FileText },
        { id: 'bank', label: 'Bank Statements', icon: Landmark },
        { id: 'investment', label: 'Investment Statements', icon: TrendingUp },
        { id: 'property', label: 'Property Documents', icon: Home },
        { id: 'zakat', label: 'Zakat/Donation Receipts', icon: Heart },
        { id: 'other', label: 'Other Income Documents', icon: FileText },
        { id: 'deduction', label: 'Tax Deduction Certificates', icon: Scissors },
        { id: 'previous', label: 'Previous Tax Returns', icon: History },
    ];

    const handleFileChange = (id: string, file: File | null) => {
        setUploads(prev => ({ ...prev, [id]: file }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Required Documents</h2>
                <p className="text-gray-500 font-bold">Please upload the necessary proofs to proceed with your filing</p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
            >
                {docCategories.map((doc) => (
                    <motion.div
                        key={doc.id}
                        variants={itemVariants}
                        className={`bg-white/80 backdrop-blur-xl border-2 rounded-3xl p-6 transition-all duration-300 group ${uploads[doc.id]
                                ? 'border-pak-green-500 shadow-lg shadow-pak-green-900/10'
                                : 'border-gray-100 hover:border-pak-green-200 hover:shadow-md'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${uploads[doc.id] ? 'bg-pak-green-100 text-pak-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-pak-green-50 group-hover:text-pak-green-500'
                                }`}>
                                <doc.icon className="w-6 h-6" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">{doc.label}</h3>
                                {uploads[doc.id] ? (
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs font-medium text-pak-green-600 bg-pak-green-50 px-3 py-1 rounded-full truncate max-w-[150px]">
                                            {uploads[doc.id]?.name}
                                        </span>
                                        <button
                                            onClick={() => handleFileChange(doc.id, null)}
                                            className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <label className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-pak-green-600 transition-colors py-2 px-4 rounded-xl border border-dashed border-gray-300 hover:border-pak-green-400 bg-gray-50/50 hover:bg-white">
                                            <UploadCloud className="w-4 h-4" />
                                            <span>Upload File</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) handleFileChange(doc.id, e.target.files[0]);
                                                }}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            {uploads[doc.id] && (
                                <div className="text-pak-green-500">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-10 flex gap-4 items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 mt-1">
                    <FileText className="w-3 h-3" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-blue-900 mb-1">Note</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        Please ensure all documents are clear and readable. Allowed formats: PDF, JPG, PNG. Max size: 5MB per file.
                        You can proceed even if you don't have all documents right now, but it may delay your filing.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onBack}
                    className="font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                >
                    Back
                </button>
                <MotionButton
                    type="button"
                    onClick={() => onContinue(uploads)}
                    variant="primary"
                    className="px-8 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 shadow-lg shadow-pak-green-900/20"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                    Continue
                </MotionButton>
            </div>
        </div>
    );
}
