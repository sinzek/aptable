import { FadeOverlay } from "@/components/fadeOverlay";
import Image from "next/image";

export default function Pricing() {
    return(
        <div className="h-full overflow-hidden">
            <FadeOverlay />
            <div className="hidden md:inline">
                <Image src="Ring.svg" quality={5} alt="Background ring" width={900} height={900}
                    className="absolute -left-12 top-[65%] -rotate-[32deg] blur-xl" />
                <Image src="Ring.svg" quality={5} alt="Background ring" width={700} height={700}
                    className="absolute -left-12 top-[50%] -rotate-[32deg] blur-xl" />
                <Image src="Ring.svg" quality={5} alt="Background ring" width={400} height={400}
                    className="absolute left-2 top-[40%] -rotate-[32deg] blur-xl" />
                <Image src="Ring.svg" quality={5} alt="Background ring" width={200} height={200}
                    className="absolute left-8 top-[30%] -rotate-[32deg] blur-xl" />
            </div>
            THIS IS THE PRICING PAGE!
        </div>
    );
}