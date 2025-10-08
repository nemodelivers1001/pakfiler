import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, Eye, Trash2, CheckSquare } from 'lucide-react';
import { DOCUMENT_TYPES } from '../types/gst';

interface GSTRegistrationStep2Props {
  applicationId: string;
  onNext: () => void;
  onBack: () => void;
}

interface DocumentStatus {
  [key: string]: {
    uploaded: boolean;
    file?: File;
    preview?: string;
  };
}

export default function GSTRegistrationStep2({ onNext, onBack }: GSTRegistrationStep2Props) {
  const [documents, setDocuments] = useState<DocumentStatus>({});
  const [dontHaveFlags, setDontHaveFlags] = useState<{ [key: string]: boolean }>({});

  const handleFileSelect = (documentType: string, file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setDocuments(prev => ({
        ...prev,
        [documentType]: {
          uploaded: true,
          file,
          preview: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (documentType: string) => {
    setDocuments(prev => {
      const newDocs = { ...prev };
      delete newDocs[documentType];
      return newDocs;
    });
  };

  const handleDontHave = (documentType: string, checked: boolean) => {
    setDontHaveFlags(prev => ({ ...prev, [documentType]: checked }));
    if (checked) {
      handleDelete(documentType);
    }
  };

  const getDocumentStatus = (documentType: string): 'uploaded' | 'required' | 'not-required' => {
    if (documents[documentType]?.uploaded) return 'uploaded';
    if (dontHaveFlags[documentType]) return 'not-required';
    return 'required';
  };

  const uploadedCount = Object.values(documents).filter(doc => doc.uploaded).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">GST Registration</h1>
            <p className="text-gray-600">Register your business for General Sales Tax with the Federal Board of Revenue</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="font-medium text-green-600">Business Information</span>
              </div>
              <div className="w-16 h-0.5 bg-green-500"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="font-medium text-green-600">Document Upload</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="text-gray-500">Submit Application</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Required Documents</h2>
            <p className="text-sm text-gray-600 mb-6">
              Please upload all the required documents for GST registration. All documents should be clear and readable.
              If you don't have a particular document, check the "I don't have this" option.
            </p>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div className="px-4 py-3 col-span-2">Files</div>
                <div className="px-4 py-3">Status</div>
                <div className="px-4 py-3">Upload</div>
                <div className="px-4 py-3">View</div>
                <div className="px-4 py-3">Delete</div>
                <div className="px-4 py-3">N/A</div>
              </div>

              <div className="divide-y divide-gray-200">
                {DOCUMENT_TYPES.map((docType) => {
                  const status = getDocumentStatus(docType);
                  return (
                    <div key={docType} className="grid grid-cols-5 items-center text-sm">
                      <div className="px-4 py-4 col-span-2 text-gray-700">{docType}</div>
                      <div className="px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            status === 'uploaded'
                              ? 'bg-green-100 text-green-800'
                              : status === 'not-required'
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {status === 'uploaded' ? 'Uploaded' : status === 'not-required' ? 'N/A' : 'Required'}
                        </span>
                      </div>
                      <div className="px-4 py-4">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileSelect(docType, e.target.files?.[0] || null)}
                            disabled={dontHaveFlags[docType]}
                          />
                          <Upload className={`w-5 h-5 ${dontHaveFlags[docType] ? 'text-gray-300' : 'text-green-600 hover:text-green-700'}`} />
                        </label>
                      </div>
                      <div className="px-4 py-4">
                        {documents[docType]?.preview ? (
                          <button
                            onClick={() => window.open(documents[docType].preview, '_blank')}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        ) : (
                          <Eye className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="px-4 py-4">
                        {documents[docType]?.uploaded ? (
                          <button
                            onClick={() => handleDelete(docType)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        ) : (
                          <Trash2 className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="px-4 py-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dontHaveFlags[docType] || false}
                            onChange={(e) => handleDontHave(docType, e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                            dontHaveFlags[docType] ? 'bg-gray-100 border-gray-400' : 'border-gray-300'
                          }`}>
                            {dontHaveFlags[docType] && <CheckSquare className="w-4 h-4 text-gray-600" />}
                          </div>
                          <span className="ml-2 text-xs text-gray-600">I don't have this</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Total files uploaded: {uploadedCount}</span>
                <br />
                Please upload all required documents or mark them as unavailable to proceed.
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={onBack}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={onNext}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                Submit Application
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
