import Image from "next/image";
import React from "react";

interface AptableLogoProps extends React.HTMLAttributes<HTMLImageElement> {
    className?: string;
    width: number;
    height: number;
}

export const AptableLogo = React.forwardRef<HTMLImageElement, AptableLogoProps>(
    ({ className, width, height, ...props }, ref) => {
        return (
            <Image
                ref={ref}
                src="/Aptable-Logo.svg"
                alt="Aptable logo"
                width={width}
                height={height}
                className={`transition-all duration-100 hover:filter hover:drop-shadow-[0px_3px_0px_rgba(15,11,20,1)] hover:translate-y-[-1.5px] active:drop-shadow-none active:translate-y-0 ${className}`}
                {...props}
            />
        );
    }
);

AptableLogo.displayName = "Username";
