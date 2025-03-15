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
        }, 1200);
    }, [router]);

    return (
        <Button variant="getstarted" size="lg" onClick={handleClick}>
            <span>Get started</span>
            <ArrowRight strokeWidth={3.5} className="mb-1" />
        </Button>
    );
};
