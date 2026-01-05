import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface MotionSelectProps {
    options: (string | Option)[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

export function MotionSelect({ options, value, onChange, label, placeholder, className = '' }: MotionSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const formattedOptions: Option[] = options.map(opt =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const selectedOption = formattedOptions.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && (
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 ml-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between pl-6 pr-5 py-5 bg-white/50 backdrop-blur-md border-2 rounded-2xl transition-all duration-300 shadow-inner group
          ${isOpen ? 'border-pak-green-200 bg-white' : 'border-transparent hover:border-pak-green-100 hover:bg-white'}
        `}
            >
                <span className={`text-lg font-black tracking-tight ${selectedOption ? 'text-pak-green-950' : 'text-gray-400'}`}>
                    {selectedOption ? selectedOption.label : placeholder || 'Select option'}
                </span>
                <ChevronDown
                    className={`w-6 h-6 text-pak-green-600 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-[60] w-full mt-2 bg-white/95 backdrop-blur-2xl border border-pak-green-100/50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(25,135,84,0.15)] overflow-hidden"
                    >
                        <div className="p-2 max-h-[300px] overflow-y-auto no-scrollbar">
                            {formattedOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-black transition-all mb-1 last:mb-0 uppercase tracking-tight
                    ${value === option.value
                                            ? 'bg-gradient-to-r from-pak-green-500 to-pak-green-brand text-white shadow-lg shadow-pak-green-900/20 active-item-highlight'
                                            : 'text-gray-600 hover:bg-pak-green-50 hover:text-pak-green-800'}
                  `}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
