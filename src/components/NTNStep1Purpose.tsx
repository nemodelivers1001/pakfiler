import { useState } from 'react';
import { User, Store, Users, Building2, Heart, Check, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NTNStep1PurposeProps {
    onContinue: (purpose: { type: string; amount: number; title: string }) => void;
}

const purposes = [
    {
        id: 'salaried',
        title: 'Salaried',
        description: 'For individuals earning salary from employment',
        amount: 500,
        time: '1-2 Working Days',
        icon: User,
    },
    {
        id: 'proprietor',
        title: 'Sole Proprietor',
        description: 'For individual business owners',
        amount: 1500,
        time: '1-2 Working Days',
        icon: Store,
    },
    {
        id: 'partnership',
        title: 'Partnership or AOP',
        description: 'For partnerships and association of persons',
        amount: 3500,
        time: '2-3 Working Days',
        icon: Users,
    },
    {
        id: 'company',
        title: 'Company',
        description: 'For registered companies and corporations',
        amount: 7000,
        time: '2-3 Working Days',
        icon: Building2,
    },
    {
        id: 'npo',
        title: 'NPO',
        description: 'For non-profit organizations',
        amount: 9000,
        time: '2-3 Working Days',
        icon: Heart,
    },
];

export default function NTNStep1Purpose({ onContinue }: NTNStep1PurposeProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleContinue = () => {
        const selected = purposes.find(p => p.id === selectedId);
        if (selected) {
            onContinue({
                type: selected.id,
                amount: selected.amount,
                title: selected.title,
            });
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="glass-card p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden bg-white/40 backdrop-blur-xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-pak-green-950 mb-4 uppercase tracking-tight">
                        Select Your Status
                    </h2>
                    <p className="text-gray-400 font-bold text-sm tracking-wide uppercase">
                        Choose the category that best describes your registration purpose
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
                    {purposes.map((purpose) => {
                        const Icon = purpose.icon;
                        const isSelected = selectedId === purpose.id;

                        return (
                            <motion.button
                                key={purpose.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedId(purpose.id)}
                                className={`relative p-6 rounded-[32px] border transition-all duration-500 text-left group h-full flex flex-col ${isSelected
                                    ? 'border-pak-green-500 bg-gradient-to-br from-white to-pak-green-50 shadow-xl shadow-pak-green-900/10'
                                    : 'border-white/60 bg-white/40 hover:bg-white/60 hover:border-pak-green-200'
                                    }`}
                            >
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-3 -right-3 w-8 h-8 bg-pak-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-pak-green-500/30 ring-4 ring-white"
                                    >
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </motion.div>
                                )}

                                <div className="flex-1 flex flex-col items-center text-center">
                                    <div
                                        className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 mb-6 ${isSelected
                                            ? 'bg-pak-green-500 shadow-xl shadow-pak-green-500/20 text-white'
                                            : 'bg-pak-green-50 text-pak-green-300 group-hover:bg-pak-green-100 group-hover:text-pak-green-500'
                                            }`}
                                    >
                                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-lg font-black text-pak-green-950 mb-3 uppercase tracking-tight">
                                        {purpose.title}
                                    </h3>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-6 flex-1">
                                        {purpose.description}
                                    </p>

                                    <div className="w-full">
                                        <div className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/50 border border-white/60 mb-4">
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-wider">Fee</span>
                                            <span className="text-base font-black text-pak-green-600">Rs {purpose.amount.toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center justify-center gap-2 text-gray-400 text-[9px] font-black uppercase tracking-widest">
                                            <Clock className="w-3 h-3" />
                                            <span>{purpose.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="flex items-center justify-end pt-8 border-t border-gray-100">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedId}
                        className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Continue Next
                        <ArrowRight className="w-5 h-5 text-pak-green-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}
