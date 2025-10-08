import { useState } from 'react';
import { LogOut, Home, FileText, User, DollarSign, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import TaxCalculator from './TaxCalculator';
import GSTRegistrationFlow from './GSTRegistrationFlow';
import TrackSubmissions from './TrackSubmissions';
import ApplicationDetails from './ApplicationDetails';
import { GSTApplication } from '../types/gst';

type View = 'dashboard' | 'calculator' | 'gst-registration' | 'track-submissions' | 'application-details' | 'pricing' | 'profile';

export default function MainApp() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<GSTApplication | null>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getUserName = () => {
    const metadata = user?.user_metadata;
    return metadata?.full_name || 'User';
  };

  const handleViewDetails = (application: GSTApplication) => {
    setSelectedApplication(application);
    setCurrentView('application-details');
  };

  const handlePayNow = (application: GSTApplication) => {
    setSelectedApplication(application);
    setCurrentView('gst-registration');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'calculator':
        return <TaxCalculator onBack={() => setCurrentView('dashboard')} />;
      case 'gst-registration':
        return (
          <GSTRegistrationFlow
            existingApplication={selectedApplication}
            onComplete={() => {
              setCurrentView('track-submissions');
              setSelectedApplication(null);
            }}
            onCancel={() => {
              setCurrentView('dashboard');
              setSelectedApplication(null);
            }}
          />
        );
      case 'track-submissions':
        return (
          <TrackSubmissions
            onViewDetails={handleViewDetails}
            onPayNow={handlePayNow}
          />
        );
      case 'application-details':
        return selectedApplication ? (
          <ApplicationDetails
            application={selectedApplication}
            onBack={() => setCurrentView('track-submissions')}
          />
        ) : null;
      case 'dashboard':
      default:
        return (
          <Dashboard
            onNavigateToCalculator={() => setCurrentView('calculator')}
            onNavigateToGSTRegistration={() => {
              setSelectedApplication(null);
              setCurrentView('gst-registration');
            }}
          />
        );
    }
  };

  if (currentView === 'calculator' || currentView === 'gst-registration' || currentView === 'track-submissions' || currentView === 'application-details') {
    return renderContent();
  }

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
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  currentView === 'dashboard' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('track-submissions')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  currentView === 'track-submissions' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden lg:inline">Track My Submission</span>
              </button>
              <button
                onClick={() => setCurrentView('profile')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  currentView === 'profile' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline">Profile</span>
              </button>
              <button
                onClick={() => setCurrentView('pricing')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  currentView === 'pricing' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`}
              >
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

      {renderContent()}
    </div>
  );
}
