import { useState } from 'react';
import { HelpCircle, Mail, ChevronDown } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
        <div className="flex items-start space-x-3">
          <div className="text-3xl">🎯</div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Have a question? We're here to help!</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Mail className="w-4 h-4 text-green-600" />
              <span>Just drop us an email at</span>
              <a href="mailto:support@pakfiler.com" className="font-semibold text-green-600 hover:text-green-700">
                support@pakfiler.com
              </a>
              <span>and our team will get back to you within 24 working hours.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
