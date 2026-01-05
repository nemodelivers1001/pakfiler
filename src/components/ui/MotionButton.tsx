import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MotionButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function MotionButton({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}: MotionButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
        primary: "bg-gradient-to-r from-pak-green-600 to-pak-green-700 text-white hover:brightness-110 shadow-lg hover:shadow-pak-green-600/20 focus:ring-pak-green-600",
        secondary: "bg-pak-green-50 text-pak-green-700 hover:bg-pak-green-100 border border-pak-green-200 focus:ring-pak-green-500",
        outline: "border-2 border-pak-green-600 text-pak-green-600 hover:bg-pak-green-50 focus:ring-pak-green-600",
        ghost: "text-pak-green-600 hover:bg-pak-green-50 hover:text-pak-green-700",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Shimmer effect for primary buttons */}
            {variant === 'primary' && !disabled && !isLoading && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
            )}

            <span className="relative z-20 flex items-center gap-2">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </span>
        </motion.button>
    );
}
