import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, GraduationCap, PiggyBank, ArrowRight, Check } from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStep5TaxCreditsProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

export default function PersonalStep5TaxCredits({ onContinue, onBack }: PersonalStep5TaxCreditsProps) {
    const [data, setData] = useState({
        donations: { enabled: false, amount: '' },
        pensionFunds: { enabled: false, amount: '' },
        tuitionFee: { enabled: false, children: '', amount: '' }
    });

    const toggleSection = (section: 'donations' | 'pensionFunds' | 'tuitionFee') => {
        setData(prev => ({
            ...prev,
            [section]: { ...prev[section], enabled: !prev[section].enabled }
        }));
    };

    const updateData = (section: 'donations' | 'pensionFunds' | 'tuitionFee', field: string, value: string) => {
        setData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Tax Credits</h2>
                <p className="text-gray-500 font-bold">Claim credits to reduce your tax liability</p>
            </div>

            <div className="space-y-6">
                {/* Donations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white/80 backdrop-blur-xl border ${data.donations.enabled ? 'border-pak-green-500 ring-4 ring-pak-green-500/10' : 'border-white/60'} rounded-[32px] p-6 sm:p-8 shadow-xl shadow-pak-green-900/5 transition-all duration-300`}
                >
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('donations')}>
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 ${data.donations.enabled ? 'bg-pak-green-500' : 'bg-pak-green-100'} rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-inner`}>
                                <Heart className={`w-7 h-7 ${data.donations.enabled ? 'text-white' : 'text-pak-green-600'} transition-colors duration-300`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Charitable Donations</h3>
                                <p className="text-xs font-bold text-gray-400">Claim credit for donations to approved institutions</p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${data.donations.enabled ? 'bg-pak-green-500 border-pak-green-500' : 'border-gray-200'}`}>
                            {data.donations.enabled && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {data.donations.enabled && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-8 space-y-4">
                                    <div className="bg-pak-green-50/50 p-6 rounded-2xl border border-pak-green-100">
                                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Donation Amount (PKR)</label>
                                        <input
                                            type="text"
                                            value={data.donations.amount}
                                            onChange={(e) => updateData('donations', 'amount', e.target.value)}
                                            className="w-full px-5 py-4 bg-white border-2 border-pak-green-100/50 rounded-xl focus:border-pak-green-500 transition-colors outline-none font-bold text-pak-green-900 placeholder-gray-300"
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Pension Funds */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`bg-white/80 backdrop-blur-xl border ${data.pensionFunds.enabled ? 'border-pak-green-500 ring-4 ring-pak-green-500/10' : 'border-white/60'} rounded-[32px] p-6 sm:p-8 shadow-xl shadow-pak-green-900/5 transition-all duration-300`}
                >
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('pensionFunds')}>
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 ${data.pensionFunds.enabled ? 'bg-pak-green-500' : 'bg-pak-green-100'} rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-inner`}>
                                <PiggyBank className={`w-7 h-7 ${data.pensionFunds.enabled ? 'text-white' : 'text-pak-green-600'} transition-colors duration-300`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Pension Funds Investment</h3>
                                <p className="text-xs font-bold text-gray-400">Contribution to approved pension funds</p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${data.pensionFunds.enabled ? 'bg-pak-green-500 border-pak-green-500' : 'border-gray-200'}`}>
                            {data.pensionFunds.enabled && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {data.pensionFunds.enabled && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-8 space-y-4">
                                    <div className="bg-pak-green-50/50 p-6 rounded-2xl border border-pak-green-100">
                                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Investment Amount (PKR)</label>
                                        <input
                                            type="text"
                                            value={data.pensionFunds.amount}
                                            onChange={(e) => updateData('pensionFunds', 'amount', e.target.value)}
                                            className="w-full px-5 py-4 bg-white border-2 border-pak-green-100/50 rounded-xl focus:border-pak-green-500 transition-colors outline-none font-bold text-pak-green-900 placeholder-gray-300"
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Tuition Fee */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`bg-white/80 backdrop-blur-xl border ${data.tuitionFee.enabled ? 'border-pak-green-500 ring-4 ring-pak-green-500/10' : 'border-white/60'} rounded-[32px] p-6 sm:p-8 shadow-xl shadow-pak-green-900/5 transition-all duration-300`}
                >
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('tuitionFee')}>
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 ${data.tuitionFee.enabled ? 'bg-pak-green-500' : 'bg-pak-green-100'} rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-inner`}>
                                <GraduationCap className={`w-7 h-7 ${data.tuitionFee.enabled ? 'text-white' : 'text-pak-green-600'} transition-colors duration-300`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Educational Expenses</h3>
                                <p className="text-xs font-bold text-gray-400">Tuition fees for children</p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${data.tuitionFee.enabled ? 'bg-pak-green-500 border-pak-green-500' : 'border-gray-200'}`}>
                            {data.tuitionFee.enabled && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {data.tuitionFee.enabled && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-8 space-y-4">
                                    <div className="bg-pak-green-50/50 p-6 rounded-2xl border border-pak-green-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Number of Children</label>
                                            <input
                                                type="text"
                                                value={data.tuitionFee.children}
                                                onChange={(e) => updateData('tuitionFee', 'children', e.target.value)}
                                                className="w-full px-5 py-4 bg-white border-2 border-pak-green-100/50 rounded-xl focus:border-pak-green-500 transition-colors outline-none font-bold text-pak-green-900 placeholder-gray-300"
                                                placeholder="e.g. 2"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Total Fee Paid (PKR)</label>
                                            <input
                                                type="text"
                                                value={data.tuitionFee.amount}
                                                onChange={(e) => updateData('tuitionFee', 'amount', e.target.value)}
                                                className="w-full px-5 py-4 bg-white border-2 border-pak-green-100/50 rounded-xl focus:border-pak-green-500 transition-colors outline-none font-bold text-pak-green-900 placeholder-gray-300"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
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
