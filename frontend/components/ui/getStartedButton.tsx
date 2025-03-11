import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GetStartedButton = () => {
    return (
        <Button variant="getstarted" size="lg">
            <span className="">Get started</span>
            <ArrowRight strokeWidth={3.5} className="mb-1" />
        </Button>
    );
}

export default GetStartedButton;