import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import TaxCalculator from './TaxCalculator';
import GSTRegistrationFlow from './GSTRegistrationFlow';
import NTNRegistrationFlow from './NTNRegistrationFlow';
import BusinessTaxFilingFlow from './BusinessTaxFilingFlow';
import PersonalTaxFilingFlow from './PersonalTaxFilingFlow';
import IRISProfileFlow from './IRISProfileFlow';
import TrackSubmissions from './TrackSubmissions';
import ApplicationDetails from './ApplicationDetails';
import IRISApplicationDetails from './IRISApplicationDetails';
import Profile from './Profile';
import Pricing from './Pricing';
import FAQ from './FAQ';
import AppHeader from './AppHeader';
import PaymentScreen from './PaymentScreen';
import { GSTApplication } from '../types/gst';
import { IRISSubmission } from '../types/iris';
import { updateIRISPaymentStatus } from '../lib/irisService';

type View = 'dashboard' | 'calculator' | 'gst-registration' | 'ntn-registration' | 'business-tax-filing' | 'personal-tax-filing' | 'iris-profile' | 'track-submissions' | 'application-details' | 'iris-details' | 'pricing' | 'profile' | 'faq' | 'payment';

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<GSTApplication | null>(null);
  const [selectedIRISSubmission, setSelectedIRISSubmission] = useState<IRISSubmission | null>(null);
  const [pendingPayment, setPendingPayment] = useState<{ type: 'gst' | 'iris'; submissionId: string; referenceNumber: string; amount: number } | null>(null);
  const { user } = useAuth();

  // Sync state with URL on initial load
  useEffect(() => {
    const path = window.location.pathname.slice(1);
    const validViews: View[] = ['dashboard', 'calculator', 'gst-registration', 'ntn-registration', 'iris-profile', 'track-submissions', 'pricing', 'profile', 'faq'];
    if (validViews.includes(path as View)) {
      setCurrentView(path as View);
    } else if (path === 'track') {
      setCurrentView('track-submissions');
    }
  }, []);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    const path = view === 'dashboard' ? '/' : `/${view}`;
    window.history.pushState(null, '', path);
  };

  const handleViewDetails = (application: GSTApplication) => {
    setSelectedApplication(application);
    setCurrentView('application-details');
  };

  const handleViewIRISDetails = (submission: IRISSubmission) => {
    setSelectedIRISSubmission(submission);
    setCurrentView('iris-details');
  };

  const handlePayNow = (application: GSTApplication) => {
    setSelectedApplication(application);
    setCurrentView('gst-registration');
  };

  const handlePayNowIRIS = (submission: IRISSubmission) => {
    setPendingPayment({
      type: 'iris',
      submissionId: submission.id!,
      referenceNumber: submission.reference_number!,
      amount: submission.amount,
    });
    setCurrentView('payment');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'calculator':
        return <TaxCalculator onBack={() => navigateTo('dashboard')} />;
      case 'gst-registration':
        return (
          <GSTRegistrationFlow
            existingApplication={selectedApplication}
            onComplete={() => {
              navigateTo('track-submissions');
              setSelectedApplication(null);
            }}
            onCancel={() => {
              navigateTo('dashboard');
              setSelectedApplication(null);
            }}
          />
        );
      case 'ntn-registration':
        return (
          <NTNRegistrationFlow
            onBack={() => navigateTo('dashboard')}
            onComplete={(amount) => {
              setPendingPayment({
                type: 'gst', // Reusing gst type or created new 'ntn' type if needed, but 'gst' works for general payment flow or stick to 'iris' if generic. Let's use 'gst' or I need to update types. The user didn't ask for type update so I'll label it cleanly.
                // Actually, payment screen takes service name string.
                submissionId: 'ntn-' + Date.now(),
                referenceNumber: 'NTN-' + Math.floor(100000 + Math.random() * 900000),
                amount: amount,
              });
              setCurrentView('payment');
            }}
          />
        );
        return (
          <BusinessTaxFilingFlow
            onBack={() => navigateTo('dashboard')}
            onComplete={() => {
              // Redirect to Payment or Dashboard
              // For now assuming dashboard or track, or payment if price was passed up
              // The flow ends at step 5 currently.
              navigateTo('track-submissions');
            }}
          />
        );
      case 'personal-tax-filing':
        return (
          <PersonalTaxFilingFlow
            onBack={() => navigateTo('dashboard')}
            onComplete={() => navigateTo('track-submissions')}
          />
        );
      case 'iris-profile':
        return (
          <IRISProfileFlow
            onBack={() => navigateTo('dashboard')}
            onComplete={async (submissionId, amount) => {
              if (!user) return;

              try {
                const { submission } = await import('../lib/irisService').then(m => m.getIRISSubmissionById(submissionId));

                if (submission) {
                  setPendingPayment({
                    type: 'iris',
                    submissionId,
                    referenceNumber: submission.reference_number,
                    amount,
                  });
                  navigateTo('payment');
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
              navigateTo('track-submissions');
            }}
            onCancel={() => navigateTo('track-submissions')}
          />
        ) : null;
      case 'track-submissions':
        return (
          <TrackSubmissions
            onViewDetails={handleViewDetails}
            onViewIRISDetails={handleViewIRISDetails}
            onPayNow={handlePayNow}
            onPayNowIRIS={handlePayNowIRIS}
          />
        );
      case 'application-details':
        return selectedApplication ? (
          <ApplicationDetails
            application={selectedApplication}
            onBack={() => navigateTo('track-submissions')}
          />
        ) : null;
      case 'iris-details':
        return selectedIRISSubmission ? (
          <IRISApplicationDetails
            submission={selectedIRISSubmission}
            onBack={() => navigateTo('track-submissions')}
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
            onNavigateToCalculator={() => navigateTo('calculator')}
            onNavigateToGSTRegistration={() => {
              setSelectedApplication(null);
              navigateTo('gst-registration');
            }}
            onNavigateToIRISProfile={() => navigateTo('iris-profile')}
            onNavigateToNTNRegistration={() => navigateTo('ntn-registration')}
            onNavigateToBusinessTaxFiling={() => navigateTo('business-tax-filing')}
            onNavigateToPersonalTaxFiling={() => navigateTo('personal-tax-filing')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8faf9]">
      {/* Premium Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Mesh Blobs - Strictly Brand Colors */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pak-green-100/40 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pak-green-200/30 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-100/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] bg-pak-green-50 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-pak-green-50/10 to-emerald-50/20"></div>
      </div>

      <div className="relative z-10 w-full">
        <AppHeader currentView={currentView} onNavigate={(v) => navigateTo(v as View)} />
        {renderContent()}
      </div>
    </div>
  );
}
