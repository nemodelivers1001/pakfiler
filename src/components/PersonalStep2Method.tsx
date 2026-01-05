import { motion } from 'framer-motion';
import { Globe, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PersonalStep2MethodProps {
    onContinue: (method: string) => void;
    onBack: () => void;
}

export default function PersonalStep2Method({ onContinue, onBack }: PersonalStep2MethodProps) {
    const methods = [
        {
            id: 'online',
            title: 'Online Filing',
            description: 'Automated step-by-step filing through our smart portal',
            icon: Globe,
            badge: 'Recommended'
        },
        {
            id: 'document-upload',
            title: 'Document Upload',
            description: 'Upload your documents and let our experts handle it',
            icon: FileText,
            badge: null
        }
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Choose Filing Method</h2>
                <p className="text-gray-500 font-bold">Select how you would like to proceed with your filing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {methods.map((method, index) => (
                    <motion.button
                        key={method.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onContinue(method.id)}
                        className="group relative bg-white hover:bg-gradient-to-br hover:from-pak-green-500 hover:to-pak-green-brand border-2 border-gray-100 hover:border-transparent rounded-[40px] p-8 text-left transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-pak-green-500/20 overflow-hidden"
                    >
                        {method.badge && (
                            <div className="absolute top-6 right-6">
                                <span className="bg-pak-green-100 text-pak-green-700 group-hover:bg-white/20 group-hover:text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors">
                                    {method.badge}
                                </span>
                            </div>
                        )}

                        <div className="w-16 h-16 bg-pak-green-50 group-hover:bg-white/20 rounded-2xl mb-6 flex items-center justify-center transition-colors">
                            <method.icon className="w-8 h-8 text-pak-green-600 group-hover:text-white transition-colors" />
                        </div>

                        <h3 className="text-2xl font-black text-pak-green-950 group-hover:text-white mb-3 tracking-tight">{method.title}</h3>
                        <p className="text-sm font-bold text-gray-400 group-hover:text-pak-green-100 mb-8 leading-relaxed max-w-xs transition-colors">
                            {method.description}
                        </p>

                        <div className="flex items-center gap-2 text-pak-green-600 group-hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                            <span>Select Method</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
