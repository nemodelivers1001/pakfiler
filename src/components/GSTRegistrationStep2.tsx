import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Upload, Eye, Trash2, CheckSquare, FileText, Check, X, Download, Image as ImageIcon, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOCUMENT_TYPES } from '../types/gst';
import { uploadDocument, getApplicationDocuments, deleteDocument } from '../lib/gstService';
import { useMobile } from '../hooks/useMobile';

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
    id?: string;
  };
}

export default function GSTRegistrationStep2({ applicationId, onNext, onBack }: GSTRegistrationStep2Props) {
  const [documents, setDocuments] = useState<DocumentStatus>({});
  const [dontHaveFlags, setDontHaveFlags] = useState<{ [key: string]: boolean }>({});
  const [previewDocument, setPreviewDocument] = useState<{ type: string; preview: string; fileName: string } | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    loadExistingDocuments();
  }, [applicationId]);

  const loadExistingDocuments = async () => {
    if (!applicationId) return;
    try {
      const existingDocs = await getApplicationDocuments(applicationId);
      const docStatus: DocumentStatus = {};
      existingDocs.forEach(doc => {
        docStatus[doc.document_type] = {
          uploaded: true,
          preview: doc.file_url,
          id: doc.id,
        };
      });
      setDocuments(docStatus);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleFileSelect = async (documentType: string, file: File | null) => {
    if (!file || !applicationId) return;
    setUploadingDoc(documentType);
    try {
      await uploadDocument(applicationId, documentType, file);
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
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleDelete = async (documentType: string) => {
    const doc = documents[documentType];
    if (doc?.id) {
      try {
        await deleteDocument(doc.id);
      } catch (error) {
        console.error('Error deleting document:', error);
        return;
      }
    }
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

  const getStatusInfo = (documentType: string) => {
    if (documents[documentType]?.uploaded) return { label: 'Uploaded', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (dontHaveFlags[documentType]) return { label: 'Not Available', color: 'bg-gray-100 text-gray-600 border-gray-200' };
    return { label: 'Action Required', color: 'bg-orange-100 text-orange-700 border-orange-200' };
  };

  const uploadedCount = Object.values(documents).filter(doc => doc.uploaded).length;

  return (
    <div className="space-y-10">
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          <div className="glass-card rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/10 relative overflow-hidden">
            {/* Desktop Table View */}
            {!isMobile && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-10 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-pak-green-50 rounded-xl flex items-center justify-center text-pak-green-600">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Attachment List</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">Files uploaded: {uploadedCount}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="grid grid-cols-12 px-6 py-4 bg-gray-50/50 rounded-2xl mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Document Title</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-4 text-center">Operations</div>
                  </div>

                  <div className="space-y-2">
                    {DOCUMENT_TYPES.map((docType, idx) => {
                      const status = getStatusInfo(docType);
                      const isUploading = uploadingDoc === docType;
                      const hasPreview = !!documents[docType]?.preview;
                      const isUploaded = documents[docType]?.uploaded;

                      return (
                        <div key={docType} className="grid grid-cols-12 px-6 py-5 items-center hover:bg-white/50 transition-colors rounded-3xl border border-transparent hover:border-white group">
                          <div className="col-span-1 text-[11px] font-black text-gray-300">{idx + 1}</div>
                          <div className="col-span-5">
                            <p className="text-sm font-black text-pak-green-950 leading-tight">{docType}</p>
                            {dontHaveFlags[docType] && <p className="text-[9px] text-orange-400 uppercase font-black tracking-widest mt-1">Flagged as N/A</p>}
                          </div>
                          <div className="col-span-2 flex justify-center">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center gap-3">
                            <label className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${isUploading ? 'bg-pak-green-50' : 'bg-white shadow-sm hover:shadow-md hover:scale-110 active:scale-95'}`}>
                              <input type="file" className="hidden" onChange={(e) => handleFileSelect(docType, e.target.files?.[0] || null)} disabled={dontHaveFlags[docType] || isUploading} />
                              {isUploading ? <div className="w-4 h-4 border-2 border-pak-green-600 border-t-transparent rounded-full animate-spin" /> : <Upload className={`w-4 h-4 ${dontHaveFlags[docType] ? 'text-gray-200' : 'text-pak-green-600'}`} />}
                            </label>

                            <button onClick={() => hasPreview && setPreviewDocument({ type: docType, preview: documents[docType].preview!, fileName: documents[docType].file?.name || 'document' })} disabled={!hasPreview} className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center transition-all ${hasPreview ? 'text-pak-green-600 hover:shadow-md hover:scale-110' : 'text-gray-200 cursor-not-allowed'}`}>
                              <Eye className="w-4 h-4" />
                            </button>

                            <button onClick={() => isUploaded && handleDelete(docType)} disabled={!isUploaded} className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center transition-all ${isUploaded ? 'text-red-600 hover:shadow-md hover:scale-110' : 'text-gray-200 cursor-not-allowed'}`}>
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="h-6 w-[2px] bg-gray-100 mx-1"></div>

                            <button onClick={() => handleDontHave(docType, !dontHaveFlags[docType])} className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${dontHaveFlags[docType] ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                              N/A
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Card View */}
            {isMobile && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-pak-green-950 uppercase tracking-tight">Attachments</h3>
                  <div className="bg-pak-green-50 px-3 py-1 rounded-full text-[10px] font-black text-pak-green-600 uppercase tracking-widest border border-pak-green-100">{uploadedCount} / {DOCUMENT_TYPES.length}</div>
                </div>

                <div className="space-y-4">
                  {DOCUMENT_TYPES.map((docType) => {
                    const status = getStatusInfo(docType);
                    const isUploading = uploadingDoc === docType;
                    const isUploaded = documents[docType]?.uploaded;

                    return (
                      <div key={docType} className={`p-5 rounded-3xl border-2 transition-all ${isUploaded ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white/50 border-white/80'}`}>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <p className="text-xs font-black text-pak-green-900 leading-tight mb-1">{docType}</p>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[1px] border ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <button onClick={() => handleDontHave(docType, !dontHaveFlags[docType])} className={`shrink-0 p-2 rounded-xl transition-all ${dontHaveFlags[docType] ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <CheckSquare className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-100 shadow-sm py-3 rounded-2xl active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest text-pak-green-600">
                            <input type="file" className="hidden" onChange={(e) => handleFileSelect(docType, e.target.files?.[0] || null)} disabled={dontHaveFlags[docType] || isUploading} />
                            {isUploading ? <div className="w-4 h-4 border-2 border-pak-green-600 border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
                            {isUploaded ? 'Replace File' : 'Upload File'}
                          </label>

                          {isUploaded && (
                            <button onClick={() => setPreviewDocument({ type: docType, preview: documents[docType].preview!, fileName: documents[docType].file?.name || 'document' })} className="w-12 h-12 bg-pak-green-50 rounded-2xl flex items-center justify-center text-pak-green-600 border border-pak-green-100">
                              <Eye className="w-4 h-4" />
                            </button>
                          )}

                          {isUploaded && (
                            <button onClick={() => handleDelete(docType)} className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4 space-y-8">
          <div className="space-y-4">
            <button
              onClick={onNext}
              className="w-full group bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white py-6 rounded-[32px] font-black uppercase text-xs tracking-[4px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50"
            >
              Proceed to Payment
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onBack}
              className="w-full flex items-center justify-center gap-3 py-5 text-[10px] font-black uppercase tracking-[3px] text-gray-400 hover:text-pak-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Part 1
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-10"
            onClick={() => setPreviewDocument(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[40px] max-w-5xl w-full max-h-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-pak-green-950 p-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-tight leading-none mb-1">{previewDocument.type}</h3>
                    <p className="text-[10px] font-black text-emerald-400/50 uppercase tracking-widest">{previewDocument.fileName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href={previewDocument.preview} download={previewDocument.fileName} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                    <Download className="w-5 h-5" />
                  </a>
                  <button onClick={() => setPreviewDocument(null)} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-12 overflow-auto bg-gray-50 flex items-center justify-center min-h-[50vh]">
                {previewDocument.preview.startsWith('data:application/pdf') ? (
                  <iframe src={previewDocument.preview} className="w-full h-[70vh] rounded-3xl border border-gray-200 bg-white" title="Document Preview" />
                ) : (
                  <img src={previewDocument.preview} alt={previewDocument.type} className="max-w-full h-auto rounded-3xl shadow-xl border-8 border-white" />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
