import { useState, useEffect } from 'react';
import { LogOut, Home, FileText, User, DollarSign, HelpCircle, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface AppHeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function AppHeader({ currentView, onNavigate }: AppHeaderProps) {
  const { user, profile } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getUserName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || 'User';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'track-submissions', label: 'Track My Submission', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'faq', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-white shadow-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-xl lg:text-2xl">PF</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  PakFiler.com
                </h1>
                <p className="text-[10px] lg:text-xs text-gray-500 font-medium">
                  Fast, Affordable & Best Tax Filing
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`group relative flex items-center space-x-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl ${
                      isActive
                        ? 'text-emerald-600'
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl"></div>
                    )}
                    <Icon className={`w-4 h-4 relative z-10 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-emerald-600' : ''
                    }`} />
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {getUserName()}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="hidden lg:flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 hover:bg-red-50 transition-all duration-200 rounded-xl border border-gray-200 hover:border-red-200 group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{getUserName()}</p>
                  <p className="text-xs text-gray-500">Account</p>
                </div>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl ${
                      isActive
                        ? 'bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-600 border border-emerald-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 lg:h-20"></div>
    </>
  );
}
