import { useState } from 'react';
import { Receipt, Info } from 'lucide-react';

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
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-green-600 flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{service.title}</h3>
        </div>
        {service.badge && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full self-start">
            {service.badge}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {service.services.map((item: any, idx: number) => (
          <div key={idx} className="flex items-start sm:items-center justify-between py-2 border-b border-gray-100 last:border-0 gap-2">
            <span className="text-xs sm:text-sm text-gray-700 flex-1">{item.name}</span>
            <span className="text-xs sm:text-sm font-bold text-green-600 whitespace-nowrap">{item.price}</span>
          </div>
        ))}
      </div>

      {service.addon && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-600">{service.addon.label}</span>
          </div>
          <div className="space-y-2 ml-6">
            {service.addon.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start sm:items-center justify-between gap-2">
                <span className="text-xs text-gray-600 flex-1">{item.name}</span>
                <span className="text-xs font-semibold text-green-600 whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
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
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Service Pricing</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Transparent pricing for all our tax and business services</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-1 mb-8 flex flex-wrap sm:inline-flex gap-1">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'personal'
                ? 'bg-green-50 text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Personal Tax
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'business'
                ? 'bg-green-50 text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Business Tax
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'other'
                ? 'bg-green-50 text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Other Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getActiveServices().map((service, index) => renderServiceCard(service, index))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Important Notice</h3>
              <p className="text-sm text-blue-800">
                All prices are subject to consultation and may vary based on the complexity of your case.
                Contact us for a detailed quote tailored to your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
