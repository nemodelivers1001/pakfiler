import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Search, X, Building, CreditCard, User, Smartphone, MapPin, KeyRound, Lock, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IRISSalaryDetails } from '../types/iris';

interface IRISStep2SalaryInfoProps {
  onContinue: (data: Partial<IRISSalaryDetails>) => void;
  onBack: () => void;
  initialData: Partial<IRISSalaryDetails>;
  selectedType: 'salary' | 'business';
  amount: number;
}

const PAKISTANI_BANKS = [
  'Advance Micro Finance Bank Limited',
  'Al Baraka Bank (Pakistan) Limited',
  'Allied Bank Limited',
  'Askari Bank Limited',
  'Bank Alfalah Limited',
  'Bank Al-Habib Limited',
  'Bank Islami Pakistan Limited',
  'Burj Bank Limited',
  'Dubai Islamic Bank Limited',
  'Faysal Bank Limited',
  'First Women Bank Limited',
  'Habib Bank Limited',
  'Habib Metropolitan Bank Limited',
  'JS Bank Limited',
  'MCB Bank Limited',
  'MCB Islamic Bank Limited',
  'Meezan Bank Limited',
  'National Bank of Pakistan',
  'NIB Bank Limited',
  'Samba Bank Limited',
  'Silk Bank Limited',
  'Soneri Bank Limited',
  'Standard Chartered Bank (Pakistan) Limited',
  'Summit Bank Limited',
  'Syndicate Bank Limited',
  'The Bank of Punjab',
  'The Bank of Khyber',
  'United Bank Limited',
];

export default function IRISStep2SalaryInfo({
  onContinue,
  onBack,
  initialData,
  selectedType,
  amount,
}: IRISStep2SalaryInfoProps) {
  const [formData, setFormData] = useState<Partial<IRISSalaryDetails>>({
    email: '',
    mobile: '',
    present_address: '',
    fbr_iris_registration_id: '',
    fbr_iris_pin: '',
    fbr_iris_password: '',
    bank_name: '',
    iban: '',
    employer_name: '',
    monthly_salary: undefined,
    tax_deducted: undefined,
    ...initialData,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState('');

  const filteredBanks = PAKISTANI_BANKS.filter(bank =>
    bank.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  const handleInputChange = (field: keyof IRISSalaryDetails, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBankSelect = (bankName: string) => {
    handleInputChange('bank_name', bankName);
    setShowBankModal(false);
    setBankSearchQuery('');
  };

  // VALIDATION REMOVED
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden bg-white/40 backdrop-blur-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-pak-green-950 mb-3 uppercase tracking-tight">IRIS Credentials</h2>
          <p className="text-gray-400 font-bold text-sm tracking-wide uppercase mb-6">
            Enter your login details to synchronize your profile
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-pak-green-50 border border-pak-green-100 text-pak-green-700 text-xs font-black uppercase tracking-wider">
            <span>{selectedType} UPDATE</span>
            <div className="w-1 h-1 bg-pak-green-300 rounded-full"></div>
            <span>Rs {amount}</span>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Mobile Number</label>
              <div className="relative">
                <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={e => handleInputChange('mobile', e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold"
                  placeholder="03001234567"
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Current Address</label>
            <div className="relative">
              <MapPin className="absolute left-6 top-6 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
              <textarea
                value={formData.present_address}
                onChange={e => handleInputChange('present_address', e.target.value)}
                rows={2}
                className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-pak-green-200 focus:bg-white transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-inner placeholder:text-gray-500 placeholder:font-bold resize-none"
                placeholder="Complete residential address"
              />
            </div>
          </div>

          {/* FBR Credentials */}
          <div className="bg-white/40 rounded-[32px] p-8 border border-white/60 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-pak-green-100 flex items-center justify-center text-pak-green-600">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-pak-green-950 uppercase tracking-widest">FBR Credentials</h3>
            </div>

            <div className="relative group">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">Registration ID / CNIC</label>
              <div className="relative">
                <FileText className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                <input
                  type="text"
                  value={formData.fbr_iris_registration_id}
                  onChange={e => handleInputChange('fbr_iris_registration_id', e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent focus:border-pak-green-200 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-sm placeholder:text-gray-500 placeholder:font-bold"
                  placeholder="35202-1234567-8"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">IRIS PIN</label>
                <input
                  type="text"
                  value={formData.fbr_iris_pin}
                  onChange={e => handleInputChange('fbr_iris_pin', e.target.value)}
                  className="w-full px-6 py-5 bg-white border-2 border-transparent focus:border-pak-green-200 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-sm placeholder:text-gray-500 placeholder:font-bold text-center tracking-widest"
                  placeholder="****"
                />
              </div>
              <div className="relative group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3 ml-1">IRIS Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.fbr_iris_password}
                    onChange={e => handleInputChange('fbr_iris_password', e.target.value)}
                    className="w-full pl-6 pr-14 py-5 bg-white border-2 border-transparent focus:border-pak-green-200 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-sm placeholder:text-gray-500 placeholder:font-bold tracking-widest"
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pak-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Info */}
          <div className="bg-pak-green-50/50 rounded-[32px] p-8 border border-pak-green-100/50 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-pak-green-600 shadow-sm">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-pak-green-950 uppercase tracking-widest">Bank Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-[10px] font-black text-pak-green-800/60 uppercase tracking-[2px] mb-3 ml-1">Bank Name</label>
                <button
                  type="button"
                  onClick={() => setShowBankModal(true)}
                  className="w-full px-6 py-5 bg-white border-2 border-transparent focus:border-pak-green-200 transition-all text-left flex items-center justify-between rounded-2xl shadow-sm group-hover:shadow-md"
                >
                  <span className={`text-lg font-black truncate ${formData.bank_name ? 'text-pak-green-950' : 'text-gray-300'}`}>
                    {formData.bank_name || 'Select Bank'}
                  </span>
                  <Building className="w-5 h-5 text-gray-300 group-hover:text-pak-green-500" />
                </button>
              </div>
              <div className="relative group">
                <label className="block text-[10px] font-black text-pak-green-800/60 uppercase tracking-[2px] mb-3 ml-1">IBAN Number</label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={e => handleInputChange('iban', e.target.value.toUpperCase())}
                  className="w-full px-6 py-5 bg-white border-2 border-transparent focus:border-pak-green-200 transition-all text-lg font-black text-pak-green-950 outline-none rounded-2xl shadow-sm placeholder:text-gray-500 placeholder:font-bold uppercase"
                  placeholder="PK36 MEZN..."
                />
              </div>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
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
            Save & Continue
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showBankModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowBankModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white pt-10">
                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Select Bank</h3>
                <button onClick={() => setShowBankModal(false)} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6 bg-gray-50/50">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-500 transition-colors" />
                  <input
                    type="text"
                    value={bankSearchQuery}
                    onChange={e => setBankSearchQuery(e.target.value)}
                    placeholder="Search bank name..."
                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent focus:border-pak-green-200 transition-all font-bold text-pak-green-950 outline-none rounded-2xl shadow-sm placeholder:text-gray-500"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-2">
                {filteredBanks.map(bank => (
                  <button
                    key={bank}
                    onClick={() => handleBankSelect(bank)}
                    className="w-full px-6 py-4 text-left hover:bg-pak-green-50 rounded-2xl transition-all group border-b border-gray-50 last:border-0"
                  >
                    <p className="text-sm font-bold text-gray-600 group-hover:text-pak-green-700">{bank}</p>
                  </button>
                ))}
                {filteredBanks.length === 0 && (
                  <p className="text-center py-12 text-gray-400 font-bold text-sm">No banks found</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
