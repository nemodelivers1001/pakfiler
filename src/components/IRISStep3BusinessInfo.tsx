import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Plus, X, Trash2 } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  nature: string;
  electricityConsumerNo: string;
  commencementDate: string;
  address: string;
  bankAccounts: BankAccount[];
}

interface BankAccount {
  id: string;
  bank: string;
  iban: string;
}

interface IRISStep3BusinessInfoProps {
  onContinue: (data: { businesses: Business[] }) => void;
  onBack: () => void;
  initialData: { businesses?: Business[] };
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

export default function IRISStep3BusinessInfo({
  onContinue,
  onBack,
  initialData,
}: IRISStep3BusinessInfoProps) {
  const [businesses, setBusinesses] = useState<Business[]>(
    initialData.businesses || []
  );
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddBusiness = () => {
    setEditingBusiness({
      id: crypto.randomUUID(),
      name: '',
      nature: '',
      electricityConsumerNo: '',
      commencementDate: '',
      address: '',
      bankAccounts: [],
    });
    setShowBusinessModal(true);
    setErrors({});
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusiness(business);
    setShowBusinessModal(true);
    setErrors({});
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinesses(businesses.filter(b => b.id !== id));
  };

  const handleSaveBusiness = () => {
    if (!editingBusiness) return;

    const newErrors: Record<string, string> = {};

    if (!editingBusiness.name) newErrors.name = 'Business name is required';
    if (!editingBusiness.nature) newErrors.nature = 'Nature of business is required';
    if (!editingBusiness.electricityConsumerNo) newErrors.electricityConsumerNo = 'Electricity consumer number is required';
    if (!editingBusiness.commencementDate) newErrors.commencementDate = 'Commencement date is required';
    if (!editingBusiness.address) newErrors.address = 'Business address is required';
    if (editingBusiness.bankAccounts.length === 0) newErrors.bankAccounts = 'At least one bank account is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const existingIndex = businesses.findIndex(b => b.id === editingBusiness.id);
      if (existingIndex >= 0) {
        const updated = [...businesses];
        updated[existingIndex] = editingBusiness;
        setBusinesses(updated);
      } else {
        setBusinesses([...businesses, editingBusiness]);
      }
      setShowBusinessModal(false);
      setEditingBusiness(null);
    }
  };

  const handleAddBankAccount = () => {
    if (!editingBusiness) return;
    setEditingBusiness({
      ...editingBusiness,
      bankAccounts: [
        ...editingBusiness.bankAccounts,
        { id: crypto.randomUUID(), bank: '', iban: '' },
      ],
    });
  };

  const handleRemoveBankAccount = (id: string) => {
    if (!editingBusiness) return;
    setEditingBusiness({
      ...editingBusiness,
      bankAccounts: editingBusiness.bankAccounts.filter(acc => acc.id !== id),
    });
  };

  const updateBankAccount = (id: string, field: 'bank' | 'iban', value: string) => {
    if (!editingBusiness) return;
    setEditingBusiness({
      ...editingBusiness,
      bankAccounts: editingBusiness.bankAccounts.map(acc =>
        acc.id === id ? { ...acc, [field]: value } : acc
      ),
    });
  };

  const handleSubmit = () => {
    if (businesses.length === 0) {
      alert('Please add at least one business');
      return;
    }
    onContinue({ businesses });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Business Information</h2>
          <p className="text-slate-600">
            Enter your business information
          </p>
          <p className="text-sm text-red-600 mt-2 font-medium">
            At least one business is required
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-600" />
              Business Details
            </h3>
            <button
              onClick={handleAddBusiness}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Business
            </button>
          </div>

          {businesses.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
              <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium mb-2">No businesses added yet</p>
              <p className="text-slate-500 text-sm mb-6">Add your business details to continue</p>
              <button
                onClick={handleAddBusiness}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold inline-flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Your First Business
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {businesses.map((business, index) => (
                <div
                  key={business.id}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{business.name}</h4>
                        <p className="text-sm text-slate-600 mb-3">{business.nature}</p>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-slate-500">Consumer No:</span>
                            <span className="ml-2 font-semibold text-slate-900">{business.electricityConsumerNo}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Since:</span>
                            <span className="ml-2 font-semibold text-slate-900">
                              {new Date(business.commencementDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{business.address}</p>
                        <p className="text-xs text-emerald-700 mt-2 font-medium">
                          {business.bankAccounts.length} bank account(s) added
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditBusiness(business)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBusiness(business.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
            disabled={businesses.length === 0}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Submit & Continue to Payment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showBusinessModal && editingBusiness && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex items-center justify-between z-10">
              <h3 className="text-2xl font-bold text-slate-900">
                {businesses.find(b => b.id === editingBusiness.id) ? 'Edit Business' : 'Add Business'}
              </h3>
              <button
                onClick={() => setShowBusinessModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingBusiness.name}
                    onChange={e => setEditingBusiness({ ...editingBusiness, name: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                    }`}
                    placeholder="Enter business name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nature of Business <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingBusiness.nature}
                    onChange={e => setEditingBusiness({ ...editingBusiness, nature: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.nature
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                    }`}
                    placeholder="Enter nature of business"
                  />
                  {errors.nature && <p className="text-red-500 text-sm mt-1">{errors.nature}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Electricity Consumer No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingBusiness.electricityConsumerNo}
                    onChange={e => setEditingBusiness({ ...editingBusiness, electricityConsumerNo: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.electricityConsumerNo
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                    }`}
                    placeholder="Enter electricity consumer number"
                  />
                  {errors.electricityConsumerNo && <p className="text-red-500 text-sm mt-1">{errors.electricityConsumerNo}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Business Commencement Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={editingBusiness.commencementDate}
                    onChange={e => setEditingBusiness({ ...editingBusiness, commencementDate: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.commencementDate
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                    }`}
                  />
                  {errors.commencementDate && <p className="text-red-500 text-sm mt-1">{errors.commencementDate}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editingBusiness.address}
                  onChange={e => setEditingBusiness({ ...editingBusiness, address: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.address
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200'
                  }`}
                  placeholder="Enter complete business address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                    Banking Information <span className="text-red-500">*</span>
                  </p>
                  <button
                    onClick={handleAddBankAccount}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Bank Account
                  </button>
                </div>
                <p className="text-xs text-blue-700 mb-4">
                  At least one bank account is required
                </p>
                {errors.bankAccounts && <p className="text-red-500 text-sm mb-4">{errors.bankAccounts}</p>}

                <div className="space-y-4">
                  {editingBusiness.bankAccounts.map((account) => (
                    <div key={account.id} className="bg-white rounded-xl p-4 border border-blue-200">
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Bank <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={account.bank}
                            onChange={e => updateBankAccount(account.id, 'bank', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                          >
                            <option value="">Select bank</option>
                            {PAKISTANI_BANKS.map(bank => (
                              <option key={bank} value={bank}>{bank}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            IBAN <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={account.iban}
                            onChange={e => updateBankAccount(account.id, 'iban', e.target.value.toUpperCase())}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                            placeholder="PK36ABCD0000001234567890"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveBankAccount(account.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Account
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowBusinessModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBusiness}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all"
              >
                Save Business
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
