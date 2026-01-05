import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionButton } from './ui/MotionButton';

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
        // Mock session check
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsValidToken(true);
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
      // Mock password update
      await new Promise(resolve => setTimeout(resolve, 800));

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while resetting your password');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const BackgroundElements = () => (
    <>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-pak-green-400 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full blur-[100px] pointer-events-none"
      />
    </>
  );

  return (
    <div className="lg:sticky lg:top-8 relative z-10 w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {checkingToken ? (
          <motion.div
            key="checking"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden text-center"
          >
            <BackgroundElements />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-pak-green-200 border-t-pak-green-600"
            />
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Link
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600">
              Please wait while we verify your request...
            </motion.p>
          </motion.div>
        ) : !isValidToken ? (
          <motion.div
            key="invalid"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden text-center"
          >
            <BackgroundElements />
            <motion.div variants={itemVariants} className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-2">
              Invalid Link
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 mb-8">
              {error || 'This password reset link is invalid or has expired. Please request a new one.'}
            </motion.p>
            <motion.div variants={itemVariants}>
              <MotionButton onClick={onNavigateToSignIn} className="w-full">
                Back to Sign In
              </MotionButton>
            </motion.div>
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden text-center"
          >
            <BackgroundElements />
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-pak-green-500 rounded-full blur-lg opacity-40 animate-pulse"></div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  type="spring"
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-pak-green-500 to-pak-green-600 flex items-center justify-center shadow-lg border border-white/20"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset!
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 mb-8">
              Your password has been successfully reset. You can now sign in with your new password.
            </motion.p>
            <motion.div variants={itemVariants}>
              <MotionButton onClick={onNavigateToSignIn} variant="primary" className="w-full">
                Continue to Sign In
              </MotionButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden"
          >
            <BackgroundElements />

            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pak-green-600 to-pak-green-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="relative w-16 h-16 bg-gradient-to-br from-pak-green-600 to-pak-green-700 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Reset Your Password
            </motion.h2>
            <motion.p variants={itemVariants} className="text-center text-gray-600 mb-8">
              Enter your new password below
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="group">
                <label htmlFor="password" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-pak-green-600" />
                  New Password
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: '#198754' }}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3.5 pl-11 pr-12 border border-gray-200 rounded-xl focus:ring-4 focus:ring-pak-green-100 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 theme-transition group-focus-within:text-pak-green-600" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 pl-1">Must be at least 6 characters</p>
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-pak-green-600" />
                  Confirm New Password
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: '#198754' }}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3.5 pl-11 pr-12 border border-gray-200 rounded-xl focus:ring-4 focus:ring-pak-green-100 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 theme-transition group-focus-within:text-pak-green-600" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionButton
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={loading}
                >
                  Reset Password
                </MotionButton>
              </motion.div>

              <motion.p variants={itemVariants} className="text-xs text-center text-gray-500">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={onNavigateToSignIn}
                  className="text-pak-green-600 hover:text-pak-green-700 font-bold transition-all hover:underline decoration-2 underline-offset-4"
                >
                  Sign in
                </button>
              </motion.p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
