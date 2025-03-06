import type { Metadata } from "next";
import { Sora, Aleo } from "next/font/google";
import "./globals.css";

const soraSans = Sora({
  variable: "--font-sora-sans",
  subsets: ["latin"],
})

const aleoMono = Aleo({
  variable: "--font-aleo-mono",
  subsets: ["latin"]
})

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
        className={`${soraSans.variable} ${aleoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
