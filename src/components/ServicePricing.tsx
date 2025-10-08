import { Receipt, Info, ChevronDown } from 'lucide-react';

export default function ServicePricing() {
  const pricingData = {
    personalTax: [
      {
        title: 'Online Filing',
        items: [
          { name: 'Base Fee (1 income source)', price: 'Rs 999', badge: 'Popular' },
          { name: 'More than one income source', price: 'Rs 1,500' },
        ],
        addon: { name: 'CA Review', price: 'Rs 1,000' },
      },
    ],
    businessTax: [
      {
        title: 'Business Returns',
        items: [
          { name: 'Sole Proprietor', price: 'Starting at Rs 5,000' },
          { name: 'Partnership/AOP', price: 'Starting at Rs 8,000' },
          { name: 'Private Limited', price: 'Starting at Rs 12,000' },
        ],
      },
    ],
    otherServices: [
      {
        title: 'Upload Documents',
        items: [
          { name: 'Base Fee', price: 'Rs 3,500' },
        ],
        addon: { name: 'CA Review', price: 'Rs 1,000' },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Receipt className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Service Pricing</h3>
          <p className="text-sm text-gray-600">Transparent pricing for all our tax and business services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Tax</h4>

          {pricingData.personalTax.map((section, idx) => (
            <div key={idx} className="mb-4">
              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="ml-4 inline-block px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded mt-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-green-700 whitespace-nowrap ml-2">{item.price}</span>
                  </div>
                ))}
              </div>

              {section.addon && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-700">Optional Add-on</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 ml-6">
                    <span className="text-sm text-gray-700">{section.addon.name}</span>
                    <span className="text-sm font-bold text-green-700">{section.addon.price}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Tax</h4>

          {pricingData.businessTax.map((section, idx) => (
            <div key={idx}>
              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-blue-700 whitespace-nowrap ml-2">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Other Services</h4>

          {pricingData.otherServices.map((section, idx) => (
            <div key={idx}>
              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-700 whitespace-nowrap ml-2">{item.price}</span>
                  </div>
                ))}
              </div>

              {section.addon && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-700">Optional Add-on</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 ml-6">
                    <span className="text-sm text-gray-700">{section.addon.name}</span>
                    <span className="text-sm font-bold text-gray-700">{section.addon.price}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
