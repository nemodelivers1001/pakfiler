import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, FileText, CheckCircle2, Wallet } from 'lucide-react';
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
      iconColor: 'text-slate-600',
      bgColor: 'bg-slate-100',
      available: true,
    },
    {
      id: 'card' as PaymentMethod,
      title: 'Credit / Debit Card',
      description: 'Pay securely with Visa, MasterCard, or any debit card via AbhiPay',
      icon: CreditCard,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      available: true,
    },
    {
      id: 'easypaisa' as PaymentMethod,
      title: 'EasyPaisa (Automatic)',
      description: 'Pay automatically using your EasyPaisa account',
      icon: Smartphone,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      available: false,
      comingSoon: true,
    },
    {
      id: 'jazzcash' as PaymentMethod,
      title: 'JazzCash (Automatic)',
      description: 'Pay automatically using your JazzCash account',
      icon: Smartphone,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onCancel}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-all hover:gap-3 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Track Submissions
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
                <p className="text-sm text-gray-500">Step 3 of 3 - Final Step</p>
              </div>
            </div>
            <p className="text-gray-600">Complete payment for your GST Registration application to proceed</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Payment Summary
              </h2>
              <span className="px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full shadow-md animate-pulse">
                PAYMENT REQUIRED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-gray-600 text-sm mb-1">Service Type</p>
                <p className="font-bold text-gray-900">GST Registration</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-gray-600 text-sm mb-1">Reference Number</p>
                <p className="font-bold text-gray-900">{application.reference_number}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-400">
                <p className="text-gray-600 text-sm mb-1">Amount Due</p>
                <p className="font-bold text-green-600 text-2xl">Rs {application.service_fee.toLocaleString()}</p>
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
                      <div className={`p-3 rounded-lg transition-all ${
                        !method.available
                          ? 'bg-gray-200'
                          : isSelected
                          ? 'bg-green-100 ring-2 ring-green-500'
                          : method.bgColor
                      }`}>
                        <Icon className={`w-6 h-6 transition-all ${
                          !method.available
                            ? 'text-gray-400'
                            : isSelected
                            ? 'text-green-600'
                            : method.iconColor
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
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-5 h-5 text-white" />
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
                    className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:transform-none"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6" />
                        Complete Payment - Rs {application.service_fee.toLocaleString()}
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
