import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Mail, Phone, FileText, Clock, Download, Eye, File, Image as ImageIcon } from 'lucide-react';
import { GSTApplication, ApplicationTimeline, ApplicationDocument } from '../types/gst';
import { getApplicationTimeline, getApplicationDocuments } from '../lib/gstService';
import { useAuth } from '../context/AuthContext';

interface ApplicationDetailsProps {
  application: GSTApplication;
  onBack: () => void;
}

export default function ApplicationDetails({ application, onBack }: ApplicationDetailsProps) {
  const { user } = useAuth();
  const [timeline, setTimeline] = useState<ApplicationTimeline[]>([]);
  const [documents, setDocuments] = useState<ApplicationDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [previewDocument, setPreviewDocument] = useState<ApplicationDocument | null>(null);

  useEffect(() => {
    loadTimeline();
    loadDocuments();
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

  const loadDocuments = async () => {
    try {
      const data = await getApplicationDocuments(application.id);
      setDocuments(data);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoadingDocs(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 group text-gray-600 hover:text-pak-green-600 flex items-center gap-2 transition-all font-medium"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="group-hover:underline">Back to Applications</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300 border border-green-100">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">GST Registration</h1>
                    <p className="text-sm text-gray-600">Application Details</p>
                  </div>
                </div>
                <div className="animate-pulse-slow">
                  <span className={`px-4 py-2 text-sm font-bold rounded-full shadow-md ${getStatusColor(application.status)}`}>
                    {getStatusLabel(application.status).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b-2 border-gray-100">
                <div className="flex items-center gap-4 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Reference Number</p>
                    <p className="font-bold text-gray-900">{application.reference_number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Submitted</p>
                    <p className="font-bold text-gray-900">
                      {application.submitted_at ? formatDate(application.submitted_at) : 'Not submitted'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                    <p className="font-bold text-gray-900">{formatDate(application.updated_at)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b-2 border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <User className="w-5 h-5 text-pak-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Full Name</p>
                      <p className="font-semibold text-gray-900">{user?.user_metadata?.full_name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="w-5 h-5 text-pak-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900 truncate">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="w-5 h-5 text-pak-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Mobile</p>
                      <p className="font-semibold text-gray-900">{user?.user_metadata?.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Information</h3>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Service Details</p>
                      <p className="font-bold text-gray-900 text-lg">GST Registration</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Service Fees</p>
                      <p className="font-bold text-green-700 text-2xl">PKR {application.service_fee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Payment Status</p>
                      <p className={`font-bold uppercase text-lg ${application.payment_status === 'completed' ? 'text-pak-green-600' : 'text-orange-600'
                        }`}>
                        {application.payment_status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Submitted Documents</h3>
                  </div>
                  {documents.length > 0 && (
                    <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-bold rounded-full border-2 border-green-200">
                      {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
                    </span>
                  )}
                </div>
                {loadingDocs ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-600 text-sm">Loading documents...</p>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">No documents uploaded yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="group bg-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            {doc.file_name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                              <ImageIcon className="w-6 h-6 text-white" />
                            ) : (
                              <File className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors">
                              {doc.document_type}
                            </p>
                            <p className="text-xs text-gray-500 truncate mb-2">{doc.file_name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {new Date(doc.uploaded_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => setPreviewDocument(doc)}
                            className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>
                          <a
                            href={doc.file_url}
                            download={doc.file_name}
                            className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2">Business Name</p>
                    <p className="font-bold text-gray-900 text-lg">{application.business_name}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2">Business Type</p>
                    <p className="font-bold text-gray-900 text-lg">{application.business_type}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2">Start Date</p>
                    <p className="font-bold text-gray-900">
                      {new Date(application.start_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2">Business Nature</p>
                    <p className="font-bold text-gray-900">{application.business_nature}</p>
                  </div>
                </div>

                {application.consumer_number && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2">Consumer Number</p>
                    <p className="font-bold text-gray-900 text-lg font-mono">{application.consumer_number}</p>
                  </div>
                )}

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                  <p className="text-xs text-gray-600 mb-2">Business Address</p>
                  <p className="font-bold text-gray-900">{application.business_address}</p>
                </div>

                {application.description && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2">Description</p>
                    <p className="font-semibold text-gray-900">{application.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Requested Documents</h2>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-8 text-center border-2 border-gray-200">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No additional documents have been requested</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Status Timeline</h2>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-6 h-6 border-2 border-pak-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : timeline.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">No timeline available</p>
              ) : (
                <div className="space-y-4">
                  {timeline.map((entry, index) => (
                    <div key={entry.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`font-medium ${index === 0 ? 'text-pak-green-600' : 'text-gray-900'
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

      {previewDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setPreviewDocument(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  {previewDocument.file_name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <ImageIcon className="w-6 h-6 text-white" />
                  ) : (
                    <File className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{previewDocument.document_type}</h3>
                  <p className="text-blue-100 text-sm">{previewDocument.file_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewDocument.file_url}
                  download={previewDocument.file_name}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                >
                  <Download className="w-5 h-5 text-white" />
                </a>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)] bg-gray-50">
              {previewDocument.file_url.match(/\.pdf$/i) || previewDocument.file_name.match(/\.pdf$/i) ? (
                <iframe
                  src={previewDocument.file_url}
                  className="w-full h-[70vh] border border-gray-200 rounded-lg bg-white"
                  title="Document Preview"
                />
              ) : (
                <img
                  src={previewDocument.file_url}
                  alt={previewDocument.document_type}
                  className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
