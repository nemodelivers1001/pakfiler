import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Mail, Phone, FileText, Clock, Briefcase, TrendingUp, Building2, DollarSign, ShoppingBag, Home, Users, BadgeDollarSign } from 'lucide-react';
import { IRISSubmission } from '../types/iris';
import { getIRISSubmissionById } from '../lib/irisService';
import { useAuth } from '../context/AuthContext';

interface IRISApplicationDetailsProps {
  submission: IRISSubmission;
  onBack: () => void;
}

export default function IRISApplicationDetails({ submission, onBack }: IRISApplicationDetailsProps) {
  const { user } = useAuth();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [submission.id]);

  const loadDetails = async () => {
    try {
      const data = await getIRISSubmissionById(submission.id!);
      setDetails(data);
    } catch (error) {
      console.error('Error loading details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: 'Pending',
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
      pending: 'bg-gray-100 text-gray-800',
      pending_payment: 'bg-orange-100 text-orange-800',
      payment_verified: 'bg-green-100 text-green-800',
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 group text-gray-600 hover:text-green-600 flex items-center gap-2 transition-all font-medium"
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
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">IRIS Profile Update</h1>
                    <p className="text-sm text-gray-600">Application Details</p>
                  </div>
                </div>
                <div className="animate-pulse-slow">
                  <span className={`px-4 py-2 text-sm font-bold rounded-full shadow-md ${getStatusColor(submission.status)}`}>
                    {getStatusLabel(submission.status).toUpperCase()}
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
                    <p className="font-bold text-gray-900">{submission.reference_number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Submitted</p>
                    <p className="font-bold text-gray-900">
                      {submission.submitted_at ? formatDate(submission.submitted_at) : 'Not submitted'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                    <p className="font-bold text-gray-900">{formatDate(submission.updated_at!)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Submission Type</p>
                    <p className="font-bold text-gray-900 capitalize">{submission.submission_type}</p>
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
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Full Name</p>
                      <p className="font-semibold text-gray-900">{user?.user_metadata?.full_name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900 truncate">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
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
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Information</h3>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Service Details</p>
                      <p className="font-bold text-gray-900 text-lg">IRIS Profile Update</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Service Fees</p>
                      <p className="font-bold text-green-700 text-2xl">{formatCurrency(submission.amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Payment Status</p>
                      <p className={`font-bold uppercase text-lg ${
                        submission.payment_status === 'paid' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {submission.payment_status}
                      </p>
                    </div>
                  </div>
                  {submission.completion_time && (
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-xs text-gray-600 mb-1">Expected Completion Time</p>
                      <p className="font-semibold text-gray-900">{submission.completion_time}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {submission.submission_type === 'salary' && details?.salaryDetails && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BadgeDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Salary Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-600 mb-2">Employer Name</p>
                      <p className="font-bold text-gray-900 text-lg">{details.salaryDetails.employer_name}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-600 mb-2">Monthly Salary</p>
                      <p className="font-bold text-purple-700 text-xl">{formatCurrency(details.salaryDetails.monthly_salary)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-600 mb-2">Employment Start Date</p>
                      <p className="font-bold text-gray-900">
                        {new Date(details.salaryDetails.employment_start_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-600 mb-2">Tax Deducted</p>
                      <p className="font-bold text-gray-900">{details.salaryDetails.tax_deducted ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  {details.salaryDetails.ntn && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-600 mb-2">NTN Number</p>
                      <p className="font-bold text-gray-900 text-lg font-mono">{details.salaryDetails.ntn}</p>
                    </div>
                  )}
                </div>

                {details.additionalInfo && (
                  <div className="mt-8 pt-8 border-t-2 border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-2">Has Property</p>
                        <p className="font-bold text-gray-900">{details.additionalInfo.has_property ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-2">Has Vehicle</p>
                        <p className="font-bold text-gray-900">{details.additionalInfo.has_vehicle ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-2">Has Bank Account</p>
                        <p className="font-bold text-gray-900">{details.additionalInfo.has_bank_account ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {submission.submission_type === 'business' && details?.businessDetails && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
                </div>

                <div className="space-y-6">
                  {details.businessDetails.businesses.map((business: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-all transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                          <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Business {index + 1}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Business Name</p>
                          <p className="font-bold text-gray-900">{business.businessName}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Type of Business</p>
                          <p className="font-bold text-gray-900 capitalize">{business.businessType.replace('_', ' ')}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Annual Turnover</p>
                          <p className="font-bold text-emerald-700 text-lg">{formatCurrency(business.annualTurnover)}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Number of Employees</p>
                          <p className="font-bold text-gray-900 flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-600" />
                            {business.numberOfEmployees}
                          </p>
                        </div>
                      </div>

                      {business.address && (
                        <div className="mt-4 bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1 flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Business Address
                          </p>
                          <p className="font-semibold text-gray-900">{business.address}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Quick Info</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                  <p className="text-xs text-gray-600 mb-2">Current Status</p>
                  <p className="font-bold text-green-700 text-lg">{getStatusLabel(submission.status)}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                  <p className="text-xs text-gray-600 mb-2">Payment Status</p>
                  <p className={`font-bold text-lg capitalize ${
                    submission.payment_status === 'paid' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {submission.payment_status}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                  <p className="text-xs text-gray-600 mb-2">Total Amount</p>
                  <p className="font-bold text-green-700 text-2xl">{formatCurrency(submission.amount)}</p>
                </div>

                {submission.completion_time && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border-2 border-orange-200">
                    <p className="text-xs text-gray-600 mb-2">Completion Time</p>
                    <p className="font-semibold text-gray-900">{submission.completion_time}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
