import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, CreditCard, Shield, Save, Edit, Camera, Award, Clock, CheckCircle2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

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
  const [showPasswordSection, setShowPasswordSection] = useState(false);
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

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
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
        const { data: newProfile, error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || '',
            account_status: 'active',
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setProfile(newProfile);
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
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name,
          cnic_number: formData.cnic_number,
          date_of_birth: formData.date_of_birth || null,
          occupation: formData.occupation,
          mobile_number: formData.mobile_number,
          address: formData.address,
        })
        .eq('id', user.id);

      if (error) throw error;

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
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordSection(false);
      setMessage({ type: 'success', text: 'Password changed successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to change password' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-slate-50/30">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl animate-spin"></div>
            <div className="absolute inset-2 bg-white rounded-xl"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700">Loading profile...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait</p>
        </div>
      </div>
    );
  }

  const getInitials = () => {
    const name = profile?.full_name || user?.email || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-slate-50/30 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-6 sm:p-8 mb-6 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTM2IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl"></div>

          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white/90 backdrop-blur-md rounded-3xl flex items-center justify-center border-4 border-white/50 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {getInitials()}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 border-4 border-white">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {profile?.full_name || 'User Profile'}
              </h1>
              <p className="text-blue-100 text-sm sm:text-base mb-4 font-medium drop-shadow">
                {user?.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                  <Award className="w-3 h-3 inline mr-1.5" />
                  Verified User
                </span>
                <span className="px-4 py-1.5 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                  <CheckCircle2 className="w-3 h-3 inline mr-1.5" />
                  {profile?.account_status || 'Active'}
                </span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  if (editMode) {
                    setFormData({
                      full_name: profile?.full_name || '',
                      cnic_number: profile?.cnic_number || '',
                      date_of_birth: profile?.date_of_birth || '',
                      occupation: profile?.occupation || '',
                      mobile_number: profile?.mobile_number || '',
                      address: profile?.address || '',
                    });
                  }
                  setEditMode(!editMode);
                  setMessage({ type: '', text: '' });
                }}
                className="relative group px-6 py-3 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  {editMode ? 'Cancel Edit' : 'Edit Profile'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-2xl shadow-lg border-2 animate-[fadeInSlideDown_0.4s_ease-out] ${
              message.type === 'success'
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border-emerald-300'
                : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <span className="w-5 h-5 flex-shrink-0">⚠️</span>
              )}
              <p className="font-semibold">{message.text}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                </div>
                {editMode && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full animate-pulse">
                    Editing Mode
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    CNIC Number
                  </label>
                  <input
                    type="text"
                    value={formData.cnic_number}
                    onChange={(e) => setFormData({ ...formData, cnic_number: e.target.value })}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
                    placeholder="12345-6789012-3"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
                    placeholder="Your occupation"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-cyan-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                  />
                  <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile_number}
                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!editMode}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 resize-none transition-all"
                    placeholder="Your complete address"
                  />
                </div>
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving Changes...' : 'Save Changes'}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Member Since
                  </label>
                  <p className="text-lg font-bold text-gray-900">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-100">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Account Status
                  </label>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {profile?.account_status || 'Active'}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-100">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1.5">
                    <User className="w-4 h-4 text-amber-600" />
                    User Role
                  </label>
                  <p className="text-lg font-bold text-gray-900">Standard User</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Security</h2>
                </div>
              </div>

              {!showPasswordSection ? (
                <button
                  onClick={() => setShowPasswordSection(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleChangePassword}
                      disabled={saving || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Updating...' : 'Update'}
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordSection(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        setMessage({ type: '', text: '' });
                      }}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
