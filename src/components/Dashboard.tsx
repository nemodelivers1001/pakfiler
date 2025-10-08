import { LogOut, Home, FileText, User, DollarSign, HelpCircle, Calculator, FileCheck, Users, Building, ShoppingCart, Briefcase, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import ServicePricing from './ServicePricing';
import FAQ from './FAQ';

interface DashboardProps {
  onNavigateToCalculator: () => void;
}

export default function Dashboard({ onNavigateToCalculator }: DashboardProps) {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getUserName = () => {
    const metadata = user?.user_metadata;
    return metadata?.full_name || 'User';
  };

  const stats = [
    { label: 'Total Applications', value: '0', subtitle: 'No activity this month', icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Pending Payment', value: '0', subtitle: 'No pending payments', icon: DollarSign, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Under Process', value: '0', subtitle: 'No active applications', icon: FileCheck, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Completed', value: '0', subtitle: 'No activity this month', icon: FileCheck, color: 'bg-green-50 text-green-600' },
  ];

  const services = [
    {
      title: 'Personal Tax Filing',
      description: 'For Salaried Employees (Govt & Private Sector), Teacher, Researcher, Other income sources',
      icon: User,
      badge: 'Popular',
      badgeColor: 'bg-orange-500',
      available: true,
    },
    {
      title: 'Family Tax Filing',
      description: 'File tax returns for your family members',
      icon: Users,
      badge: null,
      available: true,
    },
    {
      title: 'NTN Registration',
      description: 'Register NTN for Salaried, Sole Proprietor, Partnership/AOP, Company, NPO',
      icon: FileText,
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      available: true,
    },
    {
      title: 'IRIS Profile Update',
      description: 'Request to update IRIS Profile for Salaried Individual or your Business',
      icon: UserPlus,
      badge: null,
      available: true,
    },
    {
      title: 'Business Tax Return',
      description: 'For Sole Proprietor, Partnership/AOP, Pvt Ltd, NPO/Charity/Trust',
      icon: Briefcase,
      badge: 'Popular',
      badgeColor: 'bg-orange-500',
      available: true,
    },
    {
      title: 'Business Incorporation',
      description: 'Incorporate your business (Coming Soon)',
      icon: Building,
      badge: 'Available Soon',
      badgeColor: 'bg-gray-400',
      available: false,
    },
    {
      title: 'GST Registration',
      description: 'Register your business for General Sales Tax (GST)',
      icon: ShoppingCart,
      badge: null,
      available: true,
    },
    {
      title: 'Salary Tax Calculator',
      description: 'Calculate total payable tax amount on your salary income with our free calculator',
      icon: Calculator,
      badge: 'Popular',
      badgeColor: 'bg-orange-500',
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PF</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">PakFiler.com</h1>
                <p className="text-xs text-gray-500">Fast, Affordable & Best Tax Filing</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                <FileText className="w-4 h-4" />
                <span className="hidden lg:inline">Track My Submission</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden xl:inline">Profile</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                <DollarSign className="w-4 h-4" />
                <span className="hidden xl:inline">Pricing</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden xl:inline">Help & Support</span>
              </button>
              <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-700 hidden md:inline">User | {getUserName()}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Available Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  if (service.available && service.title === 'Salary Tax Calculator') {
                    onNavigateToCalculator();
                  }
                }}
                className={`relative border-2 rounded-xl p-4 sm:p-6 transition-all hover:shadow-md ${
                  service.available
                    ? 'border-gray-200 hover:border-green-500 cursor-pointer'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
              >
                {service.badge && (
                  <span
                    className={`absolute top-4 right-4 px-2 py-1 ${service.badgeColor} text-white text-xs font-semibold rounded`}
                  >
                    {service.badge}
                  </span>
                )}
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    service.available ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      service.available ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
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
