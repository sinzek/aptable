// components/BackgroundManager.tsx
"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface BackgroundManagerProps {
    children: ReactNode;
}

export default function BackgroundManager({
    children,
}: BackgroundManagerProps) {
    const pathname = usePathname();

    const getBgColor = (): string => {
        switch (pathname) {
            case "/":
                return "bg-gradient-to-b from-darkpurple-500 to-purple-500";
            case "/start":
                return "bg-darkpurple-600";
            case "/login":
                return "bg-gradient-to-t from-purple-500 from-[-100%] to-darkpurple-500 to-60%";
            case "/about/our-story":
                return "bg-gradient-to-b from-darkpurple-500 to-purple-500";
            case "/about/mission":
                return "bg-gradient-to-b from-darkpurple-500 to-purple-500";
            default:
                return "bg-darkpurple-500";
        }
    };

    return (
        <div
            className={`min-h-screen transition-[background-image] duration-500 ease-in-out ${getBgColor()}`}
        >
            {children}
        </div>
    );
}
