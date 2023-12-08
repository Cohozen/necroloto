import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider, currentUser } from "@clerk/nextjs";

import Navbar from "@/game/components/layout/navbar";
import Sidebar from "@/game/components/layout/sidebar";

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
        <html lang="fr" data-theme="halloween" className="h-full bg-base-100">
            <ClerkProvider>
                {/*<SWRProvider>*/}
                <body className="h-full">
                    <div className="drawer lg:drawer-open">
                        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col">
                            {/* Navbar */}
                            <Navbar />
                            {/* Page content here */}
                            {children}
                        </div>
                        <Sidebar isAdmin={isAdmin()} />
                    </div>
                    <Analytics />
                </body>
                {/*</SWRProvider>*/}
            </ClerkProvider>
        </html>
    );
}
