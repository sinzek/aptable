import type { Metadata } from "next";
import { Sora, Aleo } from "next/font/google";
import "@/app/globals.css";
import BackgroundManager from "@/components/context/backgroundManager";
import { UserProvider } from "@/components/context/userContext";

const soraSans = Sora({
    // headings, logo, titles, buttons
    variable: "--font-sora-sans",
    subsets: ["latin"],
});

const aleoMono = Aleo({
    // body text, supporting text, info text, etc
    variable: "--font-aleo-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "aptable",
    description: "*slurs*",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${soraSans.variable} ${aleoMono.variable} antialiased bg-darkpurple-800`}
            >
                <BackgroundManager>
                    <UserProvider>{children}</UserProvider>
                </BackgroundManager>
            </body>
        </html>
    );
}
