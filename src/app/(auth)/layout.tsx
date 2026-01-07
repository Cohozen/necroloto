import React from "react";

import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomNav";

export const viewport = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#202124" }]
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <BottomNav />
            <main className="lg:pl-72 pb-[66px]">{children}</main>
        </>
    );
}
