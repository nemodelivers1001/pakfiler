import { useState } from 'react';
import { UserCircle, Building2, Check, Clock, ArrowRight } from 'lucide-react';

interface IRISStep1PurposeProps {
  onContinue: (type: 'salary' | 'business', amount: number, completionTime: string) => void;
}

const services = {
  salary: {
    type: 'salary' as const,
    title: 'SALARY',
    description: 'Update IRIS profile for salary income',
    amount: 100,
    completionTime: '1-3 Working Days',
    icon: UserCircle,
    color: 'emerald',
  },
  business: {
    type: 'business' as const,
    title: 'BUSINESS',
    description: 'Update IRIS profile for business income',
    amount: 800,
    completionTime: '1-3 Working Days',
    icon: Building2,
    color: 'blue',
  },
};

export default function IRISStep1Purpose({ onContinue }: IRISStep1PurposeProps) {
  const [selectedService, setSelectedService] = useState<'salary' | 'business' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleServiceSelect = (serviceKey: 'salary' | 'business') => {
    setSelectedService(serviceKey);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleContinue = () => {
    if (selectedService) {
      const service = services[selectedService];
      onContinue(service.type, service.amount, service.completionTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Purpose of Updating IRIS Profile
          </h2>
          <p className="text-slate-600 text-lg">
            Select the category that best describes your update purpose
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(services).map(([key, service]) => {
            const Icon = service.icon;
            const isSelected = selectedService === key;
            const colorClasses = {
              emerald: {
                border: 'border-emerald-300',
                bg: 'bg-emerald-50',
                ring: 'ring-emerald-500',
                iconBg: 'bg-emerald-500',
                badge: 'bg-emerald-500',
                checkBg: 'bg-emerald-500',
              },
              blue: {
                border: 'border-blue-300',
                bg: 'bg-blue-50',
                ring: 'ring-blue-500',
                iconBg: 'bg-blue-500',
                badge: 'bg-blue-500',
                checkBg: 'bg-blue-500',
              },
            };
            const colors = colorClasses[service.color as keyof typeof colorClasses];

            return (
              <button
                key={key}
                onClick={() => handleServiceSelect(key as 'salary' | 'business')}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left group ${
                  isSelected
                    ? `${colors.border} ${colors.bg} ring-4 ${colors.ring} ring-opacity-20 scale-105 shadow-xl`
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-lg hover:scale-102 bg-white'
                }`}
              >
                {isSelected && (
                  <div
                    className={`absolute -top-3 -right-3 w-10 h-10 ${colors.checkBg} rounded-full flex items-center justify-center shadow-lg animate-scaleIn`}
                  >
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                )}

                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? `${colors.iconBg} shadow-lg scale-110`
                        : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}
                  >
                    <Icon
                      className={`w-10 h-10 transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-600'
                      }`}
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {service.description}
                    </p>

                    <div
                      className={`inline-block px-4 py-1.5 ${colors.badge} text-white rounded-full text-sm font-semibold mb-3`}
                    >
                      Rs {service.amount}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Completion Time: {service.completionTime}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedService && (
          <div
            className={`bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 mb-8 transition-all duration-300 ${
              isAnimating ? 'animate-slideUp' : ''
            }`}
          >
            <p className="text-emerald-800 text-center font-medium">
              Selected: <span className="font-bold">{services[selectedService].title}</span> - Rs{' '}
              {services[selectedService].amount} - {services[selectedService].completionTime}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedService}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedService
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
