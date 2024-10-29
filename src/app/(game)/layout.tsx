import React from "react";

import { SignedIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

export const metadata = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#202124" }]
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:flex lg:flex-row lg:gap-4">
            <SignedIn>
                <Navbar />
                <Sidebar />
            </SignedIn>
            <main className="lg:max-w-[700px] xl:max-w-[1024px] lg:pl-40 w-full lg:mx-auto lg:py-16">{children}</main>
        </div>
    );
}
