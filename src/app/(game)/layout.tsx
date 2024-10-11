import React from "react";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";
import BottomNav from "@/components/layout/bottomNav";
import { Providers } from "../providers";

import { frFR } from "@clerk/localizations";

import "../globals.css";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";

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
    const user = await currentUser();

    let userDb: User | null = null;

    if (user) {
        userDb = await CreateOrUpdateUserByClerkAuth(user);
    }

    return (
        <html lang="fr">
            <body className="antialiased bg-background">
                <ClerkProvider afterSignOutUrl="/" localization={frFR}>
                    <Providers>
                        <SignedIn>
                            <Navbar />
                        </SignedIn>

                        <main>{children}</main>

                        {/*<SignedIn>{userDb && <BottomNav user={userDb} />}</SignedIn>*/}
                    </Providers>
                </ClerkProvider>
            </body>
        </html>
    );
}
