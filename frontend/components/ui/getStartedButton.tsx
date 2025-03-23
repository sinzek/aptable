"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const triggerAnimationEvent = new Event("triggerPingleAnimation");

export const GetStartedButton = () => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        document.dispatchEvent(triggerAnimationEvent);

        setTimeout(() => {
            router.push("/start");
        }, 500);
    }, [router]);

    return (
        <Button
            variant="getstarted"
            size="lg"
            onClick={handleClick}
            className="shadow-[0_0_30px_10px_rgba(255,255,255,0.15)]"
        >
            <span>Get started</span>
            <ArrowRight strokeWidth={3.5} className="mb-1" />
        </Button>
    );
};
