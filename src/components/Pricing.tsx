import { useState } from 'react';
import { Receipt, Info, Sparkles, TrendingUp, Award, CheckCircle2, Zap } from 'lucide-react';

type ServiceTab = 'personal' | 'business' | 'other';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('personal');

  const personalTaxServices = [
    {
      title: 'Online Filing',
      badge: 'Popular',
      services: [
        { name: 'Base Fee (1 income source)', price: 'Rs 999' },
        { name: 'More than one income source', price: 'Rs 1,500' },
      ],
      addon: {
        label: 'Optional Add-on',
        items: [
          { name: 'CA Review', price: 'Rs 1,000' },
        ],
      },
    },
    {
      title: 'Online Filing',
      badge: null,
      services: [
        { name: 'Individual / Sole Proprietor', price: 'Rs 3,000' },
        { name: 'Partnership / AOP', price: 'Rs 4,500' },
        { name: 'Private Limited Company', price: 'Rs 6,000' },
        { name: 'Non-Profit Organization', price: 'Rs 9,000' },
      ],
      addon: {
        label: 'CA Review Add-on',
        items: [
          { name: 'Individual / Sole Proprietor', price: 'Rs 2,000' },
          { name: 'Partnership / AOP', price: 'Rs 3,000' },
          { name: 'Private Limited Company', price: 'Rs 4,000' },
          { name: 'Non-Profit Organization', price: 'Rs 4,000' },
        ],
      },
    },
  ];

  const businessTaxServices = [
    {
      title: 'Upload Documents',
      badge: null,
      services: [
        { name: 'Individual / Sole Proprietor', price: 'Rs 5,000' },
        { name: 'Partnership / AOP', price: 'Rs 7,500' },
        { name: 'Private Limited Company', price: 'Rs 10,000' },
        { name: 'Non-Profit Organization', price: 'Rs 13,000' },
      ],
      addon: {
        label: 'CA Review Add-on',
        items: [
          { name: 'Individual / Sole Proprietor', price: 'Rs 2,000' },
          { name: 'Partnership / AOP', price: 'Rs 3,000' },
          { name: 'Private Limited Company', price: 'Rs 4,000' },
          { name: 'Non-Profit Organization', price: 'Rs 4,000' },
        ],
      },
    },
  ];

  const otherServices = [
    {
      title: 'NTN Registration',
      badge: 'Popular',
      services: [
        { name: 'Salaried Individual', price: 'Rs 500' },
        { name: 'Sole Proprietor', price: 'Rs 1,500' },
        { name: 'Partnership / AOP', price: 'Rs 3,500' },
        { name: 'Private Limited Company', price: 'Rs 7,000' },
        { name: 'Non-Profit Organization', price: 'Rs 9,000' },
      ],
      addon: null,
    },
    {
      title: 'GST Registration',
      badge: null,
      services: [
        { name: 'Flat Fee', price: 'Rs 9,000' },
      ],
      addon: null,
    },
    {
      title: 'IRIS Profile Update',
      badge: null,
      services: [
        { name: 'Salary Income', price: 'Rs 100' },
        { name: 'Business Income', price: 'Rs 800' },
      ],
      addon: null,
    },
  ];

  const renderServiceCard = (service: any, index: number) => (
    <div
      key={index}
      className="group bg-white rounded-2xl border-2 border-green-100 p-6 sm:p-8 hover:shadow-2xl hover:border-green-300 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-50 to-teal-50 rounded-full -ml-12 -mb-12 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
              <Receipt className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">{service.title}</h3>
          </div>
          {service.badge && (
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full self-start shadow-lg shadow-green-500/50 animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {service.badge}
            </span>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {service.services.map((item: any, idx: number) => (
            <div key={idx} className="flex items-start sm:items-center justify-between py-3 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group/item border border-green-200">
              <div className="flex items-center gap-3 flex-1">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                <span className="text-sm sm:text-base text-gray-800 font-medium">{item.name}</span>
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap ml-3">{item.price}</span>
            </div>
          ))}
        </div>

        {service.addon && (
          <div className="mt-6 pt-6 border-t-2 border-green-200">
            <div className="flex items-center space-x-2 mb-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200">
              <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 animate-pulse" />
              <span className="text-sm font-bold text-purple-900">{service.addon.label}</span>
            </div>
            <div className="space-y-3 ml-2">
              {service.addon.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start sm:items-center justify-between gap-2 py-2 px-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <span className="text-xs sm:text-sm text-gray-700 flex-1 font-medium">{item.name}</span>
                  <span className="text-sm sm:text-base font-bold text-purple-600 whitespace-nowrap">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const getActiveServices = () => {
    switch (activeTab) {
      case 'personal':
        return personalTaxServices;
      case 'business':
        return businessTaxServices;
      case 'other':
        return otherServices;
      default:
        return personalTaxServices;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-8 sm:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGgydjJ6bTAgNGgydjJ6bS0yIDJoMnYyem0wLTRoMnYyem0wIDhoMnYyek0zNCA0aDJ2MnptMCA0aDJ2MnptLTIgMmgydjJ6bTAtNGgydjJ6bTAgOGgydjJ6bS0yIDJoMnYyek0zMiAyaDJ2MnptMCA0aDJ2MnptLTIgMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500 animate-pulse">
              <Receipt className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3 flex-wrap">
            Service Pricing
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent and competitive pricing for all your tax and business needs
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">Best Value</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">Fast Service</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 mb-12 shadow-xl border-2 border-green-200 inline-flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto mx-auto">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 sm:flex-none px-6 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'personal'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-green-50'
            }`}
          >
            Personal Tax
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`flex-1 sm:flex-none px-6 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'business'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-green-50'
            }`}
          >
            Business Tax
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`flex-1 sm:flex-none px-6 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'other'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-green-50'
            }`}
          >
            Other Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getActiveServices().map((service, index) => renderServiceCard(service, index))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full -mr-20 -mt-20 opacity-30"></div>
          <div className="relative z-10">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  Important Notice
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  All prices are subject to consultation and may vary based on the complexity of your case.
                  Contact us for a detailed quote tailored to your specific needs. We pride ourselves on offering
                  competitive pricing with exceptional service quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
