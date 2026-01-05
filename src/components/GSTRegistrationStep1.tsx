import { useState } from 'react';
import { ArrowRight, Building2, Calendar, Briefcase, FileText, MapPin, Zap, Sparkles, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_TYPES, BUSINESS_NATURES, BusinessInformationData } from '../types/gst';
import { MotionInput } from './ui/MotionInput';
import { MotionSelect } from './ui/MotionSelect';
import { useMobile } from '../hooks/useMobile';

interface GSTRegistrationStep1Props {
  initialData: BusinessInformationData;
  onNext: (data: BusinessInformationData) => void;
  onCancel: () => void;
}

export default function GSTRegistrationStep1({ initialData, onNext, onCancel }: GSTRegistrationStep1Props) {
  const [formData, setFormData] = useState<BusinessInformationData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessInformationData, string>>>({});
  const isMobile = useMobile();

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BusinessInformationData, string>> = {};

    if (!formData.business_name.trim()) {
      newErrors.business_name = 'Business name is required';
    }
    if (!formData.business_type) {
      newErrors.business_type = 'Business type is required';
    }
    if (!formData.business_nature) {
      newErrors.business_nature = 'Business nature is required';
    }
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    if (!formData.business_address.trim()) {
      newErrors.business_address = 'Business address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (field: keyof BusinessInformationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="space-y-10">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 sm:p-12 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-pak-green-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none"></div>

            <div className="relative z-10 space-y-10">
              <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 bg-pak-green-50 rounded-lg flex items-center justify-center text-pak-green-600">
                  <Briefcase className="w-4 h-4" />
                </div>
                Primary Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 xl:ml-1">Business Identity Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                    <input
                      type="text"
                      value={formData.business_name}
                      onChange={(e) => handleChange('business_name', e.target.value)}
                      placeholder="e.g. Acme Corporations"
                      className={`w-full pl-16 pr-6 py-5 bg-white/50 border-2 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner ${errors.business_name ? 'border-red-500 bg-red-50/50' : 'border-transparent focus:border-pak-green-200 focus:bg-white'}`}
                    />
                  </div>
                  {errors.business_name && <p className="mt-2 ml-2 text-xs font-bold text-red-500 uppercase tracking-widest">{errors.business_name}</p>}
                </div>

                <MotionSelect
                  label="Business Entity Type"
                  options={BUSINESS_TYPES}
                  value={formData.business_type}
                  onChange={(val) => handleChange('business_type', val)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 xl:ml-1">Date of Establishment</label>
                  <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleChange('start_date', e.target.value)}
                      className={`w-full pl-16 pr-6 py-5 bg-white/50 border-2 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner ${errors.start_date ? 'border-red-500 bg-red-50/50' : 'border-transparent focus:border-pak-green-200 focus:bg-white'}`}
                    />
                  </div>
                  {errors.start_date && <p className="mt-2 ml-2 text-xs font-bold text-red-500 uppercase tracking-widest">{errors.start_date}</p>}
                </div>

                <MotionSelect
                  label="Industry / Business Nature"
                  options={BUSINESS_NATURES}
                  value={formData.business_nature}
                  onChange={(val) => handleChange('business_nature', val)}
                />
              </div>

              <div className="pt-6 border-t border-gray-100/50">
                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-pak-green-50 rounded-lg flex items-center justify-center text-pak-green-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  Operational Infrastructure
                </h3>

                <div className="space-y-8">
                  <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 xl:ml-1">Registered Business Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-6 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                      <textarea
                        value={formData.business_address}
                        onChange={(e) => handleChange('business_address', e.target.value)}
                        placeholder="Enter the full legal address of your business"
                        rows={3}
                        className={`w-full pl-16 pr-6 py-5 bg-white/50 border-2 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner resize-none ${errors.business_address ? 'border-red-500 bg-red-50/50' : 'border-transparent focus:border-pak-green-200 focus:bg-white'}`}
                      />
                    </div>
                    {errors.business_address && <p className="mt-2 ml-2 text-xs font-bold text-red-500 uppercase tracking-widest">{errors.business_address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 xl:ml-1 text-nowrap whitespace-nowrap overflow-hidden">Consumer # (Gas/Electricity)</label>
                      <div className="relative group">
                        <Zap className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                        <input
                          type="text"
                          value={formData.consumer_number}
                          onChange={(e) => handleChange('consumer_number', e.target.value)}
                          placeholder="Utility reference number"
                          className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 xl:ml-1 uppercase">Business Brief (Optional)</label>
                      <div className="relative group">
                        <FileText className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                        <input
                          type="text"
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          placeholder="Small summary of operations"
                          className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Panel */}
        <div className="xl:col-span-4 space-y-8">
          <div className="glass-card p-8 rounded-[32px] border-white/60 bg-white/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-pak-green-50 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-pak-green-600" />
              </div>
              <h3 className="text-lg font-black text-pak-green-950 uppercase tracking-tight">Filing Accuracy</h3>
            </div>
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6">
              Ensure all details match your legal documents. Inaccurate information can lead to registration delays at FBR.
            </p>
            <div className="space-y-3">
              {['Valid NTN Required', 'Active Mobile Number', 'Operational Email'].map(item => (
                <div key={item} className="flex items-center gap-3 text-[11px] font-black text-pak-green-800 uppercase tracking-wider">
                  <div className="w-5 h-5 bg-pak-green-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full group bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white py-6 rounded-[32px] font-black uppercase text-xs tracking-[4px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
          >
            Continue to Step 2
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 text-center">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2">Need help with filing?</p>
              <p className="text-sm font-bold text-pak-green-900 cursor-pointer hover:underline">Contact our Support Team</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
