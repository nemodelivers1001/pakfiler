import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Shield, Edit, Camera, Clock, CheckCircle2, Lock, ArrowRight, Sparkles, X, ChevronRight, Fingerprint, Activity, CreditCard, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionButton } from './ui/MotionButton';
import { MotionInput } from './ui/MotionInput';
import { useAuth } from '../context/AuthContext';
import { useMobile } from '../hooks/useMobile';

interface UserProfile {
  id: string;
  full_name: string;
  cnic_number: string;
  date_of_birth: string;
  occupation: string;
  mobile_number: string;
  address: string;
  account_status: string;
  created_at: string;
}

export default function Profile() {
  const { user, profile: contextProfile, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const isMobile = useMobile();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formData, setFormData] = useState({
    full_name: '',
    cnic_number: '',
    date_of_birth: '',
    occupation: '',
    mobile_number: '',
    address: '',
  });

  useEffect(() => {
    if (contextProfile) {
      setProfile(contextProfile);
      setFormData({
        full_name: contextProfile.full_name || '',
        cnic_number: contextProfile.cnic_number || '',
        date_of_birth: contextProfile.date_of_birth || '',
        occupation: contextProfile.occupation || '',
        mobile_number: contextProfile.mobile_number || '',
        address: contextProfile.address || '',
      });
      setLoading(false);
    } else {
      loadProfile();
    }
  }, [user, contextProfile]);

  const STORAGE_KEY_PROFILE = 'pakfiler_mock_profile';

  const loadProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const storedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (storedProfile) {
        const data = JSON.parse(storedProfile);
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          cnic_number: data.cnic_number || '',
          date_of_birth: data.date_of_birth || '',
          occupation: data.occupation || '',
          mobile_number: data.mobile_number || '',
          address: data.address || '',
        });
      } else {
        const newProfile = {
          id: user.id,
          full_name: user.email?.split('@')[0] || 'User',
          mobile_number: '',
          account_status: 'active',
          created_at: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
        setProfile(newProfile as UserProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedProfile = {
        ...profile,
        full_name: formData.full_name,
        cnic_number: formData.cnic_number,
        date_of_birth: formData.date_of_birth || null,
        occupation: formData.occupation,
        mobile_number: formData.mobile_number,
        address: formData.address,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updatedProfile));
      await loadProfile();
      await refreshProfile();
      setEditMode(false);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMessage({ type: 'success', text: 'Password changed successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to change password' });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    const name = profile?.full_name || user?.email || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#effaf3]">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-pak-green-600 to-pak-green-800 rounded-3xl animate-spin shadow-xl"></div>
            <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-pak-green-600 animate-pulse" />
            </div>
          </div>
          <p className="text-xl font-black text-pak-green-950 uppercase tracking-widest">Loading Profile</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen relative overflow-hidden bg-[#effaf3] pb-24"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[1000px] h-[600px] bg-pak-green-100/30 rounded-full blur-[120px] -ml-64 -mt-40"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px] -mr-40 -mb-40"></div>
      </div>

      {/* Hero Header Section */}
      <div className="relative z-10 bg-gradient-to-r from-pak-green-900 via-pak-green-brand to-pak-green-950 text-white rounded-b-[48px] sm:rounded-b-[64px] shadow-2xl shadow-pak-green-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pt-20 sm:pb-32 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-pak-green-500 rounded-[34px] blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-pak-green-950 rounded-[32px] relative flex items-center justify-center border-4 border-white/10 shadow-2xl overflow-hidden">
                  {/* Placeholder for Avatar Image */}
                  <span className="text-4xl font-black text-white/90 tracking-tighter">{getInitials()}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              <div className="text-center md:text-left mb-2">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[2px] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    {profile?.account_status || 'Active'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pak-green-800/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-emerald-300 uppercase tracking-[2px]">
                    User
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-2">
                  {profile?.full_name?.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-pak-green-300">{profile?.full_name?.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-emerald-100/80 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
                  Manage your personal information, security settings, and account preferences from your centralized dashboard.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MotionButton
                onClick={() => {
                  if (editMode && profile) {
                    setFormData({
                      full_name: profile.full_name || '',
                      cnic_number: profile.cnic_number || '',
                      date_of_birth: profile.date_of_birth || '',
                      occupation: profile.occupation || '',
                      mobile_number: profile.mobile_number || '',
                      address: profile.address || '',
                    });
                  }
                  setEditMode(!editMode);
                  setMessage({ type: '', text: '' });
                }}
                className={`px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center gap-3 shadow-xl transition-all ${editMode
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white'}`}
              >
                <span className="flex items-center gap-3">
                  {editMode ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  {editMode ? 'Cancel Editing' : 'Edit Profile'}
                </span>
              </MotionButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Security Level', value: 'High', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Member Since', value: profile?.created_at ? new Date(profile.created_at).getFullYear() : '2024', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'KYC Status', value: 'Verified', icon: Fingerprint, color: 'text-pak-green-600', bg: 'bg-pak-green-50' }
          ].map((stat, i) => (
            <div key={i} className="glass-card bg-white/60 backdrop-blur-xl border-white/60 p-6 rounded-[28px] shadow-xl flex items-center gap-5 group hover:-translate-y-1 transition-transform duration-300">
              <div className={`w-14 h-14 ${stat.bg} rounded-[20px] flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black text-pak-green-950 uppercase tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Messaging */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={`mb-8 p-6 rounded-[24px] border border-l-4 shadow-xl flex items-center gap-4 ${message.type === 'success'
                ? 'bg-white border-l-pak-green-500 border-white/50 text-pak-green-900'
                : 'bg-white border-l-red-500 border-white/50 text-red-900'
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-pak-green-100 text-pak-green-600' : 'bg-red-100 text-red-600'}`}>
                {message.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-0.5 ${message.type === 'success' ? 'text-pak-green-700' : 'text-red-700'}`}>
                  {message.type === 'success' ? 'Success' : 'Error'}
                </h4>
                <p className="text-sm font-medium text-gray-600">{message.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* Left Column: Personal & Contact Info (8 cols) */}
          <div className="xl:col-span-7 space-y-8">

            {/* Personal Information Card */}
            <motion.div variants={itemVariants} className="glass-card bg-white/70 backdrop-blur-xl border-white/40 p-8 sm:p-10 rounded-[40px] shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100/50">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pak-green-500 to-pak-green-brand flex items-center justify-center text-white shadow-lg shadow-pak-green-500/30">
                  <User className="w-6 h-6" />
                </span>
                <h2 className="text-2xl font-black text-pak-green-950 uppercase tracking-tighter">Personal Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">Full Name</label>
                  <MotionInput
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!editMode}
                    className="bg-white/50 border-gray-200 focus:border-pak-green-500 focus:ring-pak-green-500/10 rounded-2xl p-4 font-bold text-gray-800 disabled:bg-gray-50/50 disabled:text-gray-600 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">CNIC Number</label>
                  <MotionInput
                    value={formData.cnic_number}
                    onChange={(e) => setFormData({ ...formData, cnic_number: e.target.value })}
                    disabled={!editMode}
                    className="bg-white/50 border-gray-200 focus:border-pak-green-500 focus:ring-pak-green-500/10 rounded-2xl p-4 font-bold text-gray-800 disabled:bg-gray-50/50 disabled:text-gray-600 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">Date of Birth</label>
                  <MotionInput
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    disabled={!editMode}
                    className="bg-white/50 border-gray-200 focus:border-pak-green-500 focus:ring-pak-green-500/10 rounded-2xl p-4 font-bold text-gray-800 disabled:bg-gray-50/50 disabled:text-gray-600 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">Occupation</label>
                  <MotionInput
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    disabled={!editMode}
                    className="bg-white/50 border-gray-200 focus:border-pak-green-500 focus:ring-pak-green-500/10 rounded-2xl p-4 font-bold text-gray-800 disabled:bg-gray-50/50 disabled:text-gray-600 transition-all shadow-sm"
                  />
                </div>
              </div>
            </motion.div>

            {/* Contact Information Card */}
            <motion.div variants={itemVariants} className="glass-card bg-white/70 backdrop-blur-xl border-white/40 p-8 sm:p-10 rounded-[40px] shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100/50">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Mail className="w-6 h-6" />
                </span>
                <h2 className="text-2xl font-black text-pak-green-950 uppercase tracking-tighter">Contact & Address</h2>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">Email Address</label>
                    <div className="relative group">
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full bg-gray-50/80 border-2 border-transparent rounded-2xl p-4 font-bold text-gray-500 cursor-not-allowed"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-pak-green-500 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">Mobile Number</label>
                    <MotionInput
                      value={formData.mobile_number}
                      onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      disabled={!editMode}
                      className="bg-white/50 border-gray-200 focus:border-pak-green-500 focus:ring-pak-green-500/10 rounded-2xl p-4 font-bold text-gray-800 disabled:bg-gray-50/50 disabled:text-gray-600 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] pl-1">Primary Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!editMode}
                    rows={3}
                    className="w-full bg-white/50 border-2 border-gray-200 rounded-2xl p-4 font-bold text-gray-800 focus:border-pak-green-500 focus:ring-4 focus:ring-pak-green-500/10 disabled:bg-gray-50/50 disabled:text-gray-600 resize-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Security & Actions (5 cols) */}
          <div className="xl:col-span-5 space-y-8">

            {/* Security Card */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-pak-green-950 to-pak-green-900 text-white p-8 sm:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <span className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-400 border border-white/10">
                  <Shield className="w-6 h-6" />
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Security Center</h2>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-emerald-100/60 uppercase tracking-[2px] pl-1">Change Password</label>
                  <MotionInput
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Current password"
                    className="bg-white/5 border-white/10 focus:border-emerald-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-bold placeholder-white/30 text-white shadow-inner"
                  />
                  <MotionInput
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="New password"
                    className="bg-white/5 border-white/10 focus:border-emerald-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-bold placeholder-white/30 text-white shadow-inner"
                  />
                  <MotionInput
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="bg-white/5 border-white/10 focus:border-emerald-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-bold placeholder-white/30 text-white shadow-inner"
                  />
                </div>

                <MotionButton
                  onClick={handleChangePassword}
                  disabled={saving || !passwordData.newPassword}
                  isLoading={saving}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-pak-green-950 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-900/50 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Password
                </MotionButton>
              </div>
            </motion.div>

            {/* Activity / Info Card */}
            <motion.div variants={itemVariants} className="glass-card bg-white/70 backdrop-blur-xl border-white/40 p-8 rounded-[40px] shadow-xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
                Account Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Last Login</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">Today, 10:23 AM</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Payment Method</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">Not Linked</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Floating Save Action Bar */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-50 flex justify-center bg-gradient-to-t from-pak-green-950/20 to-transparent pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-pak-green-100 p-3 pl-6 pr-3 rounded-[32px] shadow-2xl shadow-pak-green-900/30 flex items-center gap-6 pointer-events-auto max-w-xl w-full">
                <div className="flex-1">
                  <p className="text-xs font-black text-pak-green-950 uppercase tracking-wider">Unsaved Changes</p>
                  <p className="text-[10px] font-bold text-gray-500">Don't forget to save your profile updates.</p>
                </div>
                <MotionButton
                  onClick={handleSaveProfile}
                  disabled={saving}
                  isLoading={saving}
                  className="bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white px-8 py-4 rounded-[24px] font-black uppercase text-xs tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  Save Changes <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
