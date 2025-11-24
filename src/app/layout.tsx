import React from "react";

import { Providers } from "./providers";

import "./globals.css";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application.",
    generator: "Next.js",
    manifest: "/site.webmanifest",
    keywords: ["necroloto"],
    authors: [{ name: "LE GAL Corentin" }],
    icons: [
        { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
        { rel: "icon", url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { rel: "shortcut icon", url: "/favicon.svg", type: "image/svg+xml" }
    ]
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className="antialiased bg-background">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
