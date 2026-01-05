import { useState, useEffect } from 'react';
import { LogOut, Home, FileText, User, DollarSign, HelpCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AppHeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function AppHeader({ currentView, onNavigate }: AppHeaderProps) {
  const { user, profile, logout } = useAuth();
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
    await logout();
  };

  const getUserName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || 'User';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'track-submissions', label: 'Track', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'faq', label: 'Help', icon: HelpCircle },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/80 backdrop-blur-2xl border-b border-pak-green-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] py-0'
        : 'bg-white border-b border-gray-100 py-1'
        }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onNavigate('dashboard')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-pak-green-800 to-pak-green-950 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pak-green-900/20 transition-all duration-500 transform group-hover:rotate-6">
                  <span className="text-white font-black text-xl italic tracking-tighter">PF</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-black text-pak-green-950 tracking-tighter uppercase leading-none mb-1">PakFiler<span className="text-pak-green-600">.com</span></h1>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-[1px] leading-none">The standard in tax filing</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="hidden lg:flex items-center bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100/50 backdrop-blur-md">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`group relative flex items-center space-x-2 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-500 rounded-xl ${isActive ? 'text-white' : 'text-gray-500 hover:text-pak-green-700'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-highlighter"
                        className="absolute inset-0 bg-gradient-to-r from-pak-green-500 to-pak-green-brand rounded-xl shadow-[0_8px_20px_-6px_rgba(25,135,84,0.4)] border border-white/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 transition-all duration-500 ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-110 group-hover:-rotate-3'
                      }`} />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-6 mr-2">
                <button className="relative group p-2 text-gray-400 hover:text-pak-green-600 transition-colors">
                  <motion.div whileHover={{ scale: 1.1, rotate: 15 }}>
                    <HelpCircle className="w-5 h-5" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  </motion.div>
                </button>

                <div className="h-8 w-px bg-gray-100"></div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pak-green-50 rounded-xl flex items-center justify-center border border-pak-green-100/50 group cursor-pointer hover:bg-pak-green-100 transition-colors transition-all duration-300">
                    <User className="w-5 h-5 text-pak-green-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Authenticated</span>
                    <span className="text-sm font-black text-gray-800 leading-none">{getUserName()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-600 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 bg-gray-50 text-gray-600 hover:text-pak-green-600 hover:bg-pak-green-50 rounded-xl transition-all border border-transparent hover:border-pak-green-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-2xl"
            >
              <div className="p-4 space-y-2 mt-4">
                <div className="flex items-center space-x-4 p-5 bg-gradient-to-br from-pak-green-50 to-white rounded-3xl border border-pak-green-100/50 mb-6 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-pak-green-600 to-pak-green-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                    <p className="text-base font-black text-gray-900 leading-none">{getUserName()}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onNavigate(item.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-4 px-5 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-2xl ${isActive
                          ? 'bg-gradient-to-r from-pak-green-600 to-pak-green-800 text-white shadow-lg shadow-pak-green-900/10'
                          : 'text-gray-500 hover:bg-pak-green-50 hover:text-pak-green-700'
                          }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-pak-green-600'}`} />
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-4 px-5 py-4 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all rounded-2xl border border-transparent hover:border-red-100"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout Account</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16 lg:h-20"></div>
    </>
  );
}
