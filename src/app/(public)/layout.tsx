import React from "react";

import { Analytics } from "@vercel/analytics/react";
import { Providers } from "../providers";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="antialiased">
                <Providers>
                    {children}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}