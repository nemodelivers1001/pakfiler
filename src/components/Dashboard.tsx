import { Calculator, ShoppingCart, Briefcase, UserPlus, FileText, DollarSign, User, TrendingUp, Clock, CheckCircle, Building, Users, ArrowRight, Sparkles, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getUserApplications } from '../lib/gstService';
import { getUserIRISSubmissions } from '../lib/irisService';
import ServicePricing from './ServicePricing';
import FAQ from './FAQ';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

interface DashboardProps {
  onNavigateToCalculator: () => void;
  onNavigateToGSTRegistration: () => void;
  onNavigateToIRISProfile?: () => void;
  onNavigateToNTNRegistration?: () => void;
  onNavigateToBusinessTaxFiling?: () => void;
}

export default function Dashboard({ onNavigateToCalculator, onNavigateToGSTRegistration, onNavigateToIRISProfile, onNavigateToNTNRegistration, onNavigateToBusinessTaxFiling }: DashboardProps) {
  const { user } = useAuth();
  const isMobile = useMobile();
  const [stats, setStats] = useState([
    { label: 'Total Applications', value: 0, subtitle: 'No activity this month', icon: TrendingUp, color: 'bg-gradient-to-br from-blue-500 to-blue-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Pending Payment', value: 0, subtitle: 'No pending payments', icon: DollarSign, color: 'bg-gradient-to-br from-amber-500 to-orange-600', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
    { label: 'Under Process', value: 0, subtitle: 'No active applications', icon: Clock, color: 'bg-gradient-to-br from-cyan-500 to-teal-600', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
    { label: 'Completed', value: 0, subtitle: 'No completed applications', icon: CheckCircle, color: 'bg-gradient-to-br from-green-500 to-emerald-600', iconBg: 'bg-green-100', iconColor: 'text-pak-green-600' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gstApplications, irisSubmissions] = await Promise.all([
          getUserApplications(),
          getUserIRISSubmissions(),
        ]);

        const allApplications = [
          ...gstApplications.map(app => ({
            payment_status: app.payment_status,
            status: app.status,
          })),
          ...irisSubmissions.map(sub => ({
            payment_status: sub.payment_status,
            status: sub.status,
          })),
        ];

        const total = allApplications.length;
        const pendingPayment = allApplications.filter(app =>
          app.payment_status === 'pending' || app.payment_status === 'unpaid'
        ).length;
        const underProcess = allApplications.filter(app =>
          app.status === 'payment_verified' || app.status === 'processing'
        ).length;
        const completed = allApplications.filter(app => app.status === 'completed').length;

        setStats([
          {
            label: 'Total Applications',
            value: total,
            subtitle: total === 0 ? 'No activity this month' : `${total} application${total !== 1 ? 's' : ''} submitted`,
            icon: TrendingUp,
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
          },
          {
            label: 'Pending Payment',
            value: pendingPayment,
            subtitle: pendingPayment === 0 ? 'No pending payments' : `${pendingPayment} payment${pendingPayment !== 1 ? 's' : ''} awaiting`,
            icon: DollarSign,
            color: 'bg-gradient-to-br from-amber-500 to-orange-600',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600'
          },
          {
            label: 'Under Process',
            value: underProcess,
            subtitle: underProcess === 0 ? 'No active applications' : `${underProcess} application${underProcess !== 1 ? 's' : ''} in progress`,
            icon: Clock,
            color: 'bg-gradient-to-br from-cyan-500 to-teal-600',
            iconBg: 'bg-cyan-100',
            iconColor: 'text-cyan-600'
          },
          {
            label: 'Completed',
            value: completed,
            subtitle: completed === 0 ? 'No completed applications' : `${completed} application${completed !== 1 ? 's' : ''} finished`,
            icon: CheckCircle,
            color: 'bg-gradient-to-br from-pak-green-500 to-pak-green-brand',
            iconBg: 'bg-green-100',
            iconColor: 'text-pak-green-600'
          },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  const getUserName = () => {
    const metadata = user?.user_metadata;
    return metadata?.full_name || 'User';
  };

  const services = [
    {
      title: 'Personal Tax Filing',
      description: 'For Salaried Employees (Govt & Private Sector), Teacher, Researcher, Other income sources',
      icon: User,
      badge: 'Popular',
      badgeColor: 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand',
      iconBg: 'bg-pak-green-100',
      iconColor: 'text-pak-green-600',
      available: true,
    },
    {
      title: 'Family Tax Filing',
      description: 'File tax returns for your family members',
      icon: Users,
      badge: null,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      available: true,
    },
    {
      title: 'NTN Registration',
      description: 'Register NTN for Salaried, Sole Proprietor, Partnership/AOP, Company, NPO',
      icon: FileText,
      badge: 'Hot',
      badgeColor: 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand',
      iconBg: 'bg-pak-green-100',
      iconColor: 'text-pak-green-700',
      available: true,
    },
    {
      title: 'IRIS Profile Update',
      description: 'Request to update IRIS Profile for Salaried Individual or your Business',
      icon: UserPlus,
      badge: null,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-pak-green-600',
      available: true,
    },
    {
      title: 'Business Tax Return',
      description: 'For Sole Proprietor, Partnership/AOP, Pvt Ltd, NPO/Charity/Trust',
      icon: Briefcase,
      badge: 'Popular',
      badgeColor: 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand',
      iconBg: 'bg-pak-green-100',
      iconColor: 'text-pak-green-600',
      available: true,
    },
    {
      title: 'Business Incorporation',
      description: 'Incorporate your business (Coming Soon)',
      icon: Building,
      badge: 'Available Soon',
      badgeColor: 'bg-gray-400',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-500',
      available: false,
    },
    {
      title: 'GST Registration',
      description: 'Register your business for General Sales Tax (GST)',
      icon: ShoppingCart,
      badge: null,
      iconBg: 'bg-pak-green-100',
      iconColor: 'text-pak-green-600',
      available: true,
    },
    {
      title: 'Salary Tax Calculator',
      description: 'Calculate total payable tax amount on your salary income with our free calculator',
      icon: Calculator,
      badge: 'Popular',
      badgeColor: 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-pak-green-700',
      available: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#effaf3]">
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Banner / Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-pak-green-500 to-pak-green-brand rounded-[32px] p-6 lg:p-10 mb-8 overflow-hidden shadow-[0_20px_50px_-20px_rgba(25,135,84,0.4)] ring-1 ring-white/20 group"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pak-green-400/20 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-center sm:text-left">
            <div className="max-w-3xl">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
                <span className="px-3.5 py-1 bg-pak-green-900/40 text-emerald-300 text-[10px] font-black rounded-full border border-pak-green-400/30 backdrop-blur-md uppercase tracking-[1px]">Tax Year 2025</span>
                <div className="flex items-center gap-1.5 px-3.5 py-1 bg-white/10 text-white text-[10px] font-black rounded-full border border-white/10 backdrop-blur-md uppercase tracking-[1px]">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  System Active
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight leading-tight uppercase">
                Welcome back, <br className="sm:hidden" />
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">{getUserName()}!</span>
              </h2>

              <p className="text-emerald-50/70 text-sm sm:text-lg mb-8 font-medium max-w-lg leading-relaxed mx-auto sm:mx-0">Your comprehensive tax management dashboard is ready for precision filing.</p>

              <div className="flex justify-center sm:justify-start">
                <div className="group/alert flex items-center gap-3 bg-black/20 hover:bg-black/30 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-white/5 transition-all duration-300">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-orange-200 font-bold text-[10px] uppercase tracking-wider">Hurry up!</span>
                    <span className="text-white/60 font-medium text-[9px] sm:text-[11px]">Accepting tax returns with priority</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block lg:mr-10">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-[32px] flex items-center justify-center border border-white/20 shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center border border-white/30">
                  <FileText className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white/80 border border-white/60 rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 flex flex-col relative overflow-hidden group transition-all duration-500 backdrop-blur-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="relative z-10">
                  <p className="text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                  <p className="text-2xl sm:text-4xl font-black text-pak-green-950">{loading ? <span className="inline-block w-8 h-8 bg-gray-100 animate-pulse rounded-md"></span> : stat.value}</p>
                </div>
                {!isMobile && (
                  <div className={`p-3 rounded-2xl ${stat.iconBg.replace('bg-', 'bg-')}/30 border border-white/40`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                )}
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[10px] sm:text-[12px] text-gray-500 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pak-green-500 rounded-full"></span>
                  {stat.subtitle.split(' ')[0]}...
                </p>
                <div className="h-1.5 w-full bg-gray-100/50 rounded-full overflow-hidden relative">
                  <div className={`h-full bg-gradient-to-r from-pak-green-500 to-pak-green-brand w-2/3 rounded-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Available Services Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white/40 border-2 border-white/60 rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 mb-12 overflow-hidden backdrop-blur-2xl shadow-xl shadow-pak-green-900/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pak-green-400/10 to-emerald-400/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-pak-green-500 to-pak-green-brand rounded-2xl flex items-center justify-center shadow-xl shadow-pak-green-900/20">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl sm:text-3xl font-black text-pak-green-950 tracking-tight uppercase">Available Services</h3>
                <div className="px-3 py-0.5 bg-pak-green-100 text-pak-green-700 text-[9px] font-black rounded-full border border-pak-green-200">LIVE</div>
              </div>
              <p className="text-[13px] sm:text-[15px] text-gray-500 font-bold">Comprehensive tax & business solutions tailored for you</p>
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={service.available ? { y: -8, scale: 1.02 } : {}}
                onClick={() => {
                  if (service.available) {
                    if (service.title === 'Salary Tax Calculator') onNavigateToCalculator();
                    else if (service.title === 'GST Registration') onNavigateToGSTRegistration();
                    else if (service.title === 'NTN Registration' && onNavigateToNTNRegistration) onNavigateToNTNRegistration();
                    else if (service.title === 'Business Tax Return' && onNavigateToBusinessTaxFiling) onNavigateToBusinessTaxFiling();
                    else if (service.title === 'IRIS Profile Update' && onNavigateToIRISProfile) onNavigateToIRISProfile();
                  }
                }}
                className={`group relative bg-white/95 border-2 border-pak-green-50 rounded-[24px] sm:rounded-[40px] p-5 sm:p-10 transition-all flex flex-col items-center text-center shadow-[0_10px_30px_-5px_rgba(25,135,84,0.05)] hover:border-pak-green-200 ${service.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              >
                {!isMobile && service.badge && (
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-1.5 ${service.badgeColor} text-white text-[10px] font-black rounded-xl shadow-lg uppercase tracking-tight`}>{service.badge}</span>
                  </div>
                )}
                <div className={`w-14 h-14 sm:w-20 sm:h-20 ${service.iconBg} rounded-[20px] sm:rounded-3xl flex items-center justify-center mb-5 sm:mb-8 border border-white group-hover:rotate-6 transition-transform`}>
                  <service.icon className={`w-7 h-7 sm:w-10 sm:h-10 ${service.iconColor}`} />
                </div>
                <h4 className="text-sm sm:text-xl font-black text-pak-green-950 mb-2 sm:mb-4 group-hover:text-pak-green-700 transition-colors uppercase tracking-tight leading-tight">{service.title}</h4>
                {!isMobile && <p className="text-[13px] text-gray-500 font-bold leading-relaxed">{service.description}</p>}
                {!isMobile && service.available && (
                  <div className="mt-8 flex items-center gap-2 text-pak-green-600 font-black text-xs opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    GET STARTED <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <ServicePricing />
        <FAQ />
      </main>
    </div>
  );
}
