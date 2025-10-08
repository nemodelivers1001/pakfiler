import { LogOut, Home, FileText, User, DollarSign, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface AppHeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function AppHeader({ currentView, onNavigate }: AppHeaderProps) {
  const { user, profile } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getUserName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || 'User';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl">PF</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold text-gray-900">PakFiler.com</h1>
              <p className="text-xs text-gray-500">Fast, Affordable & Best Tax Filing</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center space-x-1 sm:space-x-2 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg ${
                currentView === 'dashboard' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              title="Dashboard"
            >
              <Home className="w-4 h-4" />
              <span className="hidden lg:inline">Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('track-submissions')}
              className={`flex items-center space-x-1 sm:space-x-2 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg ${
                currentView === 'track-submissions' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              title="Track Submissions"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden xl:inline">Track</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center space-x-1 sm:space-x-2 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg ${
                currentView === 'profile' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              title="Profile"
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">Profile</span>
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`flex items-center space-x-1 sm:space-x-2 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg ${
                currentView === 'pricing' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              title="Pricing"
            >
              <DollarSign className="w-4 h-4" />
              <span className="hidden xl:inline">Pricing</span>
            </button>
            <button
              className="flex items-center space-x-1 sm:space-x-2 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors rounded-lg hidden md:flex"
              title="Help & Support"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden xl:inline">Help</span>
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200">
              <span className="text-xs sm:text-sm text-gray-700 hidden lg:inline truncate max-w-[120px]">
                {getUserName()}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 sm:space-x-2 p-2 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
