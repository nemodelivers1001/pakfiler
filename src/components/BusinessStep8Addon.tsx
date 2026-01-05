import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface BusinessStep8AddonProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

export default function BusinessStep8Addon({ onContinue, onBack }: BusinessStep8AddonProps) {
    const [formData, setFormData] = useState({
        // Balance Sheet
        totalAssets: '',
        totalLiabilities: '',
        totalCapital: '',
        plantMachinery: '',
        longTermLoan: '',
        advances: '',
        otherLiabilities: '',
        stocks: '',
        tradeCreditors: '',
        cashBalance: '',
        otherAssets: '',

        // Adjustable
        hasAdjustableTax: false,
        adjustableDescription: '',
        adjustableAmount: ''
    });

    return (
        <div className="max-w-[1200px] mx-auto pb-12">
            <div className="text-left mb-10 pl-2">
                <h2 className="text-3xl font-black text-pak-green-950 mb-2">
                    Optional Add-on
                </h2>
                <p className="text-gray-500 font-medium">
                    Balance sheet details and other items
                </p>
            </div>

            {/* Balance Sheet Section */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl shadow-pak-green-900/5 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-pak-green-950 uppercase tracking-tight">Balance Sheet</h3>
                    <span className="text-xs font-bold text-gray-400">Less ^</span>
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-8">Assets should equal Liabilities + Capital</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Total Assets</label>
                        <input type="text" value={formData.totalAssets} onChange={(e) => setFormData({ ...formData, totalAssets: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Total Liabilities</label>
                        <input type="text" value={formData.totalLiabilities} onChange={(e) => setFormData({ ...formData, totalLiabilities: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Total Capital</label>
                        <input type="text" value={formData.totalCapital} onChange={(e) => setFormData({ ...formData, totalCapital: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Plant/Machinery/Equipment</label>
                        <input type="text" value={formData.plantMachinery} onChange={(e) => setFormData({ ...formData, plantMachinery: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Long Term Borrowings/Debt</label>
                        <input type="text" value={formData.longTermLoan} onChange={(e) => setFormData({ ...formData, longTermLoan: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                    {/* Spacing filler if needed or reflow */}

                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Advances/Deposits/Prepay</label>
                        <input type="text" value={formData.advances} onChange={(e) => setFormData({ ...formData, advances: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Other Liabilities</label>
                        <input type="text" value={formData.otherLiabilities} onChange={(e) => setFormData({ ...formData, otherLiabilities: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>

                    <div className="space-y-2 lg:col-start-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Stocks/Stores/Spares</label>
                        <input type="text" value={formData.stocks} onChange={(e) => setFormData({ ...formData, stocks: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Trade Creditors/Payable</label>
                        <input type="text" value={formData.tradeCreditors} onChange={(e) => setFormData({ ...formData, tradeCreditors: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>

                    <div className="space-y-2 lg:col-start-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Cash/Bank Balance</label>
                        <input type="text" value={formData.cashBalance} onChange={(e) => setFormData({ ...formData, cashBalance: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>

                    <div className="space-y-2 lg:col-start-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Other Assets</label>
                        <input type="text" value={formData.otherAssets} onChange={(e) => setFormData({ ...formData, otherAssets: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-pak-green-950 focus:border-pak-green-200 outline-none" />
                    </div>
                </div>
            </div>

            {/* Other Adjustable Taxes */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl shadow-pak-green-900/5 mb-8">
                <h3 className="text-lg font-black text-pak-green-950 mb-6 uppercase tracking-tight">Other Adjustable Taxes</h3>
                <p className="text-gray-500 font-bold text-sm mb-4">Have you paid any other adjustable taxes that you wish to claim?</p>

                <div className="flex items-center gap-6 mb-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.hasAdjustableTax ? 'border-pak-green-500' : 'border-gray-300'}`}>
                            {formData.hasAdjustableTax && <div className="w-2.5 h-2.5 bg-pak-green-500 rounded-full" />}
                        </div>
                        <input type="radio" className="hidden" checked={formData.hasAdjustableTax} onChange={() => setFormData({ ...formData, hasAdjustableTax: true })} />
                        <span className="text-sm font-bold text-pak-green-950">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!formData.hasAdjustableTax ? 'border-pak-green-500' : 'border-gray-300'}`}>
                            {!formData.hasAdjustableTax && <div className="w-2.5 h-2.5 bg-pak-green-500 rounded-full" />}
                        </div>
                        <input type="radio" className="hidden" checked={!formData.hasAdjustableTax} onChange={() => setFormData({ ...formData, hasAdjustableTax: false })} />
                        <span className="text-sm font-bold text-pak-green-950">No</span>
                    </label>
                </div>

                {formData.hasAdjustableTax && (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Description</label>
                            <div className="relative">
                                <select
                                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none appearance-none"
                                    value={formData.adjustableDescription}
                                    onChange={(e) => setFormData({ ...formData, adjustableDescription: e.target.value })}
                                >
                                    <option value="">Select Description</option>
                                    <option value="distributors">Purchases by Distributors / Dealers / Wholesalers</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Tax Deducted</label>
                            <input
                                type="text"
                                value={formData.adjustableAmount}
                                onChange={(e) => setFormData({ ...formData, adjustableAmount: e.target.value })}
                                className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl font-bold text-pak-green-950 focus:border-pak-green-200 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>
                )}
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
