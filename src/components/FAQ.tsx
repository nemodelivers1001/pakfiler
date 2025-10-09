import { useState } from 'react';
import { HelpCircle, Mail, ChevronDown, Rocket, MessageCircle } from 'lucide-react';

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
      answer: 'You can track your application status directly from your dashboard by clicking on "Track My Submission" in the navigation menu. You will also receive email and SMS notifications at each stage of processing.',
    },
    {
      question: 'How can I contact support if I need help?',
      answer: 'You can reach our support team via email at support@pakfiler.com. Our team responds within 24 working hours. You can also use the "Help & Support" section in your dashboard to submit a support ticket.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 bg-clip-text text-transparent mb-3">
            Help & Support
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Get help with your tax filing and account management
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-2xl p-1 mb-8 shadow-xl">
          <div className="bg-white rounded-[14px] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
                  <span>Have a question? We're here to help!</span>
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 text-sm sm:text-base text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                    <span>Just drop us an email at</span>
                  </div>
                  <a
                    href="mailto:support@pakfiler.com"
                    className="font-semibold text-emerald-600 hover:text-emerald-700 underline decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
                  >
                    support@pakfiler.com
                  </a>
                  <span>and our team will get back to you within 24 working hours.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                openIndex === index
                  ? 'border-emerald-300 shadow-md'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 text-left transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base group-hover:text-emerald-600 transition-colors">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-emerald-500 to-green-500 rotate-180'
                      : 'bg-gray-100 group-hover:bg-emerald-50'
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-colors ${
                      openIndex === index ? 'text-white' : 'text-gray-600 group-hover:text-emerald-600'
                    }`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 bg-gradient-to-br from-gray-50 to-emerald-50/30 border-t border-gray-100">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border border-gray-200 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Our support team is always ready to assist you with any queries.
          </p>
          <a
            href="mailto:support@pakfiler.com"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
