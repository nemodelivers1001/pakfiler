import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, FileCheck, ShieldCheck, Key, User } from 'lucide-react';
import { MotionButton } from './ui/MotionButton';

interface PersonalStep10FBRProps {
    onComplete: (data: any) => void;
    onBack: () => void;
}

export default function PersonalStep10FBR({ onComplete, onBack }: PersonalStep10FBRProps) {
    const [credentials, setCredentials] = useState({
        regNo: '',
        password: '',
        pin: ''
    });

    const handleChange = (field: string, value: string) => {
        setCredentials(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-pak-green-100 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-pak-green-900/10">
                    <ShieldCheck className="w-10 h-10 text-pak-green-600" />
                </div>
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">FBR Submission</h2>
                <p className="text-gray-500 font-bold">Provide your IRIS credentials to finalize the submission</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-pak-green-900/5 hover:border-pak-green-200 transition-colors duration-300">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Registration No / CNIC</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pak-green-500 transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={credentials.regNo}
                                onChange={(e) => handleChange('regNo', e.target.value)}
                                className="w-full pl-12 pr-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 focus:bg-white transition-all outline-none font-bold text-gray-800 placeholder-gray-300"
                                placeholder="Enter CNIC / Reg No"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pak-green-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className="w-full pl-12 pr-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 focus:bg-white transition-all outline-none font-bold text-gray-800 placeholder-gray-300"
                                placeholder="IRIS Password"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pin Code</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pak-green-500 transition-colors">
                                <Key className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={credentials.pin}
                                onChange={(e) => handleChange('pin', e.target.value)}
                                className="w-full pl-12 pr-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 focus:bg-white transition-all outline-none font-bold text-gray-800 placeholder-gray-300"
                                placeholder="4-Digit PIN"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-pak-green-50 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-pak-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-bold text-pak-green-800 leading-relaxed">
                        Your credentials are encrypted and only used for official submission to the FBR IRIS portal. We do not store your password.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-10">
                <button
                    type="button"
                    onClick={onBack}
                    className="font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                >
                    Back
                </button>
                <MotionButton
                    type="button"
                    onClick={() => onComplete(credentials)}
                    variant="primary"
                    className="px-8 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 shadow-lg shadow-pak-green-900/20"
                    rightIcon={<FileCheck className="w-4 h-4" />}
                >
                    Submit Return
                </MotionButton>
            </div>
        </div>
    );
}
