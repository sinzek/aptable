"use client";

import { useUser } from "@/components/context/userContext";
import React from "react";

interface UsernameProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
}

export const Username = React.forwardRef<HTMLSpanElement, UsernameProps>(
    ({ className, ...props }, ref) => {
        const { username } = useUser();
        return (
            <span ref={ref} className={className} {...props}>
                {username}
            </span>
        );
    }
);

Username.displayName = "Username";
