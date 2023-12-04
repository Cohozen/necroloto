import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { ClerkProvider, currentUser } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();

    const isAdmin = () => {
        if (user) {
            const roles = user.publicMetadata?.roles as string[];
            if (roles) {
                return roles.some((r) => r === "admin");
            }
        }

        return false;
    };

    return (
        <html lang="fr" className="h-full bg-gray-50">
            <ClerkProvider>
                {/*<SWRProvider>*/}
                <body className="h-full">
                    <Suspense>
                        <Navbar isAdmin={isAdmin()} />
                    </Suspense>
                    {children}
                    <Analytics />
                </body>
                {/*</SWRProvider>*/}
            </ClerkProvider>
        </html>
    );
}
