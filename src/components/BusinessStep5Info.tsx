import { Building2, Hash, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface BusinessStep5InfoProps {
    onContinue: (data: any) => void;
    onBack: () => void;
    selectedType: string;
}

export default function BusinessStep5Info({ onContinue, onBack, selectedType }: BusinessStep5InfoProps) {
    const [formData, setFormData] = useState({
        name: '',
        ntn: '',
        revenue: '',
    });

    const getTitle = () => {
        // Basic capitalization or mapping
        if (!selectedType) return 'Business Information';
        return selectedType.charAt(0).toUpperCase() + selectedType.slice(1) + ' Information';
    };

    // VALIDATION REMOVED: Continue always enabled
    const handleContinue = () => {
        onContinue(formData);
    };

    return (
        <div className="max-w-[1000px] mx-auto">
            <div className="text-left mb-10 pl-2">
                <h2 className="text-3xl font-black text-pak-green-950 mb-2 flex items-center gap-3">
                    {getTitle()}
                    <span className="w-2 h-2 rounded-full bg-gray-300 transform translate-y-1"></span>
                </h2>
                <p className="text-gray-500 font-medium">
                    Just fill in the info below to move ahead!
                </p>
            </div>

            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-10 shadow-xl shadow-pak-green-900/5 mb-8">
                <h3 className="text-lg font-black text-pak-green-950 mb-8 uppercase tracking-tight border-b border-gray-100 pb-4">Business Details</h3>

                <div className="space-y-8">
                    <div className="relative group">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
                            Business Name
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold"
                                placeholder="e.g. Nam Studios"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
                            Business NTN #
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                            <input
                                type="text"
                                value={formData.ntn}
                                onChange={(e) => setFormData({ ...formData, ntn: e.target.value })}
                                className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold"
                                placeholder="e.g. 2452352435"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">
                            Your Business Annual Revenue
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                            <input
                                type="text"
                                value={formData.revenue}
                                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                                className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold"
                                placeholder="e.g. 7,895,689"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-[2px] text-gray-500 hover:text-pak-green-900 hover:border-pak-green-200 transition-all shadow-sm hover:shadow-md"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <button
                    onClick={handleContinue}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
