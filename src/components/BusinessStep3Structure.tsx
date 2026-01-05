import { User, Users, Building2, Heart, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BusinessStep3StructureProps {
    onContinue: (structure: { id: string; price: number; title: string }) => void;
    onBack: () => void;
}

export default function BusinessStep3Structure({ onContinue, onBack }: BusinessStep3StructureProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const structures = [
        {
            id: 'proprietor',
            title: 'Individual/Sole Proprietor',
            description: 'Single owner business entity',
            price: 3000,
            time: '3-5 working days',
            icon: User,
            color: 'bg-emerald-50 text-emerald-600'
        },
        {
            id: 'partnership',
            title: 'Partnership / AOP',
            description: 'Association of Persons or Partnership',
            price: 4500,
            time: '3-5 working days',
            icon: Users,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            id: 'company',
            title: 'Private Limited Company',
            description: 'Private limited liability company',
            price: 6000,
            time: '3-5 working days',
            icon: Building2,
            color: 'bg-indigo-50 text-indigo-600'
        },
        {
            id: 'npo',
            title: 'Non Profit / Charitable Trusts',
            description: 'Non-profit organization or trust',
            price: 9000,
            time: '3-5 working days',
            icon: Heart,
            color: 'bg-rose-50 text-rose-600'
        }
    ];

    const handleContinue = () => {
        const selected = structures.find(s => s.id === selectedId) || structures[0];
        onContinue(selected);
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="text-left mb-10 pl-2">
                <h2 className="text-3xl font-black text-pak-green-950 mb-2">
                    Select Legal Structure
                </h2>
                <p className="text-gray-500 font-medium">
                    Choose your business legal structure to determine applicable fees and requirements.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {structures.map((item) => {
                    const isSelected = selectedId === item.id;
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`cursor-pointer relative p-8 rounded-[32px] border-2 transition-all duration-300 ${isSelected
                                ? 'bg-white border-pak-green-500 shadow-xl shadow-pak-green-900/10'
                                : 'bg-white border-gray-100 hover:border-pak-green-200 hover:shadow-lg'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-pak-green-100 text-pak-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-pak-green-950 mb-1">{item.title}</h3>
                                        <p className="text-gray-400 text-sm font-medium">{item.description}</p>
                                    </div>
                                </div>
                                {isSelected && (
                                    <div className="w-8 h-8 bg-pak-green-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-end justify-between border-t border-gray-50 pt-6">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Fees:</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Completion Time:</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-pak-green-950 mb-1">Rs {item.price.toLocaleString()}</p>
                                    <p className="text-xs font-bold text-pak-green-950">{item.time}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
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
                    onClick={handleContinue}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Continue
                    <ArrowRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
