import React from "react";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";
import BottomNav from "@/components/layout/bottomNav";

import { frFR } from "@clerk/localizations";

import "../globals.css";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application.",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["necroloto", "loto", "game"],
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
    authors: [{ name: "LE GAL Corentin" }],
    icons: [
        { rel: "apple-touch-icon", url: "/icon-192x192.png" },
        { rel: "icon", url: "/icon-192x192.png" }
    ]
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className="bg-base-100">
            <body className="flex flex-col h-screen">
                <ClerkProvider afterSignOutUrl="/" localization={frFR}>
                    <Navbar />

                    {children}

                    <SignedIn>
                        <BottomNav />
                    </SignedIn>
                </ClerkProvider>
            </body>
        </html>
    );
}
