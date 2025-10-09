import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Search, X, Building, CreditCard } from 'lucide-react';
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredBanks = PAKISTANI_BANKS.filter(bank =>
    bank.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  const handleInputChange = (field: keyof IRISSalaryDetails, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBankSelect = (bankName: string) => {
    handleInputChange('bank_name', bankName);
    setShowBankModal(false);
    setBankSearchQuery('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{11}$/.test(formData.mobile))
      newErrors.mobile = 'Mobile must be 11 digits';

    if (!formData.present_address) newErrors.present_address = 'Address is required';
    if (!formData.fbr_iris_registration_id)
      newErrors.fbr_iris_registration_id = 'FBR/IRIS Registration ID is required';
    if (!formData.fbr_iris_pin) newErrors.fbr_iris_pin = 'FBR/IRIS PIN is required';
    if (!formData.fbr_iris_password)
      newErrors.fbr_iris_password = 'FBR/IRIS Password is required';
    if (!formData.bank_name) newErrors.bank_name = 'Bank selection is required';
    if (!formData.iban) newErrors.iban = 'IBAN is required';
    else if (!/^PK\d{2}[A-Z]{4}\d{16}$/.test(formData.iban.replace(/\s/g, '')))
      newErrors.iban = 'Invalid IBAN format (PK followed by 2 digits, 4 letters, and 16 digits)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onContinue(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Update IRIS Profile</h2>
          <p className="text-slate-600 mb-4">
            Enter your profile information to update in the IRIS system
          </p>
          <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
            Selected: {selectedType.toUpperCase()} - Rs {amount}
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile No. <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={e => handleInputChange('mobile', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.mobile
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                }`}
                placeholder="03001234567"
                maxLength={11}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Present Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.present_address}
              onChange={e => handleInputChange('present_address', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.present_address
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
              }`}
              placeholder="Enter your complete address"
            />
            {errors.present_address && (
              <p className="text-red-500 text-sm mt-1">{errors.present_address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              FBR / IRIS Registration or ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fbr_iris_registration_id}
              onChange={e => handleInputChange('fbr_iris_registration_id', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.fbr_iris_registration_id
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
              }`}
              placeholder="Enter your FBR/IRIS Registration ID"
            />
            {errors.fbr_iris_registration_id && (
              <p className="text-red-500 text-sm mt-1">{errors.fbr_iris_registration_id}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                FBR / IRIS Pin <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fbr_iris_pin}
                onChange={e => handleInputChange('fbr_iris_pin', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.fbr_iris_pin
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                }`}
                placeholder="Enter PIN"
              />
              {errors.fbr_iris_pin && (
                <p className="text-red-500 text-sm mt-1">{errors.fbr_iris_pin}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                FBR / IRIS Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.fbr_iris_password}
                  onChange={e => handleInputChange('fbr_iris_password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.fbr_iris_password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.fbr_iris_password && (
                <p className="text-red-500 text-sm mt-1">{errors.fbr_iris_password}</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Bank Account Details <span className="text-red-500">*</span>
            </p>
            <p className="text-xs text-blue-700 mb-4">
              At least one bank account is required
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bank <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowBankModal(true)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-left flex items-center justify-between ${
                    errors.bank_name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                  }`}
                >
                  <span className={formData.bank_name ? 'text-slate-900' : 'text-slate-400'}>
                    {formData.bank_name || 'Select bank'}
                  </span>
                  <Building className="w-5 h-5 text-slate-400" />
                </button>
                {errors.bank_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.bank_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  IBAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={e => handleInputChange('iban', e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.iban
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                  }`}
                  placeholder="PK36ABCD0000001234567890"
                />
                {errors.iban && <p className="text-red-500 text-sm mt-1">{errors.iban}</p>}
              </div>
            </div>
          </div>

          {selectedType === 'salary' && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Employment Information
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Employer Name
                  </label>
                  <input
                    type="text"
                    value={formData.employer_name}
                    onChange={e => handleInputChange('employer_name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    placeholder="Company name where you are currently employed"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Company name where you are currently employed
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Monthly Salary (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.monthly_salary || ''}
                      onChange={e =>
                        handleInputChange('monthly_salary', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tax Deducted (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.tax_deducted || ''}
                      onChange={e =>
                        handleInputChange('tax_deducted', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={onBack}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showBankModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden animate-scaleIn">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Select Bank</h3>
              <button
                onClick={() => setShowBankModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={bankSearchQuery}
                  onChange={e => setBankSearchQuery(e.target.value)}
                  placeholder="Search banks..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-96">
              {filteredBanks.map(bank => (
                <button
                  key={bank}
                  onClick={() => handleBankSelect(bank)}
                  className="w-full px-6 py-3 text-left hover:bg-emerald-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <p className="text-slate-900 font-medium">{bank}</p>
                </button>
              ))}
              {filteredBanks.length === 0 && (
                <p className="text-center py-8 text-slate-500">No banks found</p>
              )}
            </div>

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => setShowBankModal(false)}
                className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
