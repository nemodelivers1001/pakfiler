import { useState } from 'react';
import { Receipt, Info, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

type PricingItem = {
  name: string;
  price: string;
};

type AddonGroup = {
  title: string;
  items: PricingItem[];
};

type PricingSection = {
  title: string;
  badge?: string;
  items: PricingItem[];
  addon?: PricingItem;
  addonGroup?: AddonGroup;
};

type TabType = 'personalTax' | 'businessTax' | 'otherServices';

export default function ServicePricing() {
  const [activeTab, setActiveTab] = useState<TabType>('personalTax');
  const isMobile = useMobile();

  const pricingData: Record<TabType, PricingSection[]> = {
    personalTax: [
      {
        title: 'Online Filing',
        badge: 'Popular',
        items: [
          { name: 'Base Fee (1 income source)', price: 'Rs 999' },
          { name: 'More than one income source', price: 'Rs 1,500' },
        ],
        addon: { name: 'CA Review', price: 'Rs 1,000' },
      },
      {
        title: 'Upload Documents',
        items: [
          { name: 'Base Fee', price: 'Rs 3,500' },
        ],
        addon: { name: 'CA Review', price: 'Rs 1,000' },
      }
    ],
    businessTax: [
      {
        title: 'Online Filing',
        badge: 'Popular',
        items: [
          { name: 'Individual / Sole Proprietor', price: 'Rs 3,000' },
          { name: 'Partnership / AOP', price: 'Rs 4,500' },
          { name: 'Private Limited Company', price: 'Rs 6,000' },
          { name: 'Non-Profit Organization', price: 'Rs 9,000' },
        ],
        addonGroup: {
          title: 'CA Review Add-on',
          items: [
            { name: 'Individual / Sole Proprietor', price: 'Rs 2,000' },
            { name: 'Partnership / AOP', price: 'Rs 3,000' },
            { name: 'Private Limited Company', price: 'Rs 4,000' },
            { name: 'Non-Profit Organization', price: 'Rs 4,000' },
          ]
        }
      },
      {
        title: 'Upload Documents',
        items: [
          { name: 'Individual / Sole Proprietor', price: 'Rs 5,000' },
          { name: 'Partnership / AOP', price: 'Rs 7,500' },
          { name: 'Private Limited Company', price: 'Rs 10,000' },
          { name: 'Non-Profit Organization', price: 'Rs 13,000' },
        ],
        addonGroup: {
          title: 'CA Review Add-on',
          items: [
            { name: 'Individual / Sole Proprietor', price: 'Rs 2,000' },
            { name: 'Partnership / AOP', price: 'Rs 3,000' },
            { name: 'Private Limited Company', price: 'Rs 4,000' },
            { name: 'Non-Profit Organization', price: 'Rs 4,000' },
          ]
        }
      }
    ],
    otherServices: [
      {
        title: 'NTN Registration',
        badge: 'Popular',
        items: [
          { name: 'Salaried Individual', price: 'Rs 500' },
          { name: 'Sole Proprietor', price: 'Rs 1,500' },
          { name: 'Partnership / AOP', price: 'Rs 3,500' },
          { name: 'Private Limited Company', price: 'Rs 7,000' },
          { name: 'Non-Profit Organization', price: 'Rs 9,000' },
        ]
      },
      {
        title: 'GST Registration',
        items: [
          { name: 'Flat Fee', price: 'Rs 9,000' }
        ]
      },
      {
        title: 'IRIS Profile Update',
        items: [
          { name: 'Salary Income', price: 'Rs 100' },
          { name: 'Business Income', price: 'Rs 800' }
        ]
      }
    ]
  };

  const tabs = [
    { id: 'personalTax', label: 'Personal Tax' },
    { id: 'businessTax', label: 'Business Tax' },
    { id: 'otherServices', label: 'Other Services' },
  ];

  return (
    <div className="glass-card rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-pak-green-900/10 p-5 sm:p-10 lg:p-14 mb-12 overflow-hidden relative border-white/40 backdrop-blur-2xl ring-1 ring-white/20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pak-green-100/30 rounded-full blur-[120px] -mr-48 -mt-48"></div>

      {!isMobile && (
        <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10 mb-14">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pak-green-500 to-pak-green-brand rounded-[22px] flex items-center justify-center shadow-2xl shadow-pak-green-600/40 rotate-6">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">Service Pricing</h3>
                <div className="px-3 py-1 bg-pak-green-100 text-pak-green-700 text-[11px] font-black rounded-full flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> OFFICIAL
                </div>
              </div>
              <p className="text-[15px] text-gray-500 font-bold max-w-lg leading-relaxed">Experience the gold standard in tax filing with our transparent, competitive pricing model.</p>
            </div>
          </div>
        </div>
      )}

      {/* Responsive One-Liner Tabs */}
      <div className="relative z-20 mb-8 sm:mb-12 overflow-x-auto no-scrollbar -mx-2 px-2 pb-2">
        <LayoutGroup>
          <div className="bg-pak-green-950/5 p-1.5 rounded-[20px] sm:rounded-[24px] flex items-center shadow-inner border border-white/60 Backdrop-blur-md w-max sm:w-fit mx-auto sm:mx-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`relative px-6 sm:px-10 py-2.5 sm:py-3.5 text-xs sm:text-[15px] font-black rounded-[16px] sm:rounded-[20px] transition-all duration-500 flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-pak-green-800'}`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-pricing-tab-premium"
                    className="absolute inset-0 bg-gradient-to-r from-pak-green-500 to-pak-green-brand rounded-[16px] sm:rounded-[20px] shadow-xl shadow-pak-green-700/50"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.7 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 ${activeTab === 'otherServices' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6 sm:gap-10 pb-8`}
          >
            {pricingData[activeTab].map((section, idx) => (
              <div key={idx} className="bg-white/95 border-2 border-pak-green-50 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] shadow-xl hover:border-pak-green-200 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="space-y-1.5">
                    <h4 className="text-xl sm:text-2xl font-black text-pak-green-950 uppercase tracking-tight">{section.title}</h4>
                    <div className="h-1.5 w-12 bg-pak-green-500 rounded-full shadow-sm"></div>
                  </div>
                  {section.badge && !isMobile && (
                    <span className="px-4 py-1.5 bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white text-[10px] font-black rounded-xl uppercase tracking-tight flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" /> Popular
                    </span>
                  )}
                </div>

                <div className="space-y-5 sm:space-y-7 flex-1">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 w-[65%]">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-pak-green-600 shrink-0" />
                        <span className="text-xs sm:text-[14px] font-black text-gray-800 uppercase tracking-tighter sm:tracking-normal leading-tight">{item.name}</span>
                      </div>
                      <span className="text-lg sm:text-2xl font-black text-pak-green-800 tabular-nums tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>

                {(section.addon || section.addonGroup) && (
                  <div className="mt-8 pt-8 border-t-2 border-dashed border-pak-green-100">
                    {section.addon && (
                      <div className="flex items-center justify-between p-4 bg-pak-green-50/50 rounded-2xl border border-pak-green-100">
                        <span className="text-[13px] font-black text-pak-green-900">{section.addon.name}</span>
                        <span className="text-base font-black text-pak-green-700">{section.addon.price}</span>
                      </div>
                    )}
                    {section.addonGroup && (
                      <div className="space-y-3 p-4 bg-pak-green-50/30 rounded-2xl border border-pak-green-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{section.addonGroup.title}</p>
                        {section.addonGroup.items.map((addon, aIdx) => (
                          <div key={aIdx} className="flex justify-between items-center text-[11px] font-black uppercase tracking-tighter">
                            <span className="text-pak-green-900/70">{addon.name}</span>
                            <span className="text-pak-green-700">{addon.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/50 backdrop-blur-md border border-white rounded-full shadow-lg">
          <div className="w-1.5 h-1.5 bg-pak-green-500 rounded-full animate-ping"></div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[4px]">Verified Service Excellence</p>
        </div>
      </div>
    </div>
  );
}
