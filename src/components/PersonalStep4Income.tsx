import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Umbrella,
    Sprout,
    Percent,
    Home,
    PiggyBank,
    TrendingUp,
    MoreHorizontal,
    ArrowRight,
    Plus,
    Trash2,
    Eye,
    EyeOff,
    Check,
    Wallet,
    Calculator
} from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStep4IncomeProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

const InputGroup = ({ label, value, onChange, placeholder, icon: Icon }: any) => (
    <div className="space-y-2 group">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-pak-green-500 transition-colors">{label}</label>
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 focus:bg-white transition-all outline-none font-bold text-gray-800 placeholder-gray-300"
                placeholder={placeholder}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pak-green-500 transition-colors">
                {Icon ? <Icon className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
            </div>
        </div>
    </div>
);

export default function PersonalStep4Income({ onContinue, onBack }: PersonalStep4IncomeProps) {
    const [activeTab, setActiveTab] = useState('salary');
    const [data, setData] = useState({
        salary: { annual: '', tax: '' },
        pension: { amount: '' },
        agriculture: { amount: '' },
        commission: {
            lifeInsurance: { amount: '', tax: '', expense: '' },
            generalInsurance: { amount: '', tax: '', expense: '' },
            realEstate: { amount: '', tax: '', expense: '' },
            services: { amount: '', tax: '', expense: '' },
            other: { amount: '', tax: '', expense: '' }
        },
        rent: {
            annual: '',
            expense: '',
            tenantDeduced: false,
            taxDeducted: '',
            properties: [] as any[]
        },
        savings: {
            bankDeposits: [] as any[],
            govtSchemes: [] as any[],
            behbood: '',
            pensionerBenefit: ''
        },
        dividends: {
            power: { amount: '', tax: '' },
            other: { amount: '', tax: '' },
            specific: { amount: '', tax: '' },
            capitalGain: { gain: '', cgt: '', tax: '', cost: '' },
            bonus: { value: '', tax: '' }
        },
        other: [] as any[]
    });

    const [showAdvancedSalary, setShowAdvancedSalary] = useState(false);

    const handleSalaryChange = (field: string, value: string) => {
        setData(prev => ({ ...prev, salary: { ...prev.salary, [field]: value } }));
    };

    // Calculate Total Income safely
    const totalIncome = useMemo(() => {
        const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
        let total = 0;
        total += parse(data.salary.annual);
        total += parse(data.pension.amount);
        total += parse(data.agriculture.amount);
        // Commission
        ['lifeInsurance', 'generalInsurance', 'realEstate', 'services', 'other'].forEach((k: any) => {
            total += parse((data.commission as any)[k].amount);
        });
        // Rent
        total += parse(data.rent.annual);
        // Savings
        total += parse(data.savings.behbood);
        total += parse(data.savings.pensionerBenefit);
        // Dividends
        total += parse(data.dividends.power.amount);
        total += parse(data.dividends.other.amount);
        total += parse(data.dividends.specific.amount);
        total += parse(data.dividends.capitalGain.gain);
        total += parse(data.dividends.bonus.value);
        return total;
    }, [data]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(amount);
    };

    const tabs = [
        { id: 'salary', label: 'Salary', icon: Briefcase },
        { id: 'pension', label: 'Pension', icon: Umbrella },
        { id: 'agriculture', label: 'Agriculture', icon: Sprout },
        { id: 'commission', label: 'Commission', icon: Percent },
        { id: 'rent', label: 'Property', icon: Home },
        { id: 'savings', label: 'Savings', icon: PiggyBank },
        { id: 'dividends', label: 'Dividends', icon: TrendingUp },
        { id: 'other', label: 'Other', icon: MoreHorizontal },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
    };

    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState<any>({});

    const handleAddItem = () => {
        if (Object.keys(newItem).length === 0) return;

        if (activeTab === 'rent') {
            setData(prev => ({ ...prev, rent: { ...prev.rent, properties: [...prev.rent.properties, newItem] } }));
        } else if (activeTab === 'savings') {
            // Decide if bank or govt scheme based on some type selector, or just generic list
            // For simplicity, let's put all into bankDeposits or just a generic 'items' if structure permits. 
            // The state has bankDeposits and govtSchemes. Let's assume generic for this quick fix or default to bankDeposits.
            setData(prev => ({ ...prev, savings: { ...prev.savings, bankDeposits: [...prev.savings.bankDeposits, newItem] } }));
        } else if (activeTab === 'dividends') {
            // Dividends structure is object-based properties (power, other, etc).
            // If we want a list of dividend sources, we might need a new array or just update the specific fields via modal?
            // The user wants to "ADD DETAILS". The current structure for dividends is static fields. 
            // Let's keep dividends as is if it's static forms? 
            // Wait, the previous code had 'Detailed fields... are effectively implemented' placeholder.
            // Let's actually implement the forms for the static fields then, NOT a list add.
            // OR if it's 'rent' properties, definitely a list.
        } else {
            // Other
            setData(prev => ({ ...prev, other: [...prev.other, newItem] }));
        }

        setNewItem({});
        setShowAddModal(false);
    };

    const handleRemoveItem = (index: number, type: string) => {
        if (type === 'rent') {
            setData(prev => ({ ...prev, rent: { ...prev.rent, properties: prev.rent.properties.filter((_, i) => i !== index) } }));
        } else if (type === 'savings') {
            setData(prev => ({ ...prev, savings: { ...prev.savings, bankDeposits: prev.savings.bankDeposits.filter((_, i) => i !== index) } }));
        } else if (type === 'other') {
            setData(prev => ({ ...prev, other: prev.other.filter((_, i) => i !== index) }));
        }
    };

    const getModalFields = () => {
        switch (activeTab) {
            case 'rent':
                return [
                    { name: 'address', label: 'Property Address', placeholder: 'House #123...' },
                    { name: 'rentReceived', label: 'Rent Received', placeholder: '0.00' },
                    { name: 'taxDeducted', label: 'Tax Deducted', placeholder: '0.00' }
                ];
            case 'savings':
                return [
                    { name: 'minst', label: 'Bank / Institution', placeholder: 'National Savings / HBL' },
                    { name: 'profit', label: 'Profit', placeholder: '0.00' },
                    { name: 'tax', label: 'Tax Deducted', placeholder: '0.00' }
                ];
            case 'other':
                return [
                    { name: 'description', label: 'Description', placeholder: 'Source Name' },
                    { name: 'amount', label: 'Amount', placeholder: '0.00' },
                    { name: 'tax', label: 'Tax', placeholder: '0.00' }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto relative">
            {/* Modal Overlay */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-black text-pak-green-950 uppercase tracking-tight">Add Detail</h3>
                                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Trash2 className="w-6 h-6 text-gray-400" /></button>
                            </div>

                            <div className="space-y-4">
                                {getModalFields().map((field: any) => (
                                    <InputGroup
                                        key={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        value={newItem[field.name] || ''}
                                        onChange={(e: any) => setNewItem({ ...newItem, [field.name]: e.target.value })}
                                        type="text"
                                    />
                                ))}
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                                <MotionButton onClick={handleAddItem} variant="primary" className="flex-1 bg-pak-green-500 text-white shadow-lg">Save</MotionButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Income Details</h2>
                <p className="text-gray-500 font-bold">Declare your income sources for the tax year</p>
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
                    {/* Live Summary Bar */}
                    <div className="mb-6 bg-gradient-to-r from-pak-green-900 to-pak-green-800 rounded-2xl p-6 text-white shadow-lg shadow-pak-green-900/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                <Calculator className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-pak-green-200 uppercase tracking-wider mb-1">Total Declared Income</h3>
                                <p className="text-2xl font-black tracking-tight">{formatCurrency(totalIncome)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-pak-green-900/5 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'salary' && (
                                <motion.div key="salary" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Salary Income</h3>
                                            <p className="text-xs font-bold text-gray-400">Enter your annual salary and tax details</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup
                                            label="Annual Salary (PKR)"
                                            value={data.salary.annual}
                                            onChange={(e: any) => handleSalaryChange('annual', e.target.value)}
                                            placeholder="0.00"
                                            icon={Wallet}
                                        />
                                        <InputGroup
                                            label="Tax Deducted"
                                            value={data.salary.tax}
                                            onChange={(e: any) => handleSalaryChange('tax', e.target.value)}
                                            placeholder="0.00"
                                            icon={Percent}
                                        />
                                    </div>

                                    <button
                                        onClick={() => setShowAdvancedSalary(!showAdvancedSalary)}
                                        className="text-pak-green-600 font-bold text-xs uppercase tracking-wider hover:underline"
                                    >
                                        {showAdvancedSalary ? '- Hide Advanced Options' : '+ Click here for advanced options'}
                                    </button>

                                    {showAdvancedSalary && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="p-6 bg-pak-green-50/50 rounded-2xl border border-pak-green-100"
                                        >
                                            <p className="text-xs text-gray-500 font-medium">Advanced salary breakdown fields (Allowances, Perquisites, etc.) would appear here.</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'pension' && (
                                <motion.div key="pension" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Umbrella className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Pension Income</h3>
                                            <p className="text-xs font-bold text-gray-400">Details of pension received</p>
                                        </div>
                                    </div>
                                    <div className="max-w-md">
                                        <InputGroup
                                            label="Pension Amount (PKR)"
                                            value={data.pension.amount}
                                            onChange={(e: any) => setData({ ...data, pension: { amount: e.target.value } })}
                                            placeholder="0.00"
                                            icon={Wallet}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'agriculture' && (
                                <motion.div key="agriculture" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Sprout className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Agriculture Income</h3>
                                            <p className="text-xs font-bold text-gray-400">Income from agricultural activities</p>
                                        </div>
                                    </div>
                                    <div className="max-w-md">
                                        <InputGroup
                                            label="Agriculture Income (PKR)"
                                            value={data.agriculture.amount}
                                            onChange={(e: any) => setData({ ...data, agriculture: { amount: e.target.value } })}
                                            placeholder="0.00"
                                            icon={Sprout}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'commission' && (
                                <motion.div key="commission" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Percent className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Commission Income</h3>
                                            <p className="text-xs font-bold text-gray-400">Income from various commissions</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {['Life Insurance Agent', 'Insurance Agent-General', 'Real Estate/Travel Agent', 'Services/Consultancy', 'Other Commissions'].map((type, idx) => {
                                            const key = ['lifeInsurance', 'generalInsurance', 'realEstate', 'services', 'other'][idx];
                                            return (
                                                <div key={key} className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-pak-green-200 transition-colors group-hover:shadow-md">
                                                    <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-4">{type}</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <InputGroup label="Amount" placeholder="0.00" value={(data.commission as any)[key]?.amount} onChange={(e: any) => setData({ ...data, commission: { ...data.commission, [key]: { ...(data.commission as any)[key], amount: e.target.value } } })} />
                                                        <InputGroup label="Tax Deducted" placeholder="0.00" value={(data.commission as any)[key]?.tax} onChange={(e: any) => setData({ ...data, commission: { ...data.commission, [key]: { ...(data.commission as any)[key], tax: e.target.value } } })} icon={Percent} />
                                                        <InputGroup label="Expense" placeholder="0.00" value={(data.commission as any)[key]?.expense} onChange={(e: any) => setData({ ...data, commission: { ...data.commission, [key]: { ...(data.commission as any)[key], expense: e.target.value } } })} icon={TrendingUp} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'dividends' && (
                                <motion.div key="dividends" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Dividends & Capital Gains</h3>
                                            <p className="text-xs font-bold text-gray-400">Income from stocks, mutual funds etc.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100">
                                            <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-4">Dividends</h4>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Power Companies (Amount)" value={data.dividends.power.amount} onChange={(e: any) => setData({ ...data, dividends: { ...data.dividends, power: { ...data.dividends.power, amount: e.target.value } } })} />
                                                    <InputGroup label="Tax Deducted" value={data.dividends.power.tax} onChange={(e: any) => setData({ ...data, dividends: { ...data.dividends, power: { ...data.dividends.power, tax: e.target.value } } })} icon={Percent} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Other Companies (Amount)" value={data.dividends.other.amount} onChange={(e: any) => setData({ ...data, dividends: { ...data.dividends, other: { ...data.dividends.other, amount: e.target.value } } })} />
                                                    <InputGroup label="Tax Deducted" value={data.dividends.other.tax} onChange={(e: any) => setData({ ...data, dividends: { ...data.dividends, other: { ...data.dividends.other, tax: e.target.value } } })} icon={Percent} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100">
                                            <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-4">Capital Gains</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputGroup label="Gain on Securities" value={data.dividends.capitalGain.gain} onChange={(e: any) => setData({ ...data, dividends: { ...data.dividends, capitalGain: { ...data.dividends.capitalGain, gain: e.target.value } } })} />
                                                <InputGroup label="Tax on Gain" value={data.dividends.capitalGain.tax} onChange={(e: any) => setData({ ...data, dividends: { ...data.dividends, capitalGain: { ...data.dividends.capitalGain, tax: e.target.value } } })} icon={Percent} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {['rent', 'savings', 'other'].includes(activeTab) && (
                                <motion.div key="others" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                                {(() => {
                                                    const TabIcon = tabs.find(t => t.id === activeTab)?.icon || MoreHorizontal;
                                                    return <TabIcon className="w-6 h-6 text-pak-green-600" />;
                                                })()}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">{tabs.find(t => t.id === activeTab)?.label} Details</h3>
                                                <p className="text-xs font-bold text-gray-400">Enter details for {tabs.find(t => t.id === activeTab)?.label}</p>
                                            </div>
                                        </div>
                                        <MotionButton
                                            onClick={() => { setShowAddModal(true); setNewItem({}); }}
                                            variant="secondary"
                                            className="bg-pak-green-50 text-pak-green-700 hover:bg-pak-green-100"
                                            icon={<Plus className="w-4 h-4" />}
                                        >
                                            Add New
                                        </MotionButton>
                                    </div>

                                    {(activeTab === 'rent' ? data.rent.properties : activeTab === 'savings' ? data.savings.bankDeposits : data.other).length > 0 ? (
                                        <div className="space-y-4">
                                            {(activeTab === 'rent' ? data.rent.properties : activeTab === 'savings' ? data.savings.bankDeposits : data.other).map((item: any, idx: number) => (
                                                <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 text-sm mb-1">{item.address || item.minst || item.description || "Source"}</h4>
                                                        <p className="text-xs text-gray-400">Tax: {item.taxDeducted || item.tax || "0"}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <p className="font-black text-pak-green-900">{item.rentReceived || item.profit || item.amount} PKR</p>
                                                        <button
                                                            onClick={() => handleRemoveItem(idx, activeTab)}
                                                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                                <Plus className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">No Items Added</h4>
                                            <p className="text-sm text-gray-500 mb-6 max-w-xs">Add details for your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} income.</p>
                                            <MotionButton onClick={() => { setShowAddModal(true); setNewItem({}); }} variant="secondary" className="bg-white border text-pak-green-600 hover:bg-pak-green-50" icon={<Plus className="w-4 h-4" />}>
                                                Add Detail
                                            </MotionButton>
                                        </div>
                                    )}
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
