import { useState } from 'react';
import { ArrowRight, CreditCard, Smartphone, FileText } from 'lucide-react';
import { GSTApplication } from '../types/gst';

interface PaymentScreenProps {
  application: GSTApplication;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'manual' | 'card' | 'easypaisa' | 'jazzcash';

export default function PaymentScreen({ application, onPaymentComplete, onCancel }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 1500);
  };

  const paymentMethods = [
    {
      id: 'manual' as PaymentMethod,
      title: 'Manual Payment',
      description: 'Manual Payment using Bank Transfer / IBFT / RAAST',
      icon: FileText,
      available: true,
    },
    {
      id: 'card' as PaymentMethod,
      title: 'Credit / Debit Card',
      description: 'Pay securely with Visa, MasterCard, or any debit card via AbhiPay',
      icon: CreditCard,
      available: true,
    },
    {
      id: 'easypaisa' as PaymentMethod,
      title: 'EasyPaisa (Automatic)',
      description: 'Pay automatically using your EasyPaisa account',
      icon: Smartphone,
      available: false,
      comingSoon: true,
    },
    {
      id: 'jazzcash' as PaymentMethod,
      title: 'JazzCash (Automatic)',
      description: 'Pay automatically using your JazzCash account',
      icon: Smartphone,
      available: false,
      comingSoon: true,
    },
  ];

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

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment</h1>
            <p className="text-gray-600">Complete payment for your GST Registration application</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Payment Summary</h2>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded">
                PENDING PAYMENT
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Service Type</p>
                <p className="font-semibold text-gray-900">GST Registration</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Reference Number</p>
                <p className="font-semibold text-gray-900">{application.reference_number}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Amount Due</p>
                <p className="font-semibold text-gray-900 text-lg">Rs {application.service_fee.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;

                return (
                  <button
                    key={method.id}
                    onClick={() => method.available && setSelectedMethod(method.id)}
                    disabled={!method.available}
                    className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
                      !method.available
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        : isSelected
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        !method.available
                          ? 'bg-gray-200'
                          : isSelected
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          !method.available
                            ? 'text-gray-400'
                            : isSelected
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${
                            !method.available ? 'text-gray-500' : 'text-gray-900'
                          }`}>
                            {method.title}
                          </h3>
                          {method.comingSoon && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          !method.available ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {method.description}
                        </p>
                      </div>
                      {isSelected && method.available && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedMethod && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Payment
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
