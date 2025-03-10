import { Button } from "./button";
import Image from "next/image";
import GetStartedButton from "./getStartedButton";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
    return(
        <div className="sticky top-0 left-0 right-0 h-[4.5rem] bg-darkpurple-500/50 flex flex-row items-center justify-between px-40 ui-shadow backdrop-blur-[10px] z-50">
            <div className="flex flex-row items-center justify-center">
                <Link href="/">
                    <Image src="Aptable-Logo.svg" alt="Aptable logo" width="150" height="75" className="transition-all duration-200 ease-in-out hover:filter hover:drop-shadow-[0px_3px_0px_rgba(15,11,20,1)] hover:translate-y-[-1.5px] active:drop-shadow-none active:translate-y-0"/>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <Button variant="ghost" size="default">
                    <span>Courses</span>
                </Button>
                <Button variant="ghost" size="default">
                    <span>Pricing</span>
                </Button>
                <Button variant="ghost" size="default">
                    <span>About us</span>
                    <ChevronDown strokeWidth={3} />
                </Button>
                <Button variant="ghost" size="default" className="mr-2">
                    <span>Log in</span>
                </Button>
                <GetStartedButton />
            </div>
            
        </div>
    );
}

export default Navbar;