import React from "react";

import { SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

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
            <div className="drawer lg:drawer-open">
                <input id="main-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <Navbar />
                    {/* Page content here */}
                    {children}
                </div>
                <Sidebar />
            </div>
        </>
    );
}
