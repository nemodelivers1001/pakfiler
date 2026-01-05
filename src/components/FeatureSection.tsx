import { Shield, CheckCircle2, FileCheck, Users, History, Lock, Headphones, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  trustBadge?: string;
}

export default function FeatureSection({ title, subtitle, trustBadge }: FeatureSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const featureItems = [
    { icon: CheckCircle2, text: "Access your tax dashboard instantly" },
    { icon: FileCheck, text: "Secure file management & tracking" },
    { icon: Users, text: "Professional tax expert support" },
    { icon: History, text: "Complete filing history & documents" },
    { icon: CheckCircle2, text: "FBR compliance guaranteed" },
    { icon: Headphones, text: "24/7 customer support available" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight whitespace-pre-line">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-medium leading-relaxed max-w-lg">
          {subtitle}
        </p>
        {trustBadge && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pak-green-50 to-emerald-50 text-pak-green-700 px-5 py-2.5 rounded-2xl text-sm font-bold border border-pak-green-100 shadow-sm"
          >
            <Star className="w-4 h-4 fill-pak-green-600 text-pak-green-600" />
            {trustBadge}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white p-8 lg:p-10"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pak-green-50 to-pak-green-100 flex items-center justify-center border border-pak-green-100 shadow-inner">
            <Shield className="w-6 h-6 text-pak-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Your Tax Management Hub</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 group"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pak-green-50 flex items-center justify-center group-hover:bg-pak-green-600 transition-colors duration-300">
                <item.icon className="w-4 h-4 text-pak-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-gray-700 font-semibold text-sm group-hover:text-gray-900 transition-colors">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="bg-gradient-to-br from-pak-green-600 to-pak-green-700 rounded-[2.5rem] shadow-xl shadow-pak-green-200/50 p-8 lg:p-10 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Bank-Level Security</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              "256-bit SSL Encryption",
              "FBR Compliant Protocols",
              "Secure Cloud Storage",
              "Regular Security Audits"
            ].map((text, i) => (
              <div key={i} className="flex items-center space-x-2 text-white/90 font-bold text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <p className="text-pak-green-50 font-medium leading-relaxed opacity-90">
            Your sensitive tax information is protected with the same security standards used by major global financial institutions.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
