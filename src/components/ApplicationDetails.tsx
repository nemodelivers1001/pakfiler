import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Mail, Phone, FileText, Clock } from 'lucide-react';
import { GSTApplication, ApplicationTimeline } from '../types/gst';
import { getApplicationTimeline } from '../lib/gstService';
import { useAuth } from '../context/AuthContext';

interface ApplicationDetailsProps {
  application: GSTApplication;
  onBack: () => void;
}

export default function ApplicationDetails({ application, onBack }: ApplicationDetailsProps) {
  const { user } = useAuth();
  const [timeline, setTimeline] = useState<ApplicationTimeline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, [application.id]);

  const loadTimeline = async () => {
    try {
      const data = await getApplicationTimeline(application.id);
      setTimeline(data);
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Applications
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">GST Registration</h1>
                  <p className="text-sm text-gray-600">Application Details</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded ${getStatusColor(application.status)}`}>
                  {getStatusLabel(application.status).toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Reference Number</p>
                    <p className="font-semibold text-gray-900">{application.reference_number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Submitted</p>
                    <p className="font-semibold text-gray-900">
                      {application.submitted_at ? formatDate(application.submitted_at) : 'Not submitted'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Last Updated</p>
                    <p className="font-semibold text-gray-900">{formatDate(application.updated_at)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">User Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Full Name</p>
                      <p className="font-medium text-gray-900">{user?.user_metadata?.full_name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Mobile</p>
                      <p className="font-medium text-gray-900">{user?.user_metadata?.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Payment Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Service Details</p>
                      <p className="font-semibold text-gray-900">GST Registration</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Service Fees</p>
                      <p className="font-semibold text-gray-900">PKR {application.service_fee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Payment Status</p>
                      <p className={`font-semibold uppercase ${
                        application.payment_status === 'completed' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {application.payment_status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Submitted Documents</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">No additional documents have been requested</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Business Name:</p>
                    <p className="font-medium text-gray-900">{application.business_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Business Type:</p>
                    <p className="font-medium text-gray-900">{application.business_type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Start Date:</p>
                    <p className="font-medium text-gray-900">
                      {new Date(application.start_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Business Nature:</p>
                    <p className="font-medium text-gray-900">{application.business_nature}</p>
                  </div>
                </div>

                {application.consumer_number && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Consumer Number:</p>
                    <p className="font-medium text-gray-900">{application.consumer_number}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-600 mb-1">Business Address:</p>
                  <p className="font-medium text-gray-900">{application.business_address}</p>
                </div>

                {application.description && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Description:</p>
                    <p className="font-medium text-gray-900">{application.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Requested Documents</h2>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">No additional documents have been requested</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Status Timeline</h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : timeline.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">No timeline available</p>
              ) : (
                <div className="space-y-4">
                  {timeline.map((entry, index) => (
                    <div key={entry.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`font-medium ${
                          index === 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {getStatusLabel(entry.status)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(entry.created_at)}
                        </p>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
