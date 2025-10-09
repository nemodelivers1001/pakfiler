import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import TaxCalculator from './TaxCalculator';
import GSTRegistrationFlow from './GSTRegistrationFlow';
import IRISProfileFlow from './IRISProfileFlow';
import TrackSubmissions from './TrackSubmissions';
import ApplicationDetails from './ApplicationDetails';
import Profile from './Profile';
import Pricing from './Pricing';
import FAQ from './FAQ';
import AppHeader from './AppHeader';
import PaymentScreen from './PaymentScreen';
import { GSTApplication } from '../types/gst';
import { createIRISSubmission, updateIRISPaymentStatus } from '../lib/irisService';
import { IRISFormData } from '../types/iris';
import { supabase } from '../lib/supabase';

type View = 'dashboard' | 'calculator' | 'gst-registration' | 'iris-profile' | 'track-submissions' | 'application-details' | 'pricing' | 'profile' | 'faq' | 'payment';

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<GSTApplication | null>(null);
  const [pendingPayment, setPendingPayment] = useState<{ type: 'gst' | 'iris'; submissionId: string; referenceNumber: string; amount: number } | null>(null);
  const [irisFormData, setIrisFormData] = useState<IRISFormData | null>(null);
  const { user } = useAuth();

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
      case 'iris-profile':
        return (
          <IRISProfileFlow
            onBack={() => setCurrentView('dashboard')}
            onComplete={async (submissionId, amount) => {
              if (!user) return;

              try {
                const { data: submission } = await supabase
                  .from('iris_submissions')
                  .select('reference_number')
                  .eq('id', submissionId)
                  .maybeSingle();

                if (submission) {
                  setPendingPayment({
                    type: 'iris',
                    submissionId,
                    referenceNumber: submission.reference_number,
                    amount,
                  });
                  setCurrentView('payment');
                }
              } catch (error) {
                console.error('Error fetching submission:', error);
              }
            }}
          />
        );
      case 'payment':
        return pendingPayment ? (
          <PaymentScreen
            serviceName={pendingPayment.type === 'iris' ? 'IRIS Profile Update' : 'GST Registration'}
            referenceNumber={pendingPayment.referenceNumber}
            amount={pendingPayment.amount}
            onPaymentComplete={async () => {
              if (pendingPayment.type === 'iris') {
                await updateIRISPaymentStatus(pendingPayment.submissionId, 'paid');
              }
              setPendingPayment(null);
              setCurrentView('track-submissions');
            }}
            onCancel={() => setCurrentView('track-submissions')}
          />
        ) : null;
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
            onNavigateToIRISProfile={() => setCurrentView('iris-profile')}
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
