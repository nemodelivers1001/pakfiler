import { Shield, CheckCircle2, FileCheck, Users, History, Lock, Headphones } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in:', { email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log('Google sign in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-700 text-white font-bold text-2xl px-3 py-1 rounded italic">
              PF
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">PakFiler.com</div>
              <div className="text-xs text-gray-600">Fast, Affordable & Best Tax Filing</div>
            </div>
          </div>
          <div className="hidden md:block text-sm text-green-600 font-medium max-w-2xl">
            Backed by a highly experienced team of top Chartered Accountants, CFAs, FCCAs, Advocates, and Tax Experts.
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
              Login
            </button>
            <button className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Welcome Back to Pakistan's<br />
                #1 Tax Platform
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Access your tax dashboard and manage your filings
              </p>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                Trusted by 100,000+ Pakistani taxpayers
              </div>
            </div>

            {/* Your Tax Management Hub */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Tax Management Hub</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Access your tax dashboard instantly</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Secure file management & tracking</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professional tax expert support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <History className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Complete filing history & documents</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">FBR compliance guaranteed</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Headphones className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">24/7 customer support available</span>
                </div>
              </div>
            </div>

            {/* Bank-Level Security */}
            <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Bank-Level Security Guarantee</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">256-bit SSL encryption for all data</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">FBR compliant security protocols</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Secure cloud infrastructure</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Regular security audits & monitoring</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6 leading-relaxed">
                Your sensitive tax information is protected with the same security standards used by major financial institutions.
              </p>
            </div>
          </div>

          {/* Right Column - Sign In Form */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Sign in to your account
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Don't have an account?{' '}
                <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                  Create one here
                </a>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OR CONTINUE WITH</span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                >
                  Sign in
                </button>

                {/* Terms */}
                <p className="text-xs text-center text-gray-600 leading-relaxed">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
