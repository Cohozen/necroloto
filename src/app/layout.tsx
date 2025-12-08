import React from "react";

import { Providers } from "./providers";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter"
});

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
            <body
                className={`${inter.className} overflow-y-scroll scroll-auto antialiased bg-background`}
                suppressHydrationWarning
            >
                <div className="mx-auto max-w-screen-2xl">
                    <Providers>{children}</Providers>
                </div>
            </body>
        </html>
    );
}
