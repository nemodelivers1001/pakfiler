import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Car, Zap, MoreHorizontal, ArrowRight, Plus } from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStep6TaxDeductedProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

export default function PersonalStep6TaxDeducted({ onContinue, onBack }: PersonalStep6TaxDeductedProps) {
    const [activeTab, setActiveTab] = useState('bank');
    const [data, setData] = useState({
        bank: { transactionType: '', bankName: '', accountNo: '', taxDeducted: '' },
        vehicle: { activityType: '', vehicleType: '', regNo: '', cost: '', taxDeducted: '' },
        utilities: { service: '', provider: '', consumerNo: '', taxDeducted: '' },
        other: {
            propertyPurchase: { amount: '', tax: '' },
            propertySale: { amount: '', tax: '' },
            functions: { amount: '', tax: '' },
            pensionWithdrawal: { amount: '', tax: '' }
        }
    });

    const updateNestedData = (section: string, field: string, value: string) => {
        setData(prev => ({
            ...prev,
            [section]: { ...prev[section as keyof typeof prev], [field]: value }
        }));
    };

    const updateOtherData = (subSection: string, field: string, value: string) => {
        setData(prev => ({
            ...prev,
            other: {
                ...prev.other,
                [subSection]: {
                    ...(prev.other as any)[subSection],
                    [field]: value
                }
            }
        }));
    };

    const tabs = [
        { id: 'bank', label: 'Bank Tax', icon: Building2 },
        { id: 'vehicle', label: 'Vehicle', icon: Car },
        { id: 'utilities', label: 'Utilities', icon: Zap },
        { id: 'other', label: 'Other', icon: MoreHorizontal },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Tax Deducted</h2>
                <p className="text-gray-500 font-bold">Details of tax already deducted at source</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Vertical Tabs */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-4 shadow-xl shadow-pak-green-900/5 sticky top-24">
                        <div className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-wider ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white shadow-lg shadow-pak-green-500/30'
                                        : 'text-gray-500 hover:bg-pak-green-50 hover:text-pak-green-700'
                                        }`}
                                >
                                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-pak-green-500'}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-pak-green-900/5 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'bank' && (
                                <motion.div key="bank" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Bank Tax Deduction</h3>
                                            <p className="text-xs font-bold text-gray-400">Tax deducted on bank transactions</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Transaction Type</label>
                                            <select
                                                value={data.bank.transactionType}
                                                onChange={(e) => updateNestedData('bank', 'transactionType', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="cash_withdrawal">Cash Withdrawal</option>
                                                <option value="transfer">Transfer</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Select Bank</label>
                                            <select
                                                value={data.bank.bankName}
                                                onChange={(e) => updateNestedData('bank', 'bankName', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                            >
                                                <option value="">Select Bank</option>
                                                <option value="hbl">HBL</option>
                                                <option value="mcb">MCB</option>
                                                <option value="meezan">Meezan Bank</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Account No</label>
                                            <input
                                                type="text"
                                                value={data.bank.accountNo}
                                                onChange={(e) => updateNestedData('bank', 'accountNo', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="Enter Account No"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tax Deducted (PKR)</label>
                                            <input
                                                type="text"
                                                value={data.bank.taxDeducted}
                                                onChange={(e) => updateNestedData('bank', 'taxDeducted', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'vehicle' && (
                                <motion.div key="vehicle" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Car className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Vehicle Details</h3>
                                            <p className="text-xs font-bold text-gray-400">Tax deducted on vehicle registration/transfer</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Activity Type</label>
                                            <input
                                                type="text"
                                                value={data.vehicle.activityType}
                                                onChange={(e) => updateNestedData('vehicle', 'activityType', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="Registration / Transfer"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Type</label>
                                            <input
                                                type="text"
                                                value={data.vehicle.vehicleType}
                                                onChange={(e) => updateNestedData('vehicle', 'vehicleType', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="Sedan / SUV / Bike"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Registration No</label>
                                            <input
                                                type="text"
                                                value={data.vehicle.regNo}
                                                onChange={(e) => updateNestedData('vehicle', 'regNo', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="ABC-123"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Cost (PKR)</label>
                                            <input
                                                type="text"
                                                value={data.vehicle.cost}
                                                onChange={(e) => updateNestedData('vehicle', 'cost', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tax Deducted (PKR)</label>
                                            <input
                                                type="text"
                                                value={data.vehicle.taxDeducted}
                                                onChange={(e) => updateNestedData('vehicle', 'taxDeducted', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'utilities' && (
                                <motion.div key="utilities" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Utilities</h3>
                                            <p className="text-xs font-bold text-gray-400">Tax deducted on utility bills</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Utility Service</label>
                                            <select
                                                value={data.utilities.service}
                                                onChange={(e) => updateNestedData('utilities', 'service', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                            >
                                                <option value="">Select Service</option>
                                                <option value="electricity">Electricity</option>
                                                <option value="gas">Gas</option>
                                                <option value="telephone">Telephone/Internet</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Provider</label>
                                            <select
                                                value={data.utilities.provider}
                                                onChange={(e) => updateNestedData('utilities', 'provider', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                            >
                                                <option value="">Select Provider</option>
                                                <option value="lesco">LESCO</option>
                                                <option value="ke">K-Electric</option>
                                                <option value="ptcl">PTCL</option>
                                                <option value="sngpl">SNGPL</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Consumer No</label>
                                            <input
                                                type="text"
                                                value={data.utilities.consumerNo}
                                                onChange={(e) => updateNestedData('utilities', 'consumerNo', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="Enter Consumer No"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tax Deducted (PKR)</label>
                                            <input
                                                type="text"
                                                value={data.utilities.taxDeducted}
                                                onChange={(e) => updateNestedData('utilities', 'taxDeducted', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 outline-none font-bold text-gray-800"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'other' && (
                                <motion.div key="other" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <MoreHorizontal className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Other Deduction</h3>
                                            <p className="text-xs font-bold text-gray-400">Miscellaneous tax deductions</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { id: 'propertyPurchase', title: 'Property Purchase' },
                                            { id: 'propertySale', title: 'Property Sale' },
                                            { id: 'functions', title: 'Functions & Gathering' },
                                            { id: 'pensionWithdrawal', title: 'Pension Fund Withdrawal' }
                                        ].map((item) => (
                                            <div key={item.id} className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-pak-green-200 transition-colors">
                                                <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-4">{item.title}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Amount (PKR)"
                                                        value={(data.other as any)[item.id]?.amount}
                                                        onChange={(e) => updateOtherData(item.id, 'amount', e.target.value)}
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-pak-green-500 outline-none font-bold text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Tax Deducted (PKR)"
                                                        value={(data.other as any)[item.id]?.tax}
                                                        onChange={(e) => updateOtherData(item.id, 'tax', e.target.value)}
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-pak-green-500 outline-none font-bold text-sm"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between pt-8">
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
            </div>
        </div>
    );
}
