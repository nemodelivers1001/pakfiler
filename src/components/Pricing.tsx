import { useState, useEffect } from 'react';
import { Receipt, CheckCircle, Info, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServicePricing from './ServicePricing';
import { useMobile } from '../hooks/useMobile';

export default function Pricing() {
  const isMobile = useMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#effaf3] py-6 sm:py-12">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pak-green-100/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-pak-green-800 via-pak-green-700 to-pak-green-900 rounded-[32px] p-6 lg:p-10 mb-10 overflow-hidden shadow-[0_20px_50px_-20px_rgba(25,135,84,0.4)] ring-1 ring-white/20 group"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pak-green-400/20 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-3xl">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <span className="px-3.5 py-1 bg-pak-green-900/40 text-emerald-300 text-[10px] font-black rounded-full border border-pak-green-400/30 backdrop-blur-md uppercase tracking-[1px]">Tax Services</span>
                  <div className="flex items-center gap-1.5 px-3.5 py-1 bg-white/10 text-white text-[10px] font-black rounded-full border border-white/10 backdrop-blur-md">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> OFFICIAL RATES
                  </div>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight leading-tight uppercase">
                  Transparent <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">Pricing Structure</span>
                </h2>

                <p className="text-emerald-50/70 text-base sm:text-lg mb-8 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
                  Detailed breakdown of our professional service fees for the Tax Year 2025. Guaranteed no hidden costs.
                </p>
              </div>

              <div className="relative hidden lg:block lg:mr-10">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-[32px] flex items-center justify-center border border-white/20 shadow-2xl">
                  <Receipt className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <ServicePricing />

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-xl border border-white rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 text-center relative overflow-hidden group shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pak-green-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h3 className="text-xl sm:text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Need Custom Solutions?</h3>
          <p className="text-gray-500 font-bold mb-8 max-w-xl mx-auto">For corporations or specialized tax requirements, our expert tax consultants are available for personalized assistance.</p>
          <button className="bg-pak-green-950 hover:bg-black text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-[3px] shadow-2xl transition-all hover:scale-105 active:scale-95">Contact Support</button>
        </motion.div>
      </div>
    </div>
  );
}
