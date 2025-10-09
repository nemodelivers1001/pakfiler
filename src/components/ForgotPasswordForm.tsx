import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ForgotPasswordFormProps {
  onNavigateToSignIn: () => void;
}

export default function ForgotPasswordForm({ onNavigateToSignIn }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending the reset link');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="lg:sticky lg:top-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Check Your Email
          </h2>
          <p className="text-center text-gray-600 mb-6">
            We've sent a password reset link to <span className="font-semibold">{email}</span>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Next steps:</strong>
            </p>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Check your email inbox</li>
              <li>Click the reset link in the email</li>
              <li>Enter your new password</li>
            </ol>
          </div>

          <button
            onClick={onNavigateToSignIn}
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Sign In
          </button>

          <p className="text-xs text-center text-gray-600 mt-4">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <button
          onClick={onNavigateToSignIn}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Sign In</span>
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Forgot Your Password?
        </h2>
        <p className="text-center text-gray-600 mb-8">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </button>

          <p className="text-xs text-center text-gray-600">
            Remember your password?{' '}
            <button
              type="button"
              onClick={onNavigateToSignIn}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
