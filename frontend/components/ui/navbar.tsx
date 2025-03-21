"use client"

import { Button } from "./button";
import Image from "next/image";
import { GetStartedButton } from "./getStartedButton";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "./dropdownMenu";
import { DropdownMenuTrigger } from "./dropdownMenu";
import { useState } from "react";
import { SearchBar } from "./searchBar";

const Navbar = () => {
    const [aboutToggled, setAboutToggled] = useState(false);
    return (
        <div className="sticky top-0 left-0 right-0 h-12 md:h-[4.5rem] bg-darkpurple-500/50 flex flex-row items-center justify-between px-40 ui-shadow backdrop-blur-[10px] z-50">
            <div className="flex flex-row items-center justify-center">
                <Link href="/">
                    <Image src="Aptable-Logo.svg" alt="Aptable logo" width="150" height="75" className="transition-all duration-100 hover:filter hover:drop-shadow-[0px_3px_0px_rgba(15,11,20,1)] hover:translate-y-[-1.5px] active:drop-shadow-none active:translate-y-0" />
                </Link>
            </div>
            <SearchBar placeholder={"Find a course"} className="absolute left-1/2 transform -translate-x-1/2 md:w-1/4 lg:w-1/5 hidden md:flex" />
            <div className="flex flex-row items-center justify-center gap-4">

                <div
                    onMouseEnter={() => setAboutToggled(true)}
                    onMouseLeave={() => setAboutToggled(false)}
                >
                    <DropdownMenu onOpenChange={setAboutToggled}
                        modal={false}
                        open={aboutToggled}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="default" className={`${aboutToggled ? "bg-white/25 pointer-events-none" : ""}`}>
                                <span>About us</span>
                                <ChevronDown strokeWidth={3} className={`transition-all duration-200 ease-in-out ${aboutToggled ? "rotate-180" : ""}`} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            onCloseAutoFocus={(event) => event.preventDefault()}
                            sideOffset={0}
                        >
                            <DropdownMenuGroup>
                                <Link href="/about/our-story">
                                    <DropdownMenuItem>
                                        Our Story
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/about/mission">
                                    <DropdownMenuItem>
                                        Mission
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Wiki
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Link href="/login">
                    <Button variant="ghost" size="default" className="mr-2">
                        <span>Log in</span>
                    </Button>
                </Link>
                <GetStartedButton />
            </div>

        </div>
    );
}

export default Navbar;