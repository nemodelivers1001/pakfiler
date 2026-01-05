import { useState } from 'react';
import { HelpCircle, Mail, ChevronDown, Rocket, MessageCircle, Sparkles, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I file my tax return?',
      answer: 'You can file your tax return by selecting the appropriate service from our dashboard. Simply choose "Personal Tax Filing" or "Business Tax Return" based on your needs, fill in the required information, upload necessary documents, and submit. Our team will review and file it with FBR on your behalf.',
    },
    {
      question: 'What documents do I need for tax filing?',
      answer: 'For salaried individuals: CNIC, salary slips, bank statements, and any investment documents. For businesses: NTN certificate, financial statements, bank statements, purchase/sales invoices, and business registration documents. Our team will guide you through the specific requirements for your case.',
    },
    {
      question: 'How long does it take to get my NTN registration?',
      answer: 'NTN registration typically takes 3-5 working days once all required documents are submitted and verified. In some cases, it may take up to 7 working days depending on FBR processing times. We keep you updated throughout the process.',
    },
    {
      question: 'Can I edit my application after submission?',
      answer: 'Yes, you can request edits to your application before it is filed with FBR. Once submitted to FBR, amendments require filing a revised return. Contact our support team immediately if you need to make changes to a pending application.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept multiple payment methods including bank transfers, online banking, JazzCash, EasyPaisa, and major credit/debit cards. Payment instructions will be provided after you select your service and submit your information.',
    },
    {
      question: 'How do I track my application status?',
      answer: 'You can track your application status directly from your dashboard by clicking on "Track" in the navigation menu. You will also receive email and SMS notifications at each stage of processing.',
    },
    {
      question: 'How can I contact support if I need help?',
      answer: 'You can reach our support team via email at support@pakfiler.com. Our team responds within 24 working hours. You can also use the "Help" section in your dashboard to submit a support ticket.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-10 sm:py-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pak-green-400/10 blur-[80px] rounded-full -z-10 animate-pulse-slow"></div>

          <div className="inline-flex items-center justify-center p-3 bg-pak-green-100 rounded-2xl mb-5 shadow-inner border border-pak-green-200 relative group">
            <div className="absolute inset-0 bg-pak-green-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <HelpCircle className="w-8 h-8 text-pak-green-700 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-pak-green-950 mb-4 tracking-tight uppercase">
            Help & <span className="bg-gradient-to-r from-pak-green-600 to-pak-green-800 bg-clip-text text-transparent">Support</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg font-bold max-w-2xl mx-auto leading-relaxed">
            Get comprehensive help with your tax filing and account management from our expert team
          </p>
        </motion.div>

        {/* Support Banner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative bg-white/40 border-2 border-white/60 rounded-3xl shadow-xl shadow-pak-green-900/5 p-6 sm:p-10 mb-16 overflow-hidden backdrop-blur-2xl group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pak-green-400/20 to-emerald-400/10 rounded-full blur-[80px] -mr-40 -mt-40 group-hover:translate-x-10 transition-transform duration-1000"></div>

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-pak-green-400 blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-pak-green-600 to-pak-green-800 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 ring-1 ring-white/30">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-3">
                <h3 className="text-xl sm:text-2xl font-black text-pak-green-950 tracking-tight uppercase">
                  Have a question? We're here to help!
                </h3>
                <div className="hidden lg:block h-px w-16 bg-pak-green-100"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4 text-[14px] font-bold text-gray-700">
                <div className="flex items-center gap-3 bg-pak-green-50/80 px-5 py-2.5 rounded-xl border border-pak-green-100/50 shadow-sm transition-all hover:shadow-md hover:border-pak-green-200">
                  <Mail className="w-5 h-5 text-pak-green-600" />
                  <a href="mailto:support@pakfiler.com" className="text-pak-green-700 hover:text-pak-green-900 underline underline-offset-4 decoration-2 decoration-pak-green-300 transform transition-all hover:-translate-y-0.5 uppercase tracking-tighter">
                    support@pakfiler.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pak-green-600" />
                  <span className="uppercase tracking-tight text-gray-500 text-xs font-bold leading-none">Response within 24 working hours</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* FAQ Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white/80 border-2 border-pak-green-50 rounded-2xl flex items-center justify-center shadow-xl shadow-pak-green-900/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-pak-green-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <MessageCircle className="w-6 h-6 text-pak-green-600 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-pak-green-950 uppercase tracking-tighter">Frequently Asked <span className="text-pak-green-600">Questions</span></h2>
              <div className="h-1 w-full max-w-[150px] bg-gradient-to-r from-pak-green-500 to-transparent rounded-full mt-1.5"></div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 max-w-5xl"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group overflow-hidden transition-all duration-500 rounded-3xl ${openIndex === index
                ? 'bg-white border-2 border-pak-green-200 shadow-xl shadow-pak-green-900/5'
                : 'bg-white/60 border-2 border-white/80 hover:border-pak-green-100 hover:bg-white/90 hover:shadow-lg hover:shadow-pak-green-900/5'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors relative"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-pak-green-600 text-white rotate-[360deg] shadow-lg shadow-pak-green-600/30' : 'bg-pak-green-50 text-pak-green-700'
                    }`}>
                    {openIndex === index ? <Info className="w-5 h-5" /> : <span className="font-black text-xs">{index + 1}</span>}
                  </div>
                  <span className={`text-base sm:text-lg font-black transition-colors duration-300 uppercase tracking-tight ${openIndex === index ? 'text-pak-green-800' : 'text-gray-800 group-hover:text-pak-green-700'
                    }`}>
                    {faq.question}
                  </span>
                </div>

                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-pak-green-100 text-pak-green-700 translate-x-1' : 'bg-pak-green-50 text-pak-green-400'
                  }`}>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 sm:px-24 pb-8 sm:pb-10 pt-1 border-t border-pak-green-50 relative overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-pak-green-100/20 blur-2xl rounded-full translate-x-8 translate-y-8"></div>
                      <p className="text-[15px] sm:text-base text-gray-500 font-bold leading-relaxed relative z-10">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 relative bg-white/95 border-2 border-pak-green-50 rounded-[40px] p-8 sm:p-12 text-center shadow-[0_30px_60px_-15px_rgba(25,135,84,0.1)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pak-green-50/50 via-transparent to-emerald-50/50"></div>

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-4xl font-black text-pak-green-950 mb-4 uppercase tracking-tight">
              Still have questions?
            </h3>
            <p className="text-base sm:text-lg font-bold text-gray-400 mb-8 max-w-2xl mx-auto">
              Our expert support team is always ready to assist you with any custom tax queries or business concerns.
            </p>

            <motion.a
              href="mailto:support@pakfiler.com"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-5 px-8 py-4 bg-pak-green-50 text-pak-green-700 font-black rounded-2xl border-2 border-pak-green-100 shadow-lg hover:shadow-xl hover:bg-white hover:border-pak-green-200 transition-all duration-300 uppercase tracking-widest text-xs"
            >
              <div className="w-10 h-10 bg-pak-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-6">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span>Contact Expert Support</span>
              <ArrowRight className="w-5 h-5 animate-bounce-x" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
