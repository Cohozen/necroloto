import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Nav from "./nav";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { SWRProvider } from "./swr-provider";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <SWRProvider>
                <html lang="fr" className="h-full bg-gray-50">
                    <body className="h-full">
                        <Suspense>
                            <Nav />
                        </Suspense>
                        {children}
                        <Analytics />
                    </body>
                </html>
            </SWRProvider>
        </ClerkProvider>
    );
}
