import { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Car, DollarSign, Check } from 'lucide-react';
import { IRISAdditionalInfo } from '../types/iris';

interface IRISStep3AdditionalInfoProps {
  onContinue: (data: Partial<IRISAdditionalInfo>) => void;
  onBack: () => void;
  initialData: Partial<IRISAdditionalInfo>;
}

export default function IRISStep3AdditionalInfo({
  onContinue,
  onBack,
  initialData,
}: IRISStep3AdditionalInfoProps) {
  const [formData, setFormData] = useState<Partial<IRISAdditionalInfo>>({
    has_property: false,
    property_details: '',
    has_vehicle: false,
    vehicle_details: '',
    has_other_income: false,
    other_income_details: '',
    ...initialData,
  });

  const handleToggle = (field: 'has_property' | 'has_vehicle' | 'has_other_income') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDetailsChange = (
    field: 'property_details' | 'vehicle_details' | 'other_income_details',
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onContinue(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Additional Information</h2>
          <p className="text-slate-600 text-lg">
            Help us understand your complete financial profile
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <InfoCard
            icon={Home}
            title="Property Ownership"
            description="Do you own any property (house, land, commercial space, etc.)?"
            color="blue"
            active={formData.has_property || false}
            onToggle={() => handleToggle('has_property')}
          >
            {formData.has_property && (
              <div className="mt-4 animate-slideDown">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Property Details
                </label>
                <textarea
                  value={formData.property_details}
                  onChange={e => handleDetailsChange('property_details', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Describe your properties (location, type, approximate value, etc.)"
                />
              </div>
            )}
          </InfoCard>

          <InfoCard
            icon={Car}
            title="Vehicle Ownership"
            description="Do you own any vehicles (car, motorcycle, truck, etc.)?"
            color="emerald"
            active={formData.has_vehicle || false}
            onToggle={() => handleToggle('has_vehicle')}
          >
            {formData.has_vehicle && (
              <div className="mt-4 animate-slideDown">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Vehicle Details
                </label>
                <textarea
                  value={formData.vehicle_details}
                  onChange={e => handleDetailsChange('vehicle_details', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="Describe your vehicles (make, model, year, registration number, etc.)"
                />
              </div>
            )}
          </InfoCard>

          <InfoCard
            icon={DollarSign}
            title="Other Income Sources"
            description="Do you have any other sources of income (investments, rental, business, freelance, etc.)?"
            color="amber"
            active={formData.has_other_income || false}
            onToggle={() => handleToggle('has_other_income')}
          >
            {formData.has_other_income && (
              <div className="mt-4 animate-slideDown">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Other Income Details
                </label>
                <textarea
                  value={formData.other_income_details}
                  onChange={e => handleDetailsChange('other_income_details', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  placeholder="Describe your other income sources (type, approximate monthly/annual income, etc.)"
                />
              </div>
            )}
          </InfoCard>
        </div>

        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Note:</span> This information helps us
            provide accurate tax calculations and compliance recommendations. All information is
            kept confidential and secure.
          </p>
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
    </div>
  );
}

interface InfoCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: 'blue' | 'emerald' | 'amber';
  active: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

function InfoCard({ icon: Icon, title, description, color, active, onToggle, children }: InfoCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      activeBg: 'bg-blue-500',
      activeRing: 'ring-blue-500',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      checkBg: 'bg-blue-500',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      activeBg: 'bg-emerald-500',
      activeRing: 'ring-emerald-500',
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-600',
      checkBg: 'bg-emerald-500',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      activeBg: 'bg-amber-500',
      activeRing: 'ring-amber-500',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-600',
      checkBg: 'bg-amber-500',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`border-2 rounded-2xl p-6 transition-all duration-300 ${
        active
          ? `${colors.bg} ${colors.border} ring-4 ${colors.activeRing} ring-opacity-20`
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
            active ? `${colors.activeBg} shadow-lg` : `${colors.iconBg}`
          }`}
        >
          <Icon
            className={`w-7 h-7 transition-colors ${active ? 'text-white' : colors.iconText}`}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-slate-600 text-sm">{description}</p>
            </div>

            <button
              onClick={onToggle}
              className={`ml-4 w-16 h-8 rounded-full relative transition-all duration-300 flex-shrink-0 ${
                active ? colors.activeBg : 'bg-slate-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
                  active ? 'left-9' : 'left-1'
                }`}
              >
                {active && <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />}
              </div>
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
