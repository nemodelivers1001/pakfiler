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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-0 sm:absolute sm:top-4 sm:left-4">
            <span className="px-3 py-1 bg-green-400 text-blue-900 text-xs font-semibold rounded-full">
              Tax Year 2025
            </span>
            <span className="px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded-full">
              Active
            </span>
          </div>
          <div className="hidden sm:block absolute top-8 right-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center">
              <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <div className="sm:mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, {getUserName()}!
            </h2>
            <p className="text-sm sm:text-base text-blue-100 mb-4">
              Your comprehensive tax management dashboard is ready
            </p>
            <div className="flex flex-wrap items-center gap-2 text-red-300">
              <span className="text-sm font-medium">⏰ Hurry up</span>
              <span className="text-sm">before its too late, still accepting tax returns</span>
              <span className="text-sm">⏰💰✨</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="h-1 w-full ${stat.color} rounded-full mb-3"></div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-7 lg:p-9 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Available Services</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                className={`group relative bg-white border-2 rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                  service.available
                    ? 'border-gray-200 hover:border-blue-400 hover:shadow-xl cursor-pointer hover:-translate-y-1'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
              >
                {service.badge && (
                  <span
                    className={`absolute -top-2 -right-2 px-3 py-1 ${service.badgeColor} text-white text-xs font-bold rounded-full shadow-md z-10`}
                  >
                    {service.badge}
                  </span>
                )}
                <div className="mb-5">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    service.available ? service.iconBg : 'bg-gray-300'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{service.description}</p>
                {service.available && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">Click to get started →</span>
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
