import { useState, useEffect } from 'react';
import { Search, RefreshCw, Eye, CreditCard, ArrowLeft, FileCheck, Clock, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { GSTApplication } from '../types/gst';
import { IRISSubmission } from '../types/iris';
import { getUserApplications } from '../lib/gstService';
import { getUserIRISSubmissions } from '../lib/irisService';

interface TrackSubmissionsProps {
  onViewDetails: (application: GSTApplication) => void;
  onViewIRISDetails: (submission: IRISSubmission) => void;
  onPayNow: (application: GSTApplication) => void;
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

export default function TrackSubmissions({ onViewDetails, onViewIRISDetails, onPayNow }: TrackSubmissionsProps) {
  const [applications, setApplications] = useState<CombinedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

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
      pending_payment: 'Pending Payment',
      payment_verified: 'Payment Verified',
      processing: 'Processing',
      completed: 'Completed',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending_payment: 'bg-orange-100 text-orange-800',
      payment_verified: 'bg-blue-100 text-blue-800',
      processing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGgydjJ6bTAgNGgydjJ6bS0yIDJoMnYyem0wLTRoMnYyem0wIDhoMnYyek0zNCA0aDJ2MnptMCA0aDJ2MnptLTIgMmgydjJ6bTAtNGgydjJ6bTAgOGgydjJ6bS0yIDJoMnYyek0zMiAyaDJ2MnptMCA0aDJ2MnptLTIgMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <button
          onClick={() => window.history.back()}
          className="mb-6 group text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-all font-semibold bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform animate-pulse-slow">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  Track My Submissions
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                </h1>
                <p className="text-gray-600 text-lg">
                  Monitor the status of your tax-related applications and returns
                </p>
              </div>
            </div>
            <button
              onClick={loadApplications}
              disabled={loading}
              className="px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 font-bold rounded-xl flex items-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border-2 border-blue-100 transform hover:scale-[1.01] transition-transform">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-800 font-bold text-lg">Filters & Search</span>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by reference number or service type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-gray-800 font-medium placeholder-gray-400 shadow-sm hover:border-blue-300"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All', icon: FileCheck },
                { value: 'pending_payment', label: 'Pending Payment', icon: Clock },
                { value: 'payment_verified', label: 'Verified', icon: CheckCircle2 },
                { value: 'completed', label: 'Completed', icon: CheckCircle2 },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value as StatusFilter)}
                  className={`px-5 py-3 text-sm font-bold rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-md ${
                    statusFilter === filter.value
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100">
          <div className="px-8 py-6 border-b-2 border-gray-100 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                <FileCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Applications ({filteredApplications.length})
                  <TrendingUp className="w-6 h-6" />
                </h2>
                <p className="text-sm text-blue-100">All your submissions in one place</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-semibold text-lg">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-16 text-center">
              <FileCheck className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-blue-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app, index) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all transform hover:scale-[1.01] hover:shadow-md group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform ${
                            app.source === 'gst'
                              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                              : 'bg-gradient-to-br from-purple-500 to-pink-500'
                          }`}>
                            {app.source === 'gst' ? (
                              <FileCheck className="w-6 h-6 text-white" />
                            ) : (
                              <TrendingUp className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{app.service_type}</p>
                            <p className="text-xs text-gray-500 font-mono">#{app.reference_number}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 text-sm font-bold rounded-lg border-2 border-blue-200 shadow-sm">
                          {app.reference_number}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`px-4 py-2 text-xs font-bold rounded-full shadow-md animate-pulse-slow ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                          {(app.payment_status === 'pending' || app.payment_status === 'unpaid') && app.source === 'gst' && (
                            <button
                              onClick={() => onPayNow(app.originalData as GSTApplication)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              <CreditCard className="w-4 h-4" />
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                        {app.submitted_at ? formatDate(app.submitted_at) : '-'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                        {formatDate(app.updated_at)}
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => app.source === 'gst'
                            ? onViewDetails(app.originalData as GSTApplication)
                            : onViewIRISDetails(app.originalData as IRISSubmission)
                          }
                          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
