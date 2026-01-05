import { Store, Globe, Ship, Factory, TrendingUp, Package, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BusinessStep4TypeProps {
    onContinue: (type: string) => void;
    onBack: () => void;
}

export default function BusinessStep4Type({ onContinue, onBack }: BusinessStep4TypeProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const types = [
        {
            id: 'dealer',
            title: 'Dealer',
            description: 'Sells goods to customers',
            icon: Store,
            color: 'bg-emerald-50 text-emerald-600'
        },
        {
            id: 'exporter',
            title: 'Exporter',
            description: 'Sells goods internationally',
            icon: Globe,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            id: 'importer',
            title: 'Importer',
            description: 'Imports goods from abroad',
            icon: Ship,
            color: 'bg-cyan-50 text-cyan-600'
        },
        {
            id: 'manufacturer',
            title: 'Manufacturer',
            description: 'Creates products from raw materials',
            icon: Factory,
            color: 'bg-indigo-50 text-indigo-600'
        },
        {
            id: 'trader',
            title: 'Trader',
            description: 'Buys and sells goods',
            icon: TrendingUp,
            color: 'bg-teal-50 text-teal-600'
        },
        {
            id: 'wholesaler',
            title: 'Wholesaler',
            description: 'Sells goods in bulk to retailers',
            icon: Package,
            color: 'bg-violet-50 text-violet-600'
        }
    ];

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="text-left mb-10 pl-2">
                <h2 className="text-3xl font-black text-pak-green-950 mb-2">
                    Select Business Type
                </h2>
                <p className="text-gray-500 font-medium">
                    Select the type of business you operate for tax filing purposes.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {types.map((type) => {
                    const isSelected = selectedType === type.id;
                    const Icon = type.icon;

                    return (
                        <motion.div
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`cursor-pointer relative p-6 rounded-[24px] border-2 transition-all duration-300 flex items-center gap-5 ${isSelected
                                ? 'bg-white border-pak-green-500 shadow-xl shadow-pak-green-900/10'
                                : 'bg-white border-gray-100 hover:border-pak-green-200 hover:shadow-lg'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-pak-green-100 text-pak-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                <Icon className="w-7 h-7" />
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-pak-green-950 mb-1 leading-tight">{type.title}</h3>
                                <p className="text-gray-400 text-xs font-medium leading-tight">{type.description}</p>
                            </div>

                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-pak-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white"
                                >
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </motion.div>
                            )}
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
                    onClick={() => onContinue(selectedType || types[0].id)}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Continue
                    <ArrowRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
