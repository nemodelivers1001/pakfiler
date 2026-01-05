import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { MotionButton } from './ui/MotionButton';

interface SignInFormProps {
  onNavigateToSignUp: () => void;
  onNavigateToForgotPassword: () => void;
}

export default function SignInForm({ onNavigateToSignUp, onNavigateToForgotPassword }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email);
      console.log('Sign in successful');
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
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
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="lg:sticky lg:top-8 relative z-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/50 p-8 sm:p-12 overflow-hidden"
      >
        {/* Living Background Elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light pointer-events-none"></div>
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
            scale: [1.3, 1, 1.3],
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
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-pak-green-600 to-pak-green-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative w-20 h-20 bg-gradient-to-br from-pak-green-600 to-pak-green-brand rounded-[24px] flex items-center justify-center shadow-2xl border border-white/20"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl font-black text-center mb-3 text-pak-green-950 tracking-tighter uppercase">
            Welcome Back
          </motion.h2>
          <motion.p variants={itemVariants} className="text-center text-gray-500 mb-10 font-medium text-lg">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToSignUp}
              className="text-pak-green-600 hover:text-pak-green-700 font-bold transition-all hover:underline decoration-2 underline-offset-4"
            >
              Create one here
            </button>
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.button
              type="button"
              variants={itemVariants}
              whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-center space-x-3 px-4 py-4 border-2 border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all font-bold text-gray-700 active:scale-95 text-sm uppercase tracking-wide"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
              </svg>
              <span>Continue with Google</span>
            </motion.button>

            <motion.div variants={itemVariants} className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black tracking-[0.2em] uppercase">
                <span className="px-4 bg-white/50 backdrop-blur-md text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="group space-y-3">
                <label htmlFor="email" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">
                  <Mail className="w-3 h-3 text-pak-green-500" />
                  Email address
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: '#0E5630', backgroundColor: '#ffffff' }}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-4 pl-11 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-pak-green-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm font-bold text-gray-800 placeholder-gray-400"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                </div>
              </div>

              <div className="group space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[2px] pl-1">
                    <Lock className="w-3 h-3 text-pak-green-500" />
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={onNavigateToForgotPassword}
                    className="text-[10px] text-pak-green-600 hover:text-pak-green-700 font-black uppercase tracking-wider transition-colors hover:underline decoration-2 underline-offset-4"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: '#0E5630', backgroundColor: '#ffffff' }}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-4 pl-11 pr-12 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-pak-green-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm font-bold text-gray-800 placeholder-gray-400"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 p-2 rounded-xl"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.div variants={itemVariants} className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-gray-300 transition-all checked:border-pak-green-500 checked:bg-pak-green-500"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="remember" className="ml-3 text-sm text-gray-600 font-bold cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <MotionButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 py-4 rounded-2xl shadow-xl shadow-pak-green-900/20"
                isLoading={loading}
                rightIcon={!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              >
                Sign In
              </MotionButton>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xs text-center text-gray-400 leading-relaxed font-bold">
              By signing in, you agree to our{' '}
              <a href="#" className="text-pak-green-600 hover:text-pak-green-700 underline decoration-2 underline-offset-2 transition-colors">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-pak-green-600 hover:text-pak-green-700 underline decoration-2 underline-offset-2 transition-colors">
                Privacy Policy
              </a>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
