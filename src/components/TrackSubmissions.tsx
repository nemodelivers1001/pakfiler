import { useState, useEffect } from 'react';
import { Search, RefreshCw, Eye, CreditCard, ArrowLeft, FileCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { GSTApplication } from '../types/gst';
import { IRISSubmission } from '../types/iris';
import { getUserApplications } from '../lib/gstService';
import { getUserIRISSubmissions } from '../lib/irisService';

interface TrackSubmissionsProps {
  onViewDetails: (application: GSTApplication) => void;
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

export default function TrackSubmissions({ onViewDetails, onPayNow }: TrackSubmissionsProps) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-all hover:gap-3 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileCheck className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Track My Submissions
                </h1>
              </div>
              <p className="text-gray-600">
                Monitor the status of your tax-related applications and returns
              </p>
            </div>
            <button
              onClick={loadApplications}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-semibold">Filters & Search</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'pending_payment', label: 'Pending Payment' },
                { value: 'payment_verified', label: 'Payment Verified' },
                { value: 'completed', label: 'Completed' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value as StatusFilter)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    statusFilter === filter.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Applications ({filteredApplications.length})
                </h2>
                <p className="text-xs text-gray-500">Page 1 of 1</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50 transition-all">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{app.service_type}</p>
                          <p className="text-sm text-gray-500">#{app.reference_number}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-sm font-mono rounded border border-blue-200">
                          {app.reference_number}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                          {(app.payment_status === 'pending' || app.payment_status === 'unpaid') && app.source === 'gst' && (
                            <button
                              onClick={() => onPayNow(app.originalData as GSTApplication)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded flex items-center gap-1 transition-colors"
                            >
                              <CreditCard className="w-3 h-3" />
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {app.submitted_at ? formatDate(app.submitted_at) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(app.updated_at)}
                      </td>
                      <td className="px-6 py-4">
                        {app.source === 'gst' ? (
                          <button
                            onClick={() => onViewDetails(app.originalData as GSTApplication)}
                            className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Details
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 text-gray-400 text-sm">-</span>
                        )}
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
