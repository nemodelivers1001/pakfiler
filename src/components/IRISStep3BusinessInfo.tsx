import { useState } from 'react';
import { ArrowLeft, Plus, Building2, Trash2, X, Briefcase, CreditCard, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IRISBusinessDetails } from '../types/iris';

interface IRISStep3BusinessInfoProps {
  onContinue: (data: Partial<IRISBusinessDetails>) => void;
  onBack: () => void;
  initialData: Partial<IRISBusinessDetails>;
}

export default function IRISStep3BusinessInfo({
  onContinue,
  onBack,
  initialData,
}: IRISStep3BusinessInfoProps) {
  const [businesses, setBusinesses] = useState(initialData.businesses || []);
  const [showModal, setShowModal] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState({
    businessName: '',
    acquisitionDate: '',
    capacity: '',
    activity: '',
    bankAccount: '',
  });

  // VALIDATION REMOVED: Save always allowed
  const handleSaveBusiness = () => {
    // If empty, just save with defaults or empty strings
    setBusinesses([...businesses, { ...currentBusiness, id: Date.now().toString() }]);
    setShowModal(false);
    setCurrentBusiness({
      businessName: '',
      acquisitionDate: '',
      capacity: '',
      activity: '',
      bankAccount: '',
    });
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinesses(businesses.filter(b => b.id !== id));
  };

  // VALIDATION REMOVED: Submit always allowed
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({ businesses });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden bg-white/40 backdrop-blur-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-pak-green-950 mb-3 uppercase tracking-tight">
            Business Portfolio
          </h2>
          <p className="text-gray-400 font-bold text-sm tracking-wide uppercase mb-6">
            Manage your business entities and bank associations
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-pak-green-50 hover:bg-pak-green-100 text-pak-green-700 rounded-2xl font-black text-xs uppercase tracking-[2px] transition-all duration-300 border border-pak-green-200 hover:border-pak-green-300 hover:scale-105 hover:shadow-lg hover:shadow-pak-green-900/10"
          >
            <Plus className="w-4 h-4" />
            Add New Business
          </button>
        </div>

        <div className="space-y-4 mb-12 min-h-[200px]">
          <AnimatePresence>
            {businesses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-[32px] bg-white/30"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-black text-gray-400 uppercase tracking-widest mb-1">No Businesses Added</h3>
                <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Click "Add New Business" to get started</p>
              </motion.div>
            ) : (
              businesses.map((business, index) => (
                <motion.div
                  key={business.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative p-6 bg-white/60 hover:bg-white border border-white/60 rounded-[32px] shadow-sm hover:shadow-lg hover:shadow-pak-green-900/5 transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pak-green-50 to-white flex items-center justify-center shadow-sm text-pak-green-600 border border-pak-green-100/50">
                        <Building2 className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight mb-1">
                          {business.businessName || 'Unnamed Business'}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {business.activity && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-gray-100">
                              {business.activity}
                            </span>
                          )}
                          {business.capacity && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-gray-100">
                              {business.capacity}
                            </span>
                          )}
                        </div>
                        {business.bankAccount && (
                          <div className="flex items-center gap-2 text-xs font-bold text-pak-green-700/70">
                            <CreditCard className="w-3.5 h-3.5" />
                            <span className="uppercase tracking-wide">{business.bankAccount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteBusiness(business.id!)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Remove Business"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-pak-green-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Previous Step
          </button>

          <button
            onClick={handleSubmit}
            className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
          >
            Submit Application
            <Check className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Modal for Adding Business */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Add Business</h3>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Input Fields */}
                <div className="relative group">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Business Name</label>
                  <input
                    type="text"
                    value={currentBusiness.businessName}
                    onChange={(e) => setCurrentBusiness({ ...currentBusiness, businessName: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl placeholder:text-gray-500 placeholder:font-bold"
                    placeholder="e.g. Acme Traders"
                  />
                </div>

                <div className="relative group">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Acquisition Date</label>
                  <input
                    type="date"
                    value={currentBusiness.acquisitionDate}
                    onChange={(e) => setCurrentBusiness({ ...currentBusiness, acquisitionDate: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl text-gray-500 uppercase tracking-wider font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Capacity</label>
                    <select
                      value={currentBusiness.capacity}
                      onChange={(e) => setCurrentBusiness({ ...currentBusiness, capacity: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all font-bold text-pak-green-950 outline-none rounded-2xl appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="Owner">Owner</option>
                      <option value="Partner">Partner</option>
                      <option value="Director">Director</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Activity</label>
                    <input
                      type="text"
                      value={currentBusiness.activity}
                      onChange={(e) => setCurrentBusiness({ ...currentBusiness, activity: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all font-bold text-pak-green-950 outline-none rounded-2xl placeholder:text-gray-500"
                      placeholder="e.g. Retail"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Bank Account</label>
                  <input
                    type="text"
                    value={currentBusiness.bankAccount}
                    onChange={(e) => setCurrentBusiness({ ...currentBusiness, bankAccount: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all font-bold text-pak-green-950 outline-none rounded-2xl placeholder:text-gray-500"
                    placeholder="Account Title / Number"
                  />
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 flex justify-end gap-4 bg-gray-50/30">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBusiness}
                  className="px-8 py-3 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg transition-all hover:scale-105"
                >
                  Add Business
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
