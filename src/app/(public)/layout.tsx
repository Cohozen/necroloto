import React from "react";

import { Analytics } from "@vercel/analytics/react";
import { Providers } from "../providers";

import "../globals.css";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application.",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["necroloto", "loto", "game"],
    themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
    authors: [{ name: "LE GAL Corentin" }],
    icons: [
        { rel: "apple-touch-icon", url: "/icon-192x192.png" },
        { rel: "icon", url: "/icon-192x192.png" }
    ]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();
    if (user) redirect("/home");

    return (
        <html lang="fr">
            <body className="antialiased bg-background">
                <Providers>
                    {children}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
