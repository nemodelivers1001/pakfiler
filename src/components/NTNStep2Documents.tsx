import { useState } from 'react';
import { FileText, ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NTNStep2DocumentsProps {
    onContinue: () => void;
    onBack: () => void;
    selectedPurpose: { type: string; amount: number; title: string };
}

export default function NTNStep2Documents({
    onContinue,
    onBack,
    selectedPurpose,
}: NTNStep2DocumentsProps) {
    const [files, setFiles] = useState<{ front: File | null; back: File | null }>({
        front: null,
        back: null,
    });

    const handleFileChange = (side: 'front' | 'back', file: File | null) => {
        setFiles(prev => ({ ...prev, [side]: file }));
    };

    // VALIDATION REMOVED: Continue always allowed
    const handleContinue = () => {
        onContinue();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass-card p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden bg-white/40 backdrop-blur-xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-pak-green-950 mb-3 uppercase tracking-tight">
                        Upload Documents
                    </h2>
                    <p className="text-gray-400 font-bold text-sm tracking-wide uppercase mb-6">
                        Please upload both sides of your Computerized National Identity Card
                    </p>

                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-pak-green-50 border border-pak-green-100 text-pak-green-700 text-xs font-black uppercase tracking-wider">
                        <span>Selected: {selectedPurpose.title}</span>
                        <div className="w-1 h-1 bg-pak-green-300 rounded-full"></div>
                        <span>Rs {selectedPurpose.amount.toLocaleString()}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {(['front', 'back'] as const).map((side) => (
                        <div key={side} className="space-y-4">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-[2px] ml-1">
                                CNIC {side} Side
                            </label>

                            <div className={`relative group h-64 rounded-[32px] border-2 border-dashed transition-all duration-300 ${files[side]
                                ? 'border-pak-green-500 bg-pak-green-50/50'
                                : 'border-gray-200 bg-white/30 hover:border-pak-green-300 hover:bg-white/50'
                                }`}>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileChange(side, file);
                                    }}
                                    accept="image/*,application/pdf"
                                />

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    {files[side] ? (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="w-16 h-16 bg-pak-green-100 rounded-2xl flex items-center justify-center text-pak-green-600 mb-4 shadow-sm">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                            <p className="text-sm font-bold text-pak-green-900 truncate max-w-[200px] mb-2">{files[side]!.name}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleFileChange(side, null);
                                                }}
                                                className="text-[10px] font-black uppercase tracking-wider text-red-500 hover:text-red-700 z-20 px-3 py-1 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                                            >
                                                Remove File
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-pak-green-500 group-hover:scale-110 transition-all duration-300 mb-4 shadow-sm">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                            <p className="text-sm font-bold text-pak-green-950 mb-1">Click to Upload</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">JPG, PNG or PDF (Max 2MB)</p>

                                            <div className="mt-6 px-6 py-3 bg-pak-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-pak-green-500/20 group-hover:shadow-pak-green-500/40 group-hover:scale-105 transition-all">
                                                Upload {side} Side
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
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
                        onClick={handleContinue}
                        className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                    >
                        Continue Next
                        <ArrowRight className="w-5 h-5 text-pak-green-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}
