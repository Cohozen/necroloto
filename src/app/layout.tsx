import React from "react";

import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
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
