import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BusinessStep7FinancialProps {
    onContinue: (data: any) => void;
    onBack: () => void;
    withholdingStatus: string;
    businessType: string;
}

export default function BusinessStep7Financial({ onContinue, onBack, withholdingStatus, businessType }: BusinessStep7FinancialProps) {
    // Consolidate all form data
    const [formData, setFormData] = useState({
        // Tax Info
        revenueDeducted: '',
        taxDeducted: '',
        turnoverRate: '',
        revenueNotDeducted: '',

        // Direct Expenses
        directTotal: '',
        directCostOfSales: '',
        directSalaries: '',
        directRent: '',
        directFreight: '',
        directOther: '',

        // Indirect Expenses
        indirectTotal: '',
        indirectSalaries: '',
        indirectRent: '',
        indirectTraveling: '',
        indirectUtilities: '',
        indirectRepair: '',
        indirectLegal: '',
        indirectDepreciation: '',
        indirectOther: ''
    });

    const [expandedSection, setExpandedSection] = useState<'direct' | 'indirect' | null>('direct');

    const toggleSection = (section: 'direct' | 'indirect') => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const showDeducted = withholdingStatus === 'all' || withholdingStatus === 'some';
    const showNotDeducted = withholdingStatus === 'none' || withholdingStatus === 'some';

    const getBusinessTitle = () => {
        if (!businessType) return 'Business';
        return businessType.charAt(0).toUpperCase() + businessType.slice(1);
    };

    return (
        <div className="max-w-[1200px] mx-auto pb-12">
            <div className="text-left mb-10 pl-2">
                <h2 className="text-3xl font-black text-pak-green-950 mb-2">
                    {getBusinessTitle()} Financial Details
                </h2>
                <p className="text-gray-500 font-medium">
                    Please provide financial information for your business
                </p>
            </div>

            {/* Tax Information Section */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl shadow-pak-green-900/5 mb-8">
                <h3 className="text-lg font-black text-pak-green-950 mb-6 uppercase tracking-tight">Tax Information</h3>

                <div className="grid md:grid-cols-2 gap-8">
                    {showDeducted && (
                        <>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Revenue on which tax was deducted <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter amount in PKR"
                                    value={formData.revenueDeducted}
                                    onChange={(e) => setFormData({ ...formData, revenueDeducted: e.target.value })}
                                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none placeholder:text-gray-500 placeholder:font-bold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Tax Deducted <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter amount in PKR"
                                    value={formData.taxDeducted}
                                    onChange={(e) => setFormData({ ...formData, taxDeducted: e.target.value })}
                                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none placeholder:text-gray-500 placeholder:font-bold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Turnover Tax Rate (%) <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none z-10">
                                        <ChevronDown className="w-4 h-4 text-pak-green-500" />
                                    </div>
                                    <select
                                        value={formData.turnoverRate}
                                        onChange={(e) => setFormData({ ...formData, turnoverRate: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none appearance-none cursor-pointer placeholder:text-gray-500 relative z-0 hover:bg-white/80"
                                    >
                                        <option value="" className="text-gray-500">Select a turnover tax rate</option>
                                        <option value="1.25">1.25%</option>
                                        <option value="1.5">1.5%</option>
                                        <option value="2.0">2.0%</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {showNotDeducted && (
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Revenue on which tax was not deducted <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="Enter amount in PKR"
                                value={formData.revenueNotDeducted}
                                onChange={(e) => setFormData({ ...formData, revenueNotDeducted: e.target.value })}
                                className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none placeholder:text-gray-500 placeholder:font-bold"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Direct Expenses Section */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl shadow-pak-green-900/5 mb-8">
                <h3 className="text-lg font-black text-pak-green-950 mb-6 uppercase tracking-tight">Direct Expenses</h3>

                <div className="space-y-3 mb-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Direct Expense total</label>
                    <input
                        type="text"
                        value={formData.directTotal}
                        onChange={(e) => setFormData({ ...formData, directTotal: e.target.value })}
                        className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none placeholder:text-gray-500 placeholder:font-bold"
                    />
                </div>

                <div className="border border-gray-200 rounded-2xl bg-white/30 overflow-hidden">
                    <button
                        onClick={() => toggleSection('direct')}
                        className="w-full px-6 py-4 flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500 hover:bg-white/50 transition-colors"
                    >
                        Detail of Direct Expenses (optional)
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'direct' ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {expandedSection === 'direct' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-gray-200 p-6 grid md:grid-cols-2 gap-6"
                            >
                                {['Cost of Sales', 'Salaries', 'Rent', 'Freight & Transportation', 'Other Business Expense'].map((field) => {
                                    const key = 'direct' + field.split(' ')[0] as keyof typeof formData; // Rough mapping
                                    return (
                                        <div key={field} className="space-y-2">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase">{field}</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none"
                                            />
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Indirect Expenses Section */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl shadow-pak-green-900/5 mb-8">
                <h3 className="text-lg font-black text-pak-green-950 mb-6 uppercase tracking-tight">Indirect Expenses</h3>

                <div className="space-y-3 mb-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Indirect Expense Total</label>
                    <input
                        type="text"
                        value={formData.indirectTotal}
                        onChange={(e) => setFormData({ ...formData, indirectTotal: e.target.value })}
                        className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none placeholder:text-gray-500 placeholder:font-bold"
                    />
                </div>

                <div className="border border-gray-200 rounded-2xl bg-white/30 overflow-hidden">
                    <button
                        onClick={() => toggleSection('indirect')}
                        className="w-full px-6 py-4 flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500 hover:bg-white/50 transition-colors"
                    >
                        Details of Indirect Expense (optional)
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'indirect' ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {expandedSection === 'indirect' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-gray-200 p-6 grid md:grid-cols-2 gap-6"
                            >
                                {['Salaries, Wages & Benefits', 'Rent', 'Traveling & Communication', 'Utilities', 'Repair & Maintenance', 'Legal & Professional', 'Deprecation', 'Other Indirect Expense'].map((field) => (
                                    <div key={field} className="space-y-2">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase">{field}</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
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
                    onClick={() => onContinue(formData)}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Continue
                    <ArrowRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
