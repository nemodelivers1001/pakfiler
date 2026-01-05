import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Phone, CreditCard, Flag, MapPin, Briefcase, ArrowRight, Wallet } from 'lucide-react';
import { MotionButton } from './ui/MotionButton';
import { MotionSelect } from './ui/MotionSelect';

interface PersonalStep3BasicInfoProps {
    onContinue: (data: any) => void;
    onBack: () => void;
}

const InputGroup = ({ label, value, onChange, placeholder, icon: Icon, type = "text", required = false, name }: any) => (
    <div className="space-y-2 group">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-pak-green-500 transition-colors">{label}</label>
        <div className="relative">
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-pak-green-500 focus:bg-white transition-all outline-none font-bold text-gray-800 placeholder-gray-300"
                placeholder={placeholder}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pak-green-500 transition-colors">
                {Icon ? <Icon className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
            </div>
        </div>
    </div>
);

export default function PersonalStep3BasicInfo({ onContinue, onBack }: PersonalStep3BasicInfoProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dob: '',
        mobile: '',
        cnic: '',
        nationality: 'pakistani',
        residentialStatus: 'resident',
        occupation: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(formData);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-pak-green-950 uppercase tracking-tight mb-4">Personal Information</h2>
                <p className="text-gray-500 font-bold">Please provide your basic personal details</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-pak-green-900/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <InputGroup
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        icon={User}
                        required
                    />

                    <InputGroup
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        icon={Mail}
                        required
                    />

                    <InputGroup
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        icon={Calendar}
                        required
                    />

                    <InputGroup
                        label="Mobile Number"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="0300-1234567"
                        icon={Phone}
                        required
                    />

                    <InputGroup
                        label="CNIC No."
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        placeholder="42201-1234567-8"
                        icon={CreditCard}
                        required
                    />

                    <div className="space-y-2 group">
                        <MotionSelect
                            label="Occupation"
                            options={[
                                { value: 'salaried', label: 'Salaried Individual' },
                                { value: 'business', label: 'Business Owner' },
                                { value: 'freelancer', label: 'Freelancer' },
                                { value: 'other', label: 'Other' }
                            ]}
                            value={formData.occupation}
                            onChange={(value) => setFormData({ ...formData, occupation: value })}
                            placeholder="Select Occupation"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pt-8 border-t border-gray-100">
                    <div className="space-y-4">
                        <MotionSelect
                            label="Nationality"
                            options={[
                                { value: 'pakistani', label: 'Pakistani' },
                                { value: 'foreigner', label: 'Foreigner' }
                            ]}
                            value={formData.nationality}
                            onChange={(value) => setFormData({ ...formData, nationality: value })}
                            placeholder="Select Nationality"
                        />
                    </div>

                    <div className="space-y-4">
                        <MotionSelect
                            label="Residential Status"
                            options={[
                                { value: 'resident', label: 'Resident' },
                                { value: 'non-resident', label: 'Non-Resident' }
                            ]}
                            value={formData.residentialStatus}
                            onChange={(value) => setFormData({ ...formData, residentialStatus: value })}
                            placeholder="Select Status"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onBack}
                        className="font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                    >
                        Back
                    </button>
                    <MotionButton
                        type="submit"
                        variant="primary"
                        className="px-8 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 shadow-lg shadow-pak-green-900/20"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                        Continue
                    </MotionButton>
                </div>
            </form>
        </div>
    );
}
