import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, Eye, Trash2, CheckSquare, FileText, Check, X, Download, Image as ImageIcon } from 'lucide-react';
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
  const [previewDocument, setPreviewDocument] = useState<{ type: string; preview: string; fileName: string } | null>(null);

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

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
                <p className="text-sm text-gray-500">Step 2 of 3</p>
              </div>
            </div>
            <p className="text-gray-600">Upload all required documents for your GST registration</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-green-600 block">Business Info</span>
                  <span className="text-xs text-green-500">Completed</span>
                </div>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full max-w-[100px]"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center font-bold shadow-md transform transition-transform hover:scale-105">
                  2
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-blue-600 block">Documents</span>
                  <span className="text-xs text-blue-500">In Progress</span>
                </div>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full max-w-[100px]"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-gray-400 text-sm hidden sm:inline">Payment</span>
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
                            onClick={() => setPreviewDocument({
                              type: docType,
                              preview: documents[docType].preview!,
                              fileName: documents[docType].file?.name || 'document'
                            })}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
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

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Total files uploaded: {uploadedCount}
                  </p>
                  <p className="text-sm text-blue-700">
                    Please upload all required documents or mark them as unavailable to proceed.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={onBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all hover:border-gray-400"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous Step
              </button>
              <button
                onClick={onNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
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
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{previewDocument.type}</h3>
                  <p className="text-blue-100 text-sm">{previewDocument.fileName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewDocument.preview}
                  download={previewDocument.fileName}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                >
                  <Download className="w-5 h-5 text-white" />
                </a>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
              {previewDocument.preview.startsWith('data:application/pdf') ? (
                <iframe
                  src={previewDocument.preview}
                  className="w-full h-[70vh] border border-gray-200 rounded-lg"
                  title="Document Preview"
                />
              ) : (
                <img
                  src={previewDocument.preview}
                  alt={previewDocument.type}
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
