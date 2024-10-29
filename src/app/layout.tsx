import React from "react";

import { Providers } from "./providers";

import "./globals.css";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application.",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["necroloto", "loto", "game"],
    authors: [{ name: "LE GAL Corentin" }],
    icons: [
        { rel: "apple-touch-icon", url: "/icon-192x192.png" },
        { rel: "icon", url: "/icon-192x192.png" }
    ]
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="antialiased bg-background">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
