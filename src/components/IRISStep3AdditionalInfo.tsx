import { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin, Key, Lock, Eye, EyeOff, Building, CreditCard, Search, X } from 'lucide-react';
import { IRISAdditionalInfo } from '../types/iris';

interface IRISStep3AdditionalInfoProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  initialData: any;
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

export default function IRISStep3AdditionalInfo({
  onContinue,
  onBack,
  initialData,
}: IRISStep3AdditionalInfoProps) {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    present_address: '',
    fbr_iris_registration_id: '',
    fbr_iris_pin: '',
    fbr_iris_password: '',
    bank_name: '',
    iban: '',
    has_property: false,
    property_details: '',
    has_vehicle: false,
    vehicle_details: '',
    has_other_income: false,
    other_income_details: '',
    ...initialData,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredBanks = PAKISTANI_BANKS.filter(bank =>
    bank.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleToggle = (field: 'has_property' | 'has_vehicle' | 'has_other_income') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
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
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Additional Information</h2>
          <p className="text-slate-600 text-lg">
            Complete your profile with contact and account details
          </p>
        </div>

        <div className="space-y-8 mb-8">
          <section className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </h3>

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
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
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
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="03001234567"
                  maxLength={11}
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div className="mt-6">
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
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Enter your complete address"
              />
              {errors.present_address && (
                <p className="text-red-500 text-sm mt-1">{errors.present_address}</p>
              )}
            </div>
          </section>

          <section className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Key className="w-5 h-5" />
              FBR/IRIS Credentials
            </h3>

            <div className="space-y-4">
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

              <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </section>

          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Bank Account Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bank <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowBankModal(true)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-left flex items-center justify-between ${
                    errors.bank_name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-amber-500 focus:ring-amber-200'
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  IBAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={e => handleInputChange('iban', e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.iban
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-amber-500 focus:ring-amber-200'
                  }`}
                  placeholder="PK36ABCD0000001234567890"
                />
                {errors.iban && <p className="text-red-500 text-sm mt-1">{errors.iban}</p>}
              </div>
            </div>
          </section>

          <section className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Additional Assets & Income</h3>
            <p className="text-sm text-slate-600 mb-6">Help us understand your complete financial profile (Optional)</p>

            <div className="space-y-4">
              <div className={`border-2 rounded-xl p-4 transition-all ${formData.has_property ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Property Ownership</label>
                  <button
                    type="button"
                    onClick={() => handleToggle('has_property')}
                    className={`w-14 h-7 rounded-full relative transition-all ${formData.has_property ? 'bg-blue-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${formData.has_property ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                {formData.has_property && (
                  <textarea
                    value={formData.property_details}
                    onChange={e => handleInputChange('property_details', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Property details..."
                  />
                )}
              </div>

              <div className={`border-2 rounded-xl p-4 transition-all ${formData.has_vehicle ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Vehicle Ownership</label>
                  <button
                    type="button"
                    onClick={() => handleToggle('has_vehicle')}
                    className={`w-14 h-7 rounded-full relative transition-all ${formData.has_vehicle ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${formData.has_vehicle ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                {formData.has_vehicle && (
                  <textarea
                    value={formData.vehicle_details}
                    onChange={e => handleInputChange('vehicle_details', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    placeholder="Vehicle details..."
                  />
                )}
              </div>

              <div className={`border-2 rounded-xl p-4 transition-all ${formData.has_other_income ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Other Income Sources</label>
                  <button
                    type="button"
                    onClick={() => handleToggle('has_other_income')}
                    className={`w-14 h-7 rounded-full relative transition-all ${formData.has_other_income ? 'bg-amber-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${formData.has_other_income ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                {formData.has_other_income && (
                  <textarea
                    value={formData.other_income_details}
                    onChange={e => handleInputChange('other_income_details', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                    placeholder="Other income details..."
                  />
                )}
              </div>
            </div>
          </section>
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
            Submit & Continue to Payment
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
