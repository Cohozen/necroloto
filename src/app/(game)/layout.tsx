import React from "react";

import { SignedIn } from "@clerk/nextjs";

import Navbar from "@/components/layout/navbar";

export const metadata = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#202124" }]
};

export default async function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SignedIn>
                <Navbar />
            </SignedIn>
            <main>{children}</main>
        </>
    );
}
