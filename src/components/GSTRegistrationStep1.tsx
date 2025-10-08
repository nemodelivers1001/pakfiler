import { useState } from 'react';
import { ArrowRight, Building2, Calendar, Briefcase, FileText, MapPin, Zap } from 'lucide-react';
import { BUSINESS_TYPES, BUSINESS_NATURES, BusinessInformationData } from '../types/gst';

interface GSTRegistrationStep1Props {
  initialData: BusinessInformationData;
  onNext: (data: BusinessInformationData) => void;
  onCancel: () => void;
}

export default function GSTRegistrationStep1({ initialData, onNext, onCancel }: GSTRegistrationStep1Props) {
  const [formData, setFormData] = useState<BusinessInformationData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessInformationData, string>>>({});

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
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleChange = (field: keyof BusinessInformationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onCancel}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GST Registration</h1>
                <p className="text-sm text-gray-500">Step 1 of 3</p>
              </div>
            </div>
            <p className="text-gray-600">Register your business for General Sales Tax with the Federal Board of Revenue</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-md transform transition-transform hover:scale-105">
                  1
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-green-600 block">Business Info</span>
                  <span className="text-xs text-green-500">In Progress</span>
                </div>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full max-w-[100px]"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                  2
                </div>
                <span className="text-gray-400 text-sm hidden sm:inline">Documents</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full max-w-[100px]"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-gray-400 text-sm hidden sm:inline">Payment</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Information</h2>
              <p className="text-sm text-gray-600 mb-6">
                Please provide the required information to register your business for General Sales Tax
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-green-600" />
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => handleChange('business_name', e.target.value)}
                    placeholder="Enter business name"
                    className={`w-full px-4 py-2.5 border ${
                      errors.business_name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.business_name && (
                    <p className="mt-1 text-sm text-red-500">{errors.business_name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.business_type}
                      onChange={(e) => handleChange('business_type', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${
                        errors.business_type ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                    >
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.business_type && (
                      <p className="mt-1 text-sm text-red-500">{errors.business_type}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleChange('start_date', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${
                        errors.start_date ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                    {errors.start_date && (
                      <p className="mt-1 text-sm text-red-500">{errors.start_date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-600" />
                      Business Nature <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.business_nature}
                      onChange={(e) => handleChange('business_nature', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${
                        errors.business_nature ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                    >
                      <option value="">Select business nature</option>
                      {BUSINESS_NATURES.map((nature) => (
                        <option key={nature} value={nature}>
                          {nature}
                        </option>
                      ))}
                    </select>
                    {errors.business_nature && (
                      <p className="mt-1 text-sm text-red-500">{errors.business_nature}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe your business activities"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    Consumer Number (GAS/Electricity)
                  </label>
                  <input
                    type="text"
                    value={formData.consumer_number}
                    onChange={(e) => handleChange('consumer_number', e.target.value)}
                    placeholder="Enter consumer number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.business_address}
                    onChange={(e) => handleChange('business_address', e.target.value)}
                    placeholder="Enter complete business address"
                    rows={3}
                    className={`w-full px-4 py-2.5 border ${
                      errors.business_address ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none`}
                  />
                  {errors.business_address && (
                    <p className="mt-1 text-sm text-red-500">{errors.business_address}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Continue to Documents
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
