import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import TaxCalculator from './TaxCalculator';
import GSTRegistrationFlow from './GSTRegistrationFlow';
import TrackSubmissions from './TrackSubmissions';
import ApplicationDetails from './ApplicationDetails';
import Profile from './Profile';
import Pricing from './Pricing';
import FAQ from './FAQ';
import AppHeader from './AppHeader';
import { GSTApplication } from '../types/gst';

type View = 'dashboard' | 'calculator' | 'gst-registration' | 'track-submissions' | 'application-details' | 'pricing' | 'profile' | 'faq';

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<GSTApplication | null>(null);

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
      case 'profile':
        return <Profile />;
      case 'pricing':
        return <Pricing />;
      case 'faq':
        return <FAQ />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader currentView={currentView} onNavigate={setCurrentView} />
      {renderContent()}
    </div>
  );
}
