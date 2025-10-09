import { Calculator, FileCheck, Users, Building, ShoppingCart, Briefcase, UserPlus, FileText, DollarSign, User, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getUserApplications } from '../lib/gstService';
import ServicePricing from './ServicePricing';
import FAQ from './FAQ';

interface DashboardProps {
  onNavigateToCalculator: () => void;
  onNavigateToGSTRegistration: () => void;
  onNavigateToIRISProfile?: () => void;
}

export default function Dashboard({ onNavigateToCalculator, onNavigateToGSTRegistration, onNavigateToIRISProfile }: DashboardProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Total Applications', value: 0, subtitle: 'Loading...', icon: TrendingUp, color: 'bg-gradient-to-br from-blue-500 to-blue-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Pending Payment', value: 0, subtitle: 'Loading...', icon: DollarSign, color: 'bg-gradient-to-br from-amber-500 to-orange-600', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
    { label: 'Under Process', value: 0, subtitle: 'Loading...', icon: Clock, color: 'bg-gradient-to-br from-cyan-500 to-teal-600', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
    { label: 'Completed', value: 0, subtitle: 'Loading...', icon: CheckCircle, color: 'bg-gradient-to-br from-green-500 to-emerald-600', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const applications = await getUserApplications();
        const total = applications.length;
        const pendingPayment = applications.filter(app => app.payment_status === 'pending').length;
        const underProcess = applications.filter(app =>
          app.status === 'payment_verified' || app.status === 'processing'
        ).length;
        const completed = applications.filter(app => app.status === 'completed').length;

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
            color: 'bg-gradient-to-br from-green-500 to-emerald-600',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600'
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
      badgeColor: 'bg-orange-500',
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      available: true,
    },
    {
      title: 'Family Tax Filing',
      description: 'File tax returns for your family members',
      icon: Users,
      badge: null,
      iconBg: 'bg-gradient-to-br from-pink-400 to-rose-600',
      available: true,
    },
    {
      title: 'NTN Registration',
      description: 'Register NTN for Salaried, Sole Proprietor, Partnership/AOP, Company, NPO',
      icon: FileText,
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      iconBg: 'bg-gradient-to-br from-red-400 to-red-600',
      available: true,
    },
    {
      title: 'IRIS Profile Update',
      description: 'Request to update IRIS Profile for Salaried Individual or your Business',
      icon: UserPlus,
      badge: null,
      iconBg: 'bg-gradient-to-br from-green-400 to-emerald-600',
      available: true,
    },
    {
      title: 'Business Tax Return',
      description: 'For Sole Proprietor, Partnership/AOP, Pvt Ltd, NPO/Charity/Trust',
      icon: Briefcase,
      badge: 'Popular',
      badgeColor: 'bg-orange-500',
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600',
      available: true,
    },
    {
      title: 'Business Incorporation',
      description: 'Incorporate your business (Coming Soon)',
      icon: Building,
      badge: 'Available Soon',
      badgeColor: 'bg-gray-400',
      iconBg: 'bg-gradient-to-br from-gray-300 to-gray-500',
      available: false,
    },
    {
      title: 'GST Registration',
      description: 'Register your business for General Sales Tax (GST)',
      icon: ShoppingCart,
      badge: null,
      iconBg: 'bg-gradient-to-br from-teal-400 to-cyan-600',
      available: true,
    },
    {
      title: 'Salary Tax Calculator',
      description: 'Calculate total payable tax amount on your salary income with our free calculator',
      icon: Calculator,
      badge: 'Popular',
      badgeColor: 'bg-orange-500',
      iconBg: 'bg-gradient-to-br from-violet-400 to-violet-600',
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-green-50/40">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 overflow-hidden shadow-2xl animate-[fadeInSlideUp_0.6s_ease-out]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTM2IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl animate-[pulse_5s_ease-in-out_infinite]"></div>

          <div className="relative flex flex-wrap items-center gap-2 mb-6 sm:mb-0 sm:absolute sm:top-6 sm:left-6 z-10">
            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-emerald-700 text-xs font-bold rounded-full shadow-lg animate-[bounceIn_0.8s_ease-out]">
              Tax Year 2025
            </span>
            <span className="px-4 py-1.5 bg-emerald-700/80 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg animate-[bounceIn_0.9s_ease-out]">
              Active
            </span>
          </div>

          <div className="hidden sm:block absolute top-6 right-6 sm:top-8 sm:right-8 z-10 animate-[float_3s_ease-in-out_infinite]">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          <div className="relative sm:mt-10 z-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg animate-[fadeInSlideRight_0.8s_ease-out]">
              Welcome back, {getUserName()}!
            </h2>
            <p className="text-sm sm:text-lg text-emerald-50 mb-5 font-medium drop-shadow animate-[fadeInSlideRight_0.9s_ease-out]">
              Your comprehensive tax management dashboard is ready
            </p>
            <div className="flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 animate-[fadeInSlideRight_1s_ease-out]">
              <span className="text-sm font-bold text-yellow-300 drop-shadow">⏰ Hurry up</span>
              <span className="text-sm text-white/90">before its too late, still accepting tax returns</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 group-hover:text-emerald-600 transition-colors">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1 group-hover:from-emerald-600 group-hover:to-green-600 transition-all duration-300">
                    {loading ? (
                      <span className="inline-block animate-pulse">...</span>
                    ) : (
                      <span className="inline-block animate-[countUp_0.8s_ease-out]">{stat.value}</span>
                    )}
                  </p>
                </div>
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <stat.icon className={`w-7 h-7 sm:w-8 sm:h-8 text-white`} />
                  </div>
                </div>
              </div>

              <div className="relative h-1.5 w-full bg-gray-100 rounded-full mb-3 overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000 ${loading ? 'w-0' : 'w-full'}`}></div>
              </div>

              <p className="relative text-xs sm:text-sm text-gray-600 font-medium">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-7 lg:p-9 mb-6 sm:mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>

          <div className="relative flex items-center gap-3 mb-6 sm:mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Available Services</h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Choose the service that fits your needs</p>
            </div>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  if (service.available) {
                    if (service.title === 'Salary Tax Calculator') {
                      onNavigateToCalculator();
                    } else if (service.title === 'GST Registration') {
                      onNavigateToGSTRegistration();
                    } else if (service.title === 'IRIS Profile Update' && onNavigateToIRISProfile) {
                      onNavigateToIRISProfile();
                    }
                  }
                }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 border-2 rounded-2xl p-5 sm:p-6 transition-all duration-500 overflow-hidden ${
                  service.available
                    ? 'border-gray-200 hover:border-emerald-400 hover:shadow-2xl cursor-pointer hover:-translate-y-2 hover:from-emerald-50/50 hover:to-green-50/50'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/0 to-green-400/0 group-hover:from-emerald-400/20 group-hover:to-green-400/20 rounded-full blur-2xl transition-all duration-700"></div>

                {service.badge && (
                  <span
                    className={`absolute -top-2 -right-2 px-3 py-1.5 ${service.badgeColor} text-white text-xs font-bold rounded-full shadow-lg z-10 animate-[bounceIn_0.6s_ease-out]`}
                  >
                    {service.badge}
                  </span>
                )}

                <div className="relative mb-5">
                  <div className="relative">
                    <div className={`absolute inset-0 ${service.available ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gray-400'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                      service.available ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gray-300'
                    } group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </div>

                <h4 className="relative text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{service.title}</h4>
                <p className="relative text-xs sm:text-sm text-gray-600 leading-relaxed">{service.description}</p>

                {service.available && (
                  <div className="relative mt-4 pt-4 border-t border-gray-200 group-hover:border-emerald-200 transition-colors">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 group-hover:gap-2 transition-all">
                      Click to get started
                      <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <ServicePricing />

        <FAQ />
      </main>
    </div>
  );
}
