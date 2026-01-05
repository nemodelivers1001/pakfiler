import { useState, useEffect } from 'react';

export const useMobile = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkMobile();

        // Event listener for resize
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
};
