import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface MotionInputProps extends Omit<HTMLMotionProps<"input">, "className"> {
    className?: string;
    error?: boolean;
}

const MotionInput = forwardRef<HTMLInputElement, MotionInputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <motion.input
                ref={ref}
                whileFocus={{ scale: 1.01, borderColor: '#198754', boxShadow: "0 0 0 4px rgba(25, 135, 84, 0.1)" }}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                    "w-full px-4 py-3.5 border rounded-xl outline-none transition-all bg-white/50 backdrop-blur-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-pak-green-600 focus:ring-4 focus:ring-pak-green-100",
                    className
                )}
                {...props}
            />
        );
    }
);

MotionInput.displayName = "MotionInput";

export { MotionInput };
