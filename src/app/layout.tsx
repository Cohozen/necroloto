import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className="h-full bg-gray-50">
            <ClerkProvider>
                {/*<SWRProvider>*/}
                <body className="h-full">
                    <Suspense>
                        <Navbar />
                    </Suspense>
                    {children}
                    <Analytics />
                </body>
                {/*</SWRProvider>*/}
            </ClerkProvider>
        </html>
    );
}
