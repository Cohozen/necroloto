import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Necroloto — La compétition stratégique feutrée",
    description:
        "Formez vos cercles. Faites vos prédictions. Gravez votre nom dans l'éternité numérique."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={`dark ${inter.variable}`}>
            <body className="min-h-full flex flex-col bg-[#131318] text-[#e4e1e9]">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
