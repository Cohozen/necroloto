import React from "react";

import { SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomNav";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            {/*Desktop layout*/}
            <div className="mb-auto hidden lg:flex">
                <div className="drawer lg:drawer-open">
                    <input id="main-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <Navbar />
                        {/* Page content here */}
                        <div className="px-6">{children}</div>
                    </div>
                    <Sidebar />
                </div>
            </div>

            {/*Mobile layout*/}
            <div className="flex flex-col justify-start lg:hidden h-full">
                <Navbar />

                {children}

                <BottomNav />
            </div>
        </>
    );
}
