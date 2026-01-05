import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionButton } from './ui/MotionButton';

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
      // Mock sending email
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending the reset link');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="lg:sticky lg:top-8 relative z-10 w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden"
          >
            {/* Living Background Elements */}
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

            <motion.div variants={itemVariants} className="flex justify-center mb-6 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-pak-green-500 rounded-full blur-lg opacity-40 animate-pulse"></div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  type="spring"
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-pak-green-500 to-pak-green-600 flex items-center justify-center shadow-lg border border-white/20"
                >
                  <Mail className="w-10 h-10 text-white" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md"
                  >
                    <CheckCircle className="w-5 h-5 text-pak-green-600" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl font-extrabold text-gray-900 mb-2 text-center relative z-10 tracking-tight">
              Check Your Email
            </motion.h2>
            <motion.p variants={itemVariants} className="text-center text-gray-500 mb-8 relative z-10 font-medium">
              We've sent a password reset link to <br />
              <span className="font-extrabold text-pak-green-700 bg-pak-green-50 px-3 py-1 rounded-full mt-2 inline-block border border-pak-green-100">{email}</span>
            </motion.p>

            <motion.div variants={itemVariants} className="bg-blue-50/80 backdrop-blur border border-blue-100 rounded-xl p-5 mb-8 relative z-10">
              <p className="text-sm text-blue-800 mb-2 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Next steps:
              </p>
              <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside ml-1">
                <li>Check your inbox (and spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>Create a new password</li>
              </ol>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 relative z-10">
              <MotionButton
                onClick={onNavigateToSignIn}
                variant="primary"
                className="w-full"
                leftIcon={<ArrowLeft className="w-5 h-5" />}
              >
                Back to Sign In
              </MotionButton>

              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="w-full text-sm text-gray-500 hover:text-pak-green-600 transition-colors font-medium py-2"
              >
                Didn't receive the email? Try again
              </button>
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
            {/* Living Background Elements */}
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

            <div className="relative z-10">
              <motion.button
                variants={itemVariants}
                onClick={onNavigateToSignIn}
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-gray-500 hover:text-pak-green-600 mb-6 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Sign In</span>
              </motion.button>

              <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pak-green-600 to-pak-green-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative w-16 h-16 bg-gradient-to-br from-pak-green-600 to-pak-green-700 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-2xl font-extrabold text-gray-900 mb-3 text-center tracking-tight">
                Forgot Password?
              </motion.h2>
              <motion.p variants={itemVariants} className="text-center text-gray-500 mb-8 max-w-xs mx-auto font-medium">
                No worries! Enter your email address and we'll send you a recovery link.
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
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-pak-green-600" />
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.01, borderColor: '#198754' }}
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-4 focus:ring-pak-green-100 outline-none transition-all bg-white/50 backdrop-blur-sm"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <MotionButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={loading}
                  >
                    Send Reset Link
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
