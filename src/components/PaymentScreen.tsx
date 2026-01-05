import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, FileText, CheckCircle2, Wallet, Shield, Clock, Building2, Sparkles, Lock, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GSTApplication } from '../types/gst';
import { IRISSubmission } from '../types/iris';
import { useMobile } from '../hooks/useMobile';

interface PaymentScreenProps {
  application?: GSTApplication;
  irisSubmission?: IRISSubmission;
  serviceName?: string;
  referenceNumber?: string;
  amount?: number;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'manual' | 'card' | 'easypaisa' | 'jazzcash';

export default function PaymentScreen({ application, irisSubmission, serviceName, referenceNumber, amount, onPaymentComplete, onCancel }: PaymentScreenProps) {
  const displayName = serviceName || (application ? 'GST Registration' : irisSubmission ? 'IRIS Profile Update' : 'Service');
  const displayReference = referenceNumber || application?.reference_number || irisSubmission?.reference_number || 'N/A';
  const displayAmount = amount || application?.service_fee || irisSubmission?.amount || 0;
  const businessName = application?.business_name || 'IRIS Profile Update Service';
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useMobile();

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
      title: 'Manual IBFT',
      description: 'Bank Transfer, IBFT, or RAAST instant payment',
      icon: Building2,
      gradient: 'from-pak-green-500 to-pak-green-brand',
      iconBg: 'bg-pak-green-50',
      iconColor: 'text-pak-green-600',
      available: true,
    },
    {
      id: 'card' as PaymentMethod,
      title: 'Credit / Debit Card',
      description: 'Visa, MasterCard, or any debit card',
      icon: CreditCard,
      gradient: 'from-emerald-600 to-pak-green-900',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-pak-green-600',
      available: true,
    },
    {
      id: 'easypaisa' as PaymentMethod,
      title: 'EasyPaisa',
      description: 'Instant payment via EasyPaisa wallet',
      icon: Smartphone,
      gradient: 'from-green-600 to-emerald-800',
      iconBg: 'bg-green-100',
      iconColor: 'text-pak-green-600',
      available: false,
      comingSoon: true,
    },
    {
      id: 'jazzcash' as PaymentMethod,
      title: 'JazzCash',
      description: 'Instant payment via JazzCash wallet',
      icon: Wallet,
      gradient: 'from-red-600 to-rose-800',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header - Desktop Only */}

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 sm:p-10 rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-pak-green-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none"></div>

            <div className="relative z-10 space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight flex items-center gap-3">
                  <div className="w-8 h-8 bg-pak-green-50 rounded-lg flex items-center justify-center text-pak-green-600">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  Payment Options
                </h3>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">PCI-DSS Compliant</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  const isAvailable = method.available;

                  return (
                    <motion.button
                      key={method.id}
                      whileHover={isAvailable ? { scale: 1.02, y: -4 } : {}}
                      whileTap={isAvailable ? { scale: 0.98 } : {}}
                      onClick={() => isAvailable && setSelectedMethod(method.id)}
                      className={`relative text-left p-6 border-2 transition-all duration-500 rounded-[32px] overflow-hidden ${isSelected
                        ? 'border-pak-green-500 bg-emerald-50/50 shadow-2xl shadow-pak-green-900/10'
                        : isAvailable
                          ? 'border-white bg-white/50 hover:bg-white hover:border-pak-green-100 hover:shadow-xl'
                          : 'border-transparent bg-gray-100/50 opacity-60 grayscale cursor-not-allowed'
                        }`}
                    >
                      {method.comingSoon && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[8px] font-black uppercase tracking-[2px] rounded-full shadow-lg">
                          Soon
                        </div>
                      )}

                      <div className="flex items-start gap-5 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${isSelected ? `bg-gradient-to-br ${method.gradient} text-white` : 'bg-white text-pak-green-900'
                          }`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 pr-8">
                          <h4 className={`text-base font-black tracking-tight uppercase mb-1 ${isSelected ? 'text-pak-green-950' : 'text-gray-900'}`}>{method.title}</h4>
                          <p className={`text-xs font-bold leading-relaxed ${isSelected ? 'text-pak-green-700/70' : 'text-gray-400'}`}>{method.description}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <motion.div
                          layoutId="selected-bg"
                          className="absolute inset-0 bg-gradient-to-tr from-emerald-100/20 to-transparent pointer-events-none"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Verification / Security Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Encrypted', desc: 'AES-256 Protection', color: 'pak-green' },
              { icon: Clock, title: 'Instant', desc: 'Real-time Approval', color: 'pak-green' },
              { icon: Lock, title: 'Private', desc: 'No Card Storage', color: 'pak-green' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="glass-card p-6 rounded-3xl border-white/60 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 shadow-inner`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-black text-pak-green-950 uppercase tracking-[2px]">{item.title}</h5>
                  <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="xl:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-[40px] border-white/80 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-pak-green-950 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-pak-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tighter">Summary</h3>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[2px]">Ref: {displayReference}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center group">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Selected Service</p>
                    <p className="text-sm font-black text-pak-green-900 uppercase tracking-tighter">{displayName}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-pak-green-600 transition-colors" />
                </div>

                <div className="flex justify-between items-center group">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Business / Entity</p>
                    <p className="text-sm font-black text-pak-green-900 uppercase tracking-tighter leading-tight max-w-[150px] truncate">{businessName}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-pak-green-600 transition-colors" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-pak-green-800 to-pak-green-950 rounded-[32px] p-6 text-white shadow-xl shadow-pak-green-900/20 relative group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-[9px] font-black text-pak-green-400 uppercase tracking-[3px] mb-2 leading-none">Total Payable</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-black opacity-60">PKR</span>
                  <span className="text-4xl font-black tracking-tighter">{displayAmount.toLocaleString()}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pak-green-400" />
                  <span className="text-[8px] font-black uppercase tracking-[1px] opacity-70">Inclusive of all filing fees</span>
                </div>
              </div>

              <AnimatePresence>
                {selectedMethod && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full group bg-gradient-to-r from-pak-green-800 to-pak-green-950 hover:to-black text-white py-6 rounded-[32px] font-black uppercase text-xs tracking-[4px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Complete Payment
                        <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>

              {!selectedMethod && (
                <div className="p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[2px]">Select a method to proceed</p>
                </div>
              )}
            </div>
          </motion.div>

          <button
            onClick={onCancel}
            className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[3px] text-gray-400 hover:text-red-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
}
