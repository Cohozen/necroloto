import React from "react";

import { SignedIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomNav";

export const viewport = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#202124" }]
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:gap-4">
            <SignedIn>
                <Navbar />
                {/*<Sidebar />*/}
                <BottomNav />
            </SignedIn>
            <main className="lg:max-w-[700px] xl:max-w-[1024px] w-full lg:mx-auto lg:py-4 pb-14">
                {children}
            </main>
        </div>
    );
}
