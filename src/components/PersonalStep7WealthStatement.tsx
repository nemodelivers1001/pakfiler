import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark,
    Home,
    Car,
    CreditCard,
    Shield,
    Briefcase,
    Coins,
    Globe,
    Watch,
    ArrowRight,
    TrendingDown,
    Plus,
    Wallet,
    Calculator,
    MinusCircle,
    PlusCircle
} from 'lucide-react';
import { MotionButton } from './ui/MotionButton';
import { MotionSelect } from './ui/MotionSelect';

interface PersonalStep7WealthStatementProps {
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

export default function PersonalStep7WealthStatement({ onContinue, onBack }: PersonalStep7WealthStatementProps) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState<any>({});

    const updateData = (field: string, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddItem = () => {
        if (Object.keys(newItem).length === 0) return;
        setData(prev => ({
            ...prev,
            [activeTab]: [...(prev as any)[activeTab], newItem]
        }));
        setNewItem({});
        setShowAddModal(false);
    };

    const handleRemoveItem = (index: number) => {
        setData(prev => ({
            ...prev,
            [activeTab]: (prev as any)[activeTab].filter((_: any, i: number) => i !== index)
        }));
    };

    const getModalFields = () => {
        switch (activeTab) {
            case 'properties':
                return [
                    { name: 'address', label: 'Complete Address', placeholder: 'House #123, Street 4...' },
                    {
                        name: 'type',
                        label: 'Type (Res/Comm/Agri)',
                        type: 'select',
                        placeholder: 'Select Type',
                        options: [
                            { value: 'residential', label: 'Residential' },
                            { value: 'commercial', label: 'Commercial' },
                            { value: 'agricultural', label: 'Agricultural' },
                            { value: 'industrial', label: 'Industrial' },
                            { value: 'plot', label: 'Plot' }
                        ]
                    },
                    { name: 'area', label: 'Area (Marla/Kanal)', placeholder: '10 Marla' },
                    { name: 'cost', label: 'Cost / Value (PKR)', placeholder: '0.00', type: 'text' } // Changed type to text to match InputGroup default, handling "number" valid visually
                ];
            case 'vehicles':
                return [
                    { name: 'make', label: 'Make', placeholder: 'Toyota' },
                    { name: 'model', label: 'Model', placeholder: 'Corolla' },
                    { name: 'regNo', label: 'Registration No', placeholder: 'ABC-123' },
                    { name: 'cost', label: 'Cost / Value (PKR)', placeholder: '0.00', type: 'number' }
                ];
            case 'banks':
                return [
                    { name: 'bankName', label: 'Bank Name', placeholder: 'HBL' },
                    { name: 'accountNo', label: 'Account / IBAN', placeholder: 'PK...' },
                    { name: 'balance', label: 'Balance (PKR)', placeholder: '0.00', type: 'number' }
                ];
            case 'insurance':
                return [
                    { name: 'company', label: 'Insurance Company', placeholder: 'State Life' },
                    { name: 'policyNo', label: 'Policy No', placeholder: '123456' },
                    { name: 'premium', label: 'Premium Paid (PKR)', placeholder: '0.00', type: 'number' }
                ];
            default:
                return [
                    { name: 'description', label: 'Description', placeholder: 'Item Description' },
                    { name: 'value', label: 'Value (PKR)', placeholder: '0.00', type: 'number' }
                ];
        }
    };

    // Calculate Net Worth safely safely
    const wealthSummary = useMemo(() => {
        const parse = (val: string) => parseFloat(String(val).replace(/,/g, '') || '0') || 0;
        let assets = 0;
        let liabilities = 0;

        assets += parse(data.cash);
        data.properties.forEach((i: any) => assets += parse(i.cost));
        data.vehicles.forEach((i: any) => assets += parse(i.cost));
        data.banks.forEach((i: any) => assets += parse(i.balance));
        data.otherAssets.forEach((i: any) => assets += parse(i.value));
        data.insurance.forEach((i: any) => assets += parse(i.premium)); // Assuming premium adds to value approx or just tracking
        data.possessions.forEach((i: any) => assets += parse(i.value));
        data.foreignAssets.forEach((i: any) => assets += parse(i.value));

        data.liabilities.forEach((i: any) => liabilities += parse(i.value));

        const netWorth = assets - liabilities;

        return { assets, liabilities, netWorth };
    }, [data]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(amount);
    };

    const tabs = [
        { id: 'netWorth', label: 'Net Worth', icon: Landmark },
        { id: 'properties', label: 'Properties', icon: Home },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
        { id: 'banks', label: 'Bank Accounts', icon: CreditCard },
        { id: 'insurance', label: 'Insurance', icon: Shield },
        { id: 'otherAssets', label: 'Other Assets', icon: Briefcase },
        { id: 'cash', label: 'Cash in Hand', icon: Coins },
        { id: 'foreignAssets', label: 'Foreign Assets', icon: Globe },
        { id: 'possessions', label: 'Possessions', icon: Watch },
        { id: 'liabilities', label: 'Liabilities', icon: TrendingDown },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
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
                                <h3 className="text-2xl font-black text-pak-green-950 uppercase tracking-tight">Add {tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}</h3>
                                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><MinusCircle className="w-6 h-6 text-gray-400" /></button>
                            </div>

                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {getModalFields().map((field: any) => (
                                    field.type === 'select' ? (
                                        <div key={field.name} className="space-y-2 group">
                                            <MotionSelect
                                                label={field.label}
                                                options={field.options}
                                                value={newItem[field.name] || ''}
                                                onChange={(value) => setNewItem({ ...newItem, [field.name]: value })}
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    ) : (
                                        <InputGroup
                                            key={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            value={newItem[field.name] || ''}
                                            onChange={(e: any) => setNewItem({ ...newItem, [field.name]: e.target.value })}
                                            icon={tabs.find(t => t.id === activeTab)?.icon}
                                        />
                                    )
                                ))}
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                                <MotionButton onClick={handleAddItem} variant="primary" className="flex-1 bg-pak-green-500 text-white shadow-lg">Save Item</MotionButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Wealth Statement</h2>
                <p className="text-gray-500 font-bold">Declare your assets and liabilities</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Vertical Tabs */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-4 shadow-xl shadow-pak-green-900/5 sticky top-24 h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                    {/* Net Worth Summary Bar */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-pak-green-50 to-white border border-pak-green-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-pak-green-100 rounded-full flex items-center justify-center text-pak-green-600"><PlusCircle className="w-5 h-5" /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Total Assets</p>
                                <p className="text-lg font-black text-pak-green-900">{formatCurrency(wealthSummary.assets)}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600"><MinusCircle className="w-5 h-5" /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Total Liabilities</p>
                                <p className="text-lg font-black text-red-900">{formatCurrency(wealthSummary.liabilities)}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-pak-green-900 to-pak-green-800 rounded-2xl p-4 flex items-center gap-3 text-white shadow-lg shadow-pak-green-900/20">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"><Calculator className="w-5 h-5" /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-pak-green-200 tracking-wider">Current Net Worth</p>
                                <p className="text-xl font-black">{formatCurrency(wealthSummary.netWorth)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-pak-green-900/5 min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'netWorth' && (
                                <motion.div key="netWorth" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Landmark className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Net Worth</h3>
                                            <p className="text-xs font-bold text-gray-400">Opening net worth for the tax year</p>
                                        </div>
                                    </div>

                                    <div className="max-w-md">
                                        <InputGroup
                                            label="Net Worth at Start (PKR)"
                                            value={data.netWorthStart}
                                            onChange={(e: any) => updateData('netWorthStart', e.target.value)}
                                            placeholder="0.00"
                                            icon={Landmark}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-gray-400 italic mt-8">Note: This is your wealth status at the beginning of the tax year.</p>
                                </motion.div>
                            )}

                            {activeTab === 'cash' && (
                                <motion.div key="cash" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                        <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                            <Coins className="w-6 h-6 text-pak-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Cash In Hand</h3>
                                            <p className="text-xs font-bold text-gray-400">Cash available at home or in safe</p>
                                        </div>
                                    </div>
                                    <div className="max-w-md">
                                        <InputGroup
                                            label="Amount (PKR)"
                                            value={data.cash}
                                            onChange={(e: any) => updateData('cash', e.target.value)}
                                            placeholder="0.00"
                                            icon={Coins}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Reusable List Based Layout */}
                            {['properties', 'vehicles', 'banks', 'insurance', 'otherAssets', 'foreignAssets', 'possessions', 'liabilities'].includes(activeTab) && (
                                <motion.div key="lists" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-pak-green-100 rounded-2xl flex items-center justify-center">
                                                {(() => {
                                                    const TabIcon = tabs.find(t => t.id === activeTab)?.icon || Briefcase;
                                                    return <TabIcon className="w-6 h-6 text-pak-green-600" />;
                                                })()}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">{tabs.find(t => t.id === activeTab)?.label}</h3>
                                                <p className="text-xs font-bold text-gray-400">Manage your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}</p>
                                            </div>
                                        </div>
                                        {/* Always show Add button */}
                                        <MotionButton
                                            onClick={() => { setShowAddModal(true); setNewItem({}); }}
                                            variant="secondary"
                                            className="bg-pak-green-50 text-pak-green-700 hover:bg-pak-green-100"
                                            icon={<Plus className="w-4 h-4" />}
                                        >
                                            Add New
                                        </MotionButton>
                                    </div>

                                    {(data as any)[activeTab]?.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-4">
                                            {(data as any)[activeTab].map((item: any, idx: number) => (
                                                <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-pak-green-200 transition-all">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 text-sm mb-1">{item.address || item.make || item.bankName || item.company || item.description || "N/A"}</h4>
                                                        <p className="text-xs text-gray-400">{item.type || item.model || item.accountNo || item.policyNo || ""}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <p className="font-black text-pak-green-900">{item.cost || item.balance || item.premium || item.value || "0"} PKR</p>
                                                        <button
                                                            onClick={() => handleRemoveItem(idx)}
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
                                                {(() => {
                                                    const TabIcon = tabs.find(t => t.id === activeTab)?.icon || Briefcase;
                                                    return <TabIcon className="w-8 h-8 text-gray-400" />;
                                                })()}
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">No Items Added</h4>
                                            <p className="text-sm text-gray-500 mb-6 max-w-xs">Start building your profile by adding {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.</p>
                                            <MotionButton onClick={() => { setShowAddModal(true); setNewItem({}); }} variant="secondary" className="bg-white border text-pak-green-600 hover:bg-pak-green-50" icon={<Plus className="w-4 h-4" />}>
                                                Add First Item
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
