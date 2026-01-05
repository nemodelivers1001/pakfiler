import { useState } from 'react';
import { ChevronDown, Check, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalStep1TaxYearProps {
    onContinue: (year: string) => void;
    onBack: () => void;
}

const taxYears = [
    '2024-2025 (Tax Year 2025)',
    '2023-2024 (Tax Year 2024)',
    '2022-2023 (Tax Year 2023)',
    '2021-2022 (Tax Year 2022)',
    '2020-2021 (Tax Year 2021)',
    '2019-2020 (Tax Year 2020)',
];

export default function PersonalStep1TaxYear({ onContinue, onBack }: PersonalStep1TaxYearProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedYear) {
            onContinue(selectedYear);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[48px] p-10 shadow-xl shadow-pak-green-900/5 min-h-[500px] flex flex-col relative">
                <div className="text-left mb-8">
                    <h2 className="text-3xl font-black text-pak-green-950 mb-4 tracking-tight">
                        Select Tax Year
                    </h2>
                    <p className="text-gray-500 font-bold text-sm leading-relaxed max-w-2xl">
                        File your personal tax returns for current and previous tax years. Ensuring you select the correct year is crucial for accurate filing.
                    </p>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="relative max-w-md ml-auto">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-haspopup="listbox"
                            aria-expanded={isOpen}
                            className="w-full px-8 py-5 bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-between shadow-lg shadow-pak-green-900/30 hover:shadow-pak-green-900/40 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pak-green-500/20"
                        >
                            {selectedYear ? `Selected: ${selectedYear.split(' ')[0]}` : 'Select Tax Year'}
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    role="listbox"
                                    className="absolute top-full right-0 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                                >
                                    {taxYears.map((year) => (
                                        <li key={year} role="option" aria-selected={selectedYear === year}>
                                            <button
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setIsOpen(false);
                                                }}
                                                className="w-full text-left px-6 py-4 text-xs font-black uppercase tracking-wider text-gray-600 hover:bg-pak-green-50 hover:text-pak-green-700 transition-colors border-b border-gray-50 last:border-0 flex items-center justify-between group focus:outline-none focus:bg-pak-green-50"
                                            >
                                                {year}
                                                {selectedYear === year && <Check className="w-4 h-4 text-pak-green-500" />}
                                            </button>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50/50 rounded-3xl border border-gray-100 flex gap-4">
                    <Info className="w-5 h-5 text-pak-green-600 flex-shrink-0" />
                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed">
                        <span className="text-pak-green-700 font-black uppercase tracking-wider mr-1">Privacy Notice:</span>
                        Your personal tax information is securely stored and processed in accordance with FBR regulations. We ensure complete data privacy.
                    </p>
                </div>

                <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
                    <button
                        onClick={onBack}
                        className="font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                    >
                        Back
                    </button>
                    {selectedYear && (
                        <button
                            onClick={handleContinue}
                            className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-pak-green-500/20"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5 text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
