// components/BackgroundManager.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface BackgroundManagerProps {
    children: ReactNode;
}

export default function BackgroundManager({ children }: BackgroundManagerProps) {
    const pathname = usePathname();

    const getBgColor = (): string => {
        switch (pathname) {
            case '/':
                return 'bg-gradient-to-b from-darkpurple-500 to-purple-500';
            case '/start':
                return 'bg-darkpurple-800';
            case '/login':
                return 'bg-gradient-to-b from-darkpurple-500 to-purple-500';
            case '/about/our-story':
                return 'bg-gradient-to-b from-darkpurple-500 to-purple-500';
            case '/about/mission':
                return 'bg-gradient-to-b from-darkpurple-500 to-purple-500';
            case '/pricing':
                return 'bg-gradient-to-b from-darkpurple-500 to-purple-500';
            default:
                return 'bg-darkpurple-500';
        }
    };

    return (
        <div className={`min-h-screen ${getBgColor()}`}>
            {children}
        </div>
    );
}