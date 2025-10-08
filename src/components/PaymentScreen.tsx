import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, FileText, CheckCircle2, Wallet, Shield, Clock, Building2, Sparkles, Lock } from 'lucide-react';
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
      description: 'Bank Transfer, IBFT, or RAAST instant payment',
      icon: Building2,
      gradient: 'from-slate-500 to-slate-700',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      available: true,
    },
    {
      id: 'card' as PaymentMethod,
      title: 'Credit / Debit Card',
      description: 'Secure payment via Visa, MasterCard, or any debit card',
      icon: CreditCard,
      gradient: 'from-blue-500 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      available: true,
    },
    {
      id: 'easypaisa' as PaymentMethod,
      title: 'EasyPaisa',
      description: 'Instant payment using your EasyPaisa wallet',
      icon: Smartphone,
      gradient: 'from-green-500 to-emerald-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      available: false,
      comingSoon: true,
    },
    {
      id: 'jazzcash' as PaymentMethod,
      title: 'JazzCash',
      description: 'Instant payment using your JazzCash wallet',
      icon: Wallet,
      gradient: 'from-red-500 to-rose-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={onCancel}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-all hover:gap-3 font-semibold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Back to Track Submissions
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 mb-6">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Secure Payment</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Lock className="w-4 h-4" />
                      Step 3 of 3 - Final Step
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">Choose your preferred payment method to complete your GST Registration</p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Select Payment Method
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        onClick={() => method.available && setSelectedMethod(method.id)}
                        disabled={!method.available}
                        className={`relative text-left p-5 border-3 rounded-2xl transition-all duration-300 ${
                          !method.available
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-102'
                        }`}
                      >
                        {method.comingSoon && (
                          <span className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-md z-10">
                            Soon
                          </span>
                        )}

                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl shadow-md transition-all ${
                            !method.available
                              ? 'bg-gray-200'
                              : isSelected
                              ? `bg-gradient-to-br ${method.gradient}`
                              : method.iconBg
                          }`}>
                            <Icon className={`w-7 h-7 transition-all ${
                              !method.available
                                ? 'text-gray-400'
                                : isSelected
                                ? 'text-white'
                                : method.iconColor
                            }`} />
                          </div>

                          <div className="flex-1">
                            <h3 className={`font-bold text-base mb-1 ${
                              !method.available ? 'text-gray-500' : 'text-gray-900'
                            }`}>
                              {method.title}
                            </h3>
                            <p className={`text-xs leading-relaxed ${
                              !method.available ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {method.description}
                            </p>
                          </div>

                          {isSelected && method.available && (
                            <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedMethod && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 animate-fadeIn">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900 text-lg">Secure Payment Gateway</h3>
                      <p className="text-sm text-green-700">Your payment information is protected with bank-level encryption</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-6 pt-6 border-t-2 border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-medium">Processing takes only a few seconds</span>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:transform-none disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-6 h-6" />
                          Pay Rs {application.service_fee.toLocaleString()}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Why Choose Us?
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Secure</p>
                  <p className="text-xs text-gray-600 mt-1">Bank-level encryption</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Fast</p>
                  <p className="text-xs text-gray-600 mt-1">Instant processing</p>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Reliable</p>
                  <p className="text-xs text-gray-600 mt-1">99.9% uptime</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Service</p>
                    <p className="font-bold text-gray-900 text-lg">GST Registration</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-1">Reference No.</p>
                    <p className="font-mono font-bold text-blue-900 text-sm">{application.reference_number}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Business Name</p>
                    <p className="font-semibold text-gray-900">{application.business_name}</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 pt-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 shadow-lg">
                  <p className="text-sm text-green-100 mb-2">Total Amount</p>
                  <p className="text-4xl font-bold text-white mb-1">
                    Rs {application.service_fee.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-100">Inclusive of all charges</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">
                    Your payment is secured with 256-bit SSL encryption. We never store your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
