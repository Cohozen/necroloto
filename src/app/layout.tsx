import React from "react";

import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

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
        <html lang="fr" className="bg-base-100">
            <Head>
                <script defer data-domain="necroloto.fr" src="/js/script.js"></script>
            </Head>
            <body className="flex flex-col h-screen">
                {children}
                <Analytics />
            </body>
        </html>
    );
}
