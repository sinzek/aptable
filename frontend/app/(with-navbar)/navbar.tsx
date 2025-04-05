"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GetStartedButton } from "@/components/ui/getStartedButton";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { useState } from "react";
import { SearchBar } from "@/components/ui/searchBar";
import { motion } from "framer-motion";
import AuthButton from "@/components/ui/loginButton";
import { AptableLogo } from "@/components/ui/aptableLogo";
import { useUser } from "@/components/context/userContext";

const Navbar = () => {
    const [aboutToggled, setAboutToggled] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);

    return (
        <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0" }}
            onAnimationComplete={() => setAnimationDone(true)}
        >
            <div
                className={`sticky top-0 left-0 right-0 h-12 md:h-[4.5rem] bg-darkpurple-600/50 flex flex-row items-center justify-between px-20 toggle-shadow transition-all duration-500 z-50 overflow-hidden ${
                    animationDone
                        ? "backdrop-blur-[10px]"
                        : "backdrop-blur-none"
                }`}
            >
                {animationDone && (
                    <motion.div
                        className="absolute top-0 w-full h-full pointer-events-none blur-[200px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.35 }}
                        transition={{ duration: 5, type: "spring" }}
                    >
                        <Image
                            src="blob-yellow.svg"
                            alt="background-blob"
                            width={510}
                            height={510}
                            className="absolute bottom-0 left-[-11%]"
                        />
                    </motion.div>
                )}

                <motion.div
                    layout
                    className="flex flex-row items-center justify-center"
                >
                    <Link href="/">
                        <AptableLogo width={150} height={75} />
                    </Link>
                </motion.div>
                <motion.div layout>
                    <SearchBar
                        placeholder={"Search courses"}
                        className="2xl:absolute 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2 md:w-1/4 lg:w-96 2xl:w-1/5 hidden md:flex"
                    />
                </motion.div>
                <motion.div
                    layout
                    className="flex flex-row items-center justify-center gap-4"
                >
                    <div
                        onMouseEnter={() => setAboutToggled(true)}
                        onMouseLeave={() => setAboutToggled(false)}
                    >
                        <DropdownMenu
                            onOpenChange={setAboutToggled}
                            modal={false}
                            open={aboutToggled}
                        >
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="default"
                                    className={`${
                                        aboutToggled
                                            ? "bg-white/25 pointer-events-none"
                                            : ""
                                    }`}
                                >
                                    <span>About us</span>
                                    <ChevronDown
                                        strokeWidth={3}
                                        className={`transition-all duration-200 ease-in-out ${
                                            aboutToggled ? "rotate-180" : ""
                                        }`}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                onCloseAutoFocus={(event) =>
                                    event.preventDefault()
                                }
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
                                    <DropdownMenuItem>Wiki</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <motion.div layout className="mr-2">
                        <AuthButton />
                    </motion.div>

                    <motion.div layout>
                        <GetStartedButton />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Navbar;
