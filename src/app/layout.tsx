import React from "react";

import { Analytics } from "@vercel/analytics/react";

import ToggleTheme from "@/components/layout/toggleTheme";

import "./globals.css";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" data-theme="halloween" className="h-full bg-base-100">
            {/*<ClerkProvider>*/}
            <body className="h-full">
                <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
                    <div className="navbar w-full ">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="main-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-6 h-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>

                        <div className="flex flex-1 md:gap-1 lg:gap-2"></div>

                        <div className="flex-0">
                            <ToggleTheme />
                        </div>
                    </div>
                </div>

                {children}

                <Analytics />
            </body>
            {/*</ClerkProvider>*/}
        </html>
    );
}
