import { useState } from 'react';
import Header from './components/Header';
import FeatureSection from './components/FeatureSection';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

function App() {
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FeatureSection
            title={
              currentPage === 'signin'
                ? "Welcome Back to Pakistan's\n#1 Tax Platform"
                : "Welcome to Pakistan's #1 Tax Platform"
            }
            subtitle={
              currentPage === 'signin'
                ? 'Access your tax dashboard and manage your filings'
                : 'Create your account and start filing your taxes'
            }
            trustBadge="Trusted by 100,000+ Pakistani taxpayers"
          />

          {currentPage === 'signin' ? (
            <SignInForm onNavigateToSignUp={() => setCurrentPage('signup')} />
          ) : (
            <SignUpForm onNavigateToSignIn={() => setCurrentPage('signin')} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
