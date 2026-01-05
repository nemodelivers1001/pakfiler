import { useState, useEffect } from 'react';
import { Search, RefreshCw, Eye, CreditCard, FileCheck, Clock, CheckCircle2, TrendingUp, Sparkles, Filter, ChevronRight, Hash } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { GSTApplication } from '../types/gst';
import { IRISSubmission } from '../types/iris';
import { getUserApplications } from '../lib/gstService';
import { getUserIRISSubmissions } from '../lib/irisService';
import { useMobile } from '../hooks/useMobile';

interface TrackSubmissionsProps {
  onViewDetails: (application: GSTApplication) => void;
  onViewIRISDetails: (submission: IRISSubmission) => void;
  onPayNow: (application: GSTApplication) => void;
  onPayNowIRIS: (submission: IRISSubmission) => void;
}

type CombinedSubmission = {
  id: string;
  reference_number: string;
  service_type: 'GST Registration' | 'IRIS Profile Update';
  status: string;
  payment_status: string;
  submitted_at?: string;
  updated_at: string;
  source: 'gst' | 'iris';
  originalData: GSTApplication | IRISSubmission;
};

type StatusFilter = 'all' | 'pending_payment' | 'payment_verified' | 'completed';

export default function TrackSubmissions({ onViewDetails, onViewIRISDetails, onPayNow, onPayNowIRIS }: TrackSubmissionsProps) {
  const [applications, setApplications] = useState<CombinedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const isMobile = useMobile();

  const loadApplications = async () => {
    setLoading(true);
    try {
      const [gstData, irisData] = await Promise.all([
        getUserApplications(),
        getUserIRISSubmissions(),
      ]);

      const gstSubmissions: CombinedSubmission[] = gstData.map(app => ({
        id: app.id!,
        reference_number: app.reference_number,
        service_type: 'GST Registration' as const,
        status: app.status,
        payment_status: app.payment_status,
        submitted_at: app.submitted_at,
        updated_at: app.updated_at,
        source: 'gst' as const,
        originalData: app,
      }));

      const irisSubmissions: CombinedSubmission[] = irisData.map(sub => ({
        id: sub.id!,
        reference_number: sub.reference_number!,
        service_type: 'IRIS Profile Update' as const,
        status: sub.status,
        payment_status: sub.payment_status,
        submitted_at: sub.submitted_at,
        updated_at: sub.updated_at!,
        source: 'iris' as const,
        originalData: sub,
      }));

      const combined = [...gstSubmissions, ...irisSubmissions].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      setApplications(combined);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending_payment: 'Waiting for Payment',
      payment_verified: 'Analyzing Payment',
      processing: 'In Progress',
      completed: 'Successfully Filed',
      rejected: 'Revision Requested',
    };
    return labels[status] || status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100/80 text-emerald-800 border-emerald-200 shadow-emerald-900/5';
      case 'pending_payment':
        return 'bg-orange-100/80 text-orange-800 border-orange-200 shadow-orange-900/5';
      case 'processing':
      case 'payment_verified':
        return 'bg-blue-100/80 text-blue-800 border-blue-200 shadow-blue-900/5';
      case 'rejected':
        return 'bg-red-100/80 text-red-800 border-red-200 shadow-red-900/5';
      default:
        return 'bg-gray-100/80 text-gray-800 border-gray-200 shadow-gray-900/5';
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.service_type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: FileCheck },
    { value: 'pending_payment', label: 'To Be Paid', icon: Clock },
    { value: 'payment_verified', label: 'Verifying', icon: RefreshCw },
    { value: 'completed', label: 'Archived', icon: CheckCircle2 },
  ];

  const stats = [
    { label: 'Submissions', value: applications.length, icon: FileCheck, color: 'text-pak-green-600' },
    { label: 'Pending Payment', value: applications.filter(a => a.payment_status === 'pending').length, icon: CreditCard, color: 'text-orange-500' },
    { label: 'Under Review', value: applications.filter(a => a.status === 'processing').length, icon: Clock, color: 'text-blue-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen relative overflow-hidden bg-[#effaf3]"
    >
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pak-green-100/20 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 flex items-center justify-end">

          <button
            onClick={loadApplications}
            disabled={loading}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-pak-green-50/50 backdrop-blur-md border border-pak-green-100 text-pak-green-700 rounded-2xl font-black text-xs uppercase tracking-[1px] shadow-sm hover:bg-pak-green-100 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Hero Banner (Desktop Only) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-gradient-to-r from-pak-green-500 to-pak-green-brand rounded-[32px] p-8 lg:p-12 mb-10 overflow-hidden shadow-[0_20px_50px_-20px_rgba(25,135,84,0.4)] ring-1 ring-white/20"
          >
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <span className="px-4 py-1 bg-pak-green-900/50 text-emerald-400 text-[10px] font-black rounded-full border border-pak-green-400/30 backdrop-blur-sm uppercase tracking-[2px]">Submissions center</span>
                  <div className="flex items-center gap-2 px-4 py-1 bg-white/10 text-white text-[10px] font-black rounded-full border border-white/10 backdrop-blur-sm uppercase tracking-[1px]">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> Tracking Online
                  </div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-tight uppercase">
                  Submission <span className="bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent italic">History</span>
                </h1>
                <p className="text-emerald-100/70 text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">Monitor your tax applications in real-time with comprehensive status updates and secure verification.</p>
              </div>
              <div className="relative group">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white/10 backdrop-blur-2xl rounded-[40px] flex items-center justify-center border border-white/20 shadow-2xl relative z-10">
                  <FileCheck className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
                <div className="absolute -inset-4 bg-emerald-400/20 blur-3xl rounded-full group-hover:bg-emerald-400/30 transition-all duration-500"></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Header for Mobile */}
        {isMobile && (
          <div className="mb-8">
            <h1 className="text-3xl font-black text-pak-green-950 uppercase tracking-tighter leading-none mb-2">My Submissions</h1>
            <p className="text-gray-500 font-bold text-sm">Track and manage your tax filings</p>
          </div>
        )}

        {/* Compact Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`glass-card p-5 sm:p-7 rounded-[24px] sm:rounded-[32px] border-white/60 shadow-sm ${i === 2 && isMobile ? 'col-span-2' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-pak-green-950 tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="glass-card p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border-white/60 mb-10 shadow-xl shadow-pak-green-900/5">
          <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-center">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by ID or service name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/50 border-2 border-transparent rounded-2xl focus:border-pak-green-200 focus:bg-white transition-all text-sm font-bold text-gray-800 placeholder-gray-400 outline-none shadow-inner"
              />
            </div>

            {/* Responsive "One-Liner" Tabs */}
            <div className="relative overflow-x-auto no-scrollbar -mx-2 px-2">
              <LayoutGroup>
                <div className="bg-pak-green-950/5 p-1.5 rounded-[20px] flex items-center w-max xl:w-fit shadow-inner border border-white/60 backdrop-blur-md">
                  {filterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setStatusFilter(opt.value as StatusFilter)}
                      className={`relative px-5 py-3 text-[11px] sm:text-[13px] font-black rounded-[16px] transition-all duration-500 flex items-center gap-2 whitespace-nowrap ${statusFilter === opt.value ? 'text-white' : 'text-gray-500 hover:text-pak-green-800'}`}
                    >
                      <opt.icon className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10 uppercase tracking-tight">{opt.label}</span>
                      {statusFilter === opt.value && (
                        <motion.div
                          layoutId="active-track-tab"
                          className="absolute inset-0 bg-gradient-to-r from-pak-green-500 to-pak-green-brand rounded-[16px] shadow-lg shadow-pak-green-700/30"
                          transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </div>
          </div>
        </div>

        {/* Submissions Content */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-pak-green-100 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-t-4 border-pak-green-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-500 font-black uppercase text-xs tracking-[4px]">Fetching records...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 glass-card rounded-[48px] border-white/60 text-center shadow-xl">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-inner">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-xl font-black text-gray-400 uppercase tracking-tighter">No Applications Found</p>
            <p className="text-gray-400 font-bold text-sm mt-2">Try adjusting your filters or start a new filing.</p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredApplications.map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-white/80 hover:bg-white backdrop-blur-xl border border-white/60 rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(25,135,84,0.12)] hover:border-pak-green-100"
                >
                  <div className="p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center gap-6 sm:gap-10">
                    <div className="flex-1 flex items-start gap-4 sm:gap-6">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] sm:rounded-3xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-6 transition-transform duration-500 ${app.source === 'gst' ? 'bg-pak-green-50 text-pak-green-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {app.source === 'gst' ? <FileCheck className="w-7 h-7 sm:w-8 sm:h-8" /> : <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h4 className="text-base sm:text-xl font-black text-pak-green-950 uppercase tracking-tight truncate max-w-[200px] sm:max-w-none">{app.service_type}</h4>
                          <span className={`px-4 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm ${getStatusStyle(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-gray-400">
                          <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 shadow-inner">
                            <Hash className="w-3.5 h-3.5" /> {app.reference_number}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {formatDate(app.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 ml-[70px] xl:ml-0">
                      <div className="hidden sm:block text-right min-w-[120px]">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last Updated</p>
                        <p className="text-sm font-black text-gray-600">{formatDate(app.updated_at)}</p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {(app.payment_status === 'pending' || app.payment_status === 'unpaid') && (
                          <button
                            onClick={() => app.source === 'gst' ? onPayNow(app.originalData as GSTApplication) : onPayNowIRIS(app.originalData as IRISSubmission)}
                            className="flex-1 sm:flex-none px-6 py-3.5 bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white rounded-[20px] font-black text-xs uppercase tracking-[2px] shadow-lg shadow-pak-green-900/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" /> Pay Now
                          </button>
                        )}
                        <button
                          onClick={() => app.source === 'gst' ? onViewDetails(app.originalData as GSTApplication) : onViewIRISDetails(app.originalData as IRISSubmission)}
                          className="flex-1 sm:flex-none px-6 py-3.5 bg-white border-2 border-pak-green-50 text-pak-green-700 rounded-[20px] font-black text-xs uppercase tracking-[2px] shadow-sm hover:border-pak-green-200 hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}
