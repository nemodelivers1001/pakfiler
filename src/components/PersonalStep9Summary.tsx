import { motion } from 'framer-motion';
import { FileText, User, Briefcase, Heart, Calculator, Landmark, TrendingDown, ArrowRight, CheckCircle, Pencil } from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStep9SummaryProps {
    formData: any;
    onContinue: () => void;
    onBack: () => void;
    onEdit?: (step: number) => void;
}

export default function PersonalStep9Summary({ formData, onContinue, onBack, onEdit }: PersonalStep9SummaryProps) {
    const sections = [
        {
            title: 'Tax Details',
            icon: FileText,
            step: 1,
            content: (
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-400 font-bold">Tax Year</p>
                        <p className="font-bold text-pak-green-950">{formData.taxYear}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 font-bold">Filing Method</p>
                        <p className="font-bold text-pak-green-950">{formData.method === 'online' ? 'Online Filing' : 'Document Upload'}</p>
                    </div>
                </div>
            )
        },
        {
            title: 'Personal Information',
            icon: User,
            step: 3,
            content: formData.basicInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><p className="text-gray-400 font-bold">Name</p><p className="font-bold text-pak-green-900">{formData.basicInfo.fullName}</p></div>
                    <div><p className="text-gray-400 font-bold">CNIC</p><p className="font-bold text-pak-green-900">{formData.basicInfo.cnic}</p></div>
                    <div><p className="text-gray-400 font-bold">Email</p><p className="font-bold text-pak-green-900">{formData.basicInfo.email}</p></div>
                    <div><p className="text-gray-400 font-bold">Mobile</p><p className="font-bold text-pak-green-900">{formData.basicInfo.mobile}</p></div>
                </div>
            )
        },
        {
            title: 'Income Sources',
            icon: Briefcase,
            step: 4,
            content: formData.income && (
                <div className="text-sm space-y-2">
                    {formData.income.salary.annual && <div className="flex justify-between"><span className="text-gray-500 font-bold">Salary Income</span><span className="font-black text-pak-green-900">{formData.income.salary.annual} PKR</span></div>}
                    {formData.income.salary.tax && <div className="flex justify-between pl-4 border-l-2 border-pak-green-100"><span className="text-gray-400 font-medium">Tax Deducted</span><span className="font-bold text-gray-700">{formData.income.salary.tax} PKR</span></div>}
                    {formData.income.pension.amount && <div className="flex justify-between"><span className="text-gray-500 font-bold">Pension</span><span className="font-black text-pak-green-900">{formData.income.pension.amount} PKR</span></div>}
                    {formData.income.agriculture.amount && <div className="flex justify-between"><span className="text-gray-500 font-bold">Agriculture</span><span className="font-black text-pak-green-900">{formData.income.agriculture.amount} PKR</span></div>}
                    {/* Add checks for other income sources specifically if needed, kept generic for brevity */}
                    <p className="text-xs text-pak-green-600 font-bold italic mt-2">+ Other income details as entered</p>
                </div>
            )
        },
        {
            title: 'Tax Credits',
            icon: Heart,
            step: 5,
            content: formData.taxCredits && (
                <div className="text-sm space-y-2">
                    {formData.taxCredits.donations.enabled && <div className="flex justify-between"><span className="text-gray-500 font-bold">Donations</span><span className="font-black text-pak-green-900">{formData.taxCredits.donations.amount} PKR</span></div>}
                    {formData.taxCredits.pensionFunds.enabled && <div className="flex justify-between"><span className="text-gray-500 font-bold">Pension Funds</span><span className="font-black text-pak-green-900">{formData.taxCredits.pensionFunds.amount} PKR</span></div>}
                    {formData.taxCredits.tuitionFee.enabled && <div className="flex justify-between"><span className="text-gray-500 font-bold">Tuition Fee</span><span className="font-black text-pak-green-900">{formData.taxCredits.tuitionFee.amount} PKR</span></div>}
                    {!formData.taxCredits.donations.enabled && !formData.taxCredits.pensionFunds.enabled && !formData.taxCredits.tuitionFee.enabled && <p className="text-gray-400 italic">No tax credits claimed.</p>}
                </div>
            )
        },
        {
            title: 'Tax Deducted',
            icon: Calculator,
            step: 6,
            content: formData.taxDeducted && (
                <div className="text-sm space-y-2">
                    {formData.taxDeducted.bank.taxDeducted && <div className="flex justify-between"><span className="text-gray-500 font-bold">Bank Tax</span><span className="font-black text-pak-green-900">{formData.taxDeducted.bank.taxDeducted} PKR</span></div>}
                    {formData.taxDeducted.vehicle.taxDeducted && <div className="flex justify-between"><span className="text-gray-500 font-bold">Vehicle Tax</span><span className="font-black text-pak-green-900">{formData.taxDeducted.vehicle.taxDeducted} PKR</span></div>}
                    {formData.taxDeducted.utilities.taxDeducted && <div className="flex justify-between"><span className="text-gray-500 font-bold">Utility Tax</span><span className="font-black text-pak-green-900">{formData.taxDeducted.utilities.taxDeducted} PKR</span></div>}
                </div>
            )
        },
        {
            title: 'Wealth Statement',
            icon: Landmark,
            step: 7,
            content: formData.wealthStatement && (
                <div className="space-y-4">
                    <div className="text-sm space-y-2">
                        {formData.wealthStatement.netWorthStart && <div className="flex justify-between"><span className="text-gray-500 font-bold">Opening Net Worth</span><span className="font-black text-pak-green-900">{formData.wealthStatement.netWorthStart} PKR</span></div>}
                        {formData.wealthStatement.cash && <div className="flex justify-between"><span className="text-gray-500 font-bold">Cash in Hand</span><span className="font-black text-pak-green-900">{formData.wealthStatement.cash} PKR</span></div>}
                    </div>

                    {/* Dynamic List Rendering */}
                    {['properties', 'vehicles', 'banks', 'liabilities'].map(key => {
                        const items = formData.wealthStatement[key];
                        if (!items || items.length === 0) return null;
                        return (
                            <div key={key} className="pt-3 border-t border-dashed border-gray-200">
                                <p className="text-xs font-black uppercase text-gray-400 mb-2">{key}</p>
                                <div className="space-y-2">
                                    {items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between text-xs bg-gray-50 p-2 rounded-lg">
                                            <span className="font-medium text-gray-700">{item.address || item.make || item.bankName || item.description || "Item"}</span>
                                            <span className="font-bold text-gray-900">{item.cost || item.balance || item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        },
        {
            title: 'Expenses',
            icon: TrendingDown,
            step: 8,
            content: formData.expenses && (
                <div className="text-sm space-y-2">
                    {formData.expenses.simpleTotal ? (
                        <div className="flex justify-between"><span className="text-gray-500 font-bold">Total Expenses (Simple)</span><span className="font-black text-pak-green-900">{formData.expenses.simpleTotal} PKR</span></div>
                    ) : (
                        <div>
                            <p className="text-gray-500 font-bold mb-2">Detailed Breakdown</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                                {Object.entries(formData.expenses.detailed).map(([key, value]) => (
                                    value ? <div key={key} className="flex justify-between py-1 border-b border-gray-100 last:border-0"><span>{key}</span><span className="font-bold">{value as string}</span></div> : null
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Review Your Information</h2>
                <p className="text-gray-500 font-bold">Please verify all details before final submission</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-xl shadow-pak-green-900/5 hover:border-pak-green-200 transition-colors relative group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-pak-green-100 rounded-xl flex items-center justify-center">
                                    <section.icon className="w-5 h-5 text-pak-green-600" />
                                </div>
                                <h3 className="text-lg font-black text-pak-green-950 uppercase tracking-tight">{section.title}</h3>
                            </div>
                            {onEdit && (
                                <button
                                    onClick={() => onEdit(section.step)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-pak-green-600 hover:bg-pak-green-50 rounded-lg"
                                    title="Edit Section"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="pl-[52px]">
                            {section.content}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                >
                    Back
                </button>
                <MotionButton
                    type="button"
                    onClick={onContinue}
                    variant="primary"
                    className="px-8 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 shadow-lg shadow-pak-green-900/20"
                    rightIcon={<CheckCircle className="w-4 h-4" />}
                >
                    Confirm & Proceed
                </MotionButton>
            </div>
        </div>
    );
}
