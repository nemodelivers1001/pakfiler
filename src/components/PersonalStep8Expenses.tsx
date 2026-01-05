import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, List, ArrowRight } from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStep8ExpensesProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

export default function PersonalStep8Expenses({ onContinue, onBack }: PersonalStep8ExpensesProps) {
    const [entryMethod, setEntryMethod] = useState<'simple' | 'detailed'>('detailed');
    const [data, setData] = useState({
        simpleTotal: '',
        detailed: {
            rent: '',
            rates: '',
            vehicle: '',
            transport: '',
            electricity: '',
            water: '',
            gas: '',
            telephone: '',
            medical: '',
            educational: '',
            functions: '',
            donations: '',
            insurance: '',
            household: '',
            interest: '',
            gift: '',
            traveling: ''
        }
    });

    const updateDetailed = (field: string, value: string) => {
        setData(prev => ({
            ...prev,
            detailed: { ...prev.detailed, [field]: value }
        }));
    };

    const expenseFields = [
        { key: 'rent', label: 'Rent' },
        { key: 'rates', label: 'Rates / Taxes' },
        { key: 'vehicle', label: 'Vehicle Maintenance' },
        { key: 'electricity', label: 'Electricity' },
        { key: 'water', label: 'Water' },
        { key: 'gas', label: 'Gas' },
        { key: 'telephone', label: 'Telephone / Internet' },
        { key: 'medical', label: 'Medical' },
        { key: 'educational', label: 'Educational' },
        { key: 'functions', label: 'Functions / Gatherings' },
        { key: 'donations', label: 'Donations / Zakat' },
        { key: 'insurance', label: 'Insurance Premium' },
        { key: 'household', label: 'Household / Personal' },
        { key: 'interest', label: 'Interest / Profit on Debt' },
        { key: 'gift', label: 'Gifts' },
        { key: 'traveling', label: 'Traveling' },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Expense Information</h2>
                <p className="text-gray-500 font-bold">Provide details of your annual expenses</p>
            </div>

            {/* Entry Method Toggle */}
            <div className="flex justify-center mb-10">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-1.5 flex gap-2 shadow-sm">
                    <button
                        onClick={() => setEntryMethod('simple')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 ${entryMethod === 'simple'
                            ? 'bg-pak-green-500 text-white shadow-lg'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Calculator className="w-4 h-4" />
                        Simple Total
                    </button>
                    <button
                        onClick={() => setEntryMethod('detailed')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 ${entryMethod === 'detailed'
                            ? 'bg-pak-green-500 text-white shadow-lg'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <List className="w-4 h-4" />
                        Detailed Breakdown
                    </button>
                </div>
            </div>

            <div className={`bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-pak-green-900/5 transition-all duration-300`}>
                <AnimatePresence mode="wait">
                    {entryMethod === 'simple' ? (
                        <motion.div
                            key="simple"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-pak-green-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                    <Calculator className="w-8 h-8 text-pak-green-600" />
                                </div>
                                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Total Expenses</h3>
                                <p className="text-xs font-bold text-gray-400 mt-1">Enter the total sum of your annual expenses</p>
                            </div>

                            <div className="max-w-md mx-auto">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Total Amount (PKR)</label>
                                <input
                                    type="text"
                                    value={data.simpleTotal}
                                    onChange={(e) => setData({ ...data, simpleTotal: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800 text-lg text-center"
                                    placeholder="0.00"
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detailed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {expenseFields.map((field) => (
                                    <div key={field.key} className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                                        <input
                                            type="text"
                                            value={(data.detailed as any)[field.key]}
                                            onChange={(e) => updateDetailed(field.key, e.target.value)}
                                            className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                            placeholder="0.00"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center justify-between pt-10">
                <button
                    type="button"
                    onClick={onBack}
                    className="font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                >
                    Back
                </button>
                <MotionButton
                    type="button"
                    onClick={() => onContinue(data)}
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
