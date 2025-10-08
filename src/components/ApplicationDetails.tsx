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
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Submitted Documents
                  {documents.length > 0 && (
                    <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
                    </span>
                  )}
                </h3>
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
