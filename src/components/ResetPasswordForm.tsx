import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ResetPasswordFormProps {
  onNavigateToSignIn: () => void;
}

export default function ResetPasswordForm({ onNavigateToSignIn }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          setIsValidToken(true);
        } else {
          setError('Invalid or expired reset link. Please request a new one.');
        }
      } catch (err: any) {
        setError('Invalid or expired reset link. Please request a new one.');
      } finally {
        setCheckingToken(false);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while resetting your password');
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="lg:sticky lg:top-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Lock className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Verifying Reset Link
          </h2>
          <p className="text-center text-gray-600">
            Please wait while we verify your password reset link...
          </p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="lg:sticky lg:top-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <Lock className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Invalid Reset Link
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {error || 'This password reset link is invalid or has expired. Please request a new one.'}
          </p>
          <button
            onClick={onNavigateToSignIn}
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="lg:sticky lg:top-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Password Reset Successful!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>

          <button
            onClick={onNavigateToSignIn}
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            Continue to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Lock className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
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
