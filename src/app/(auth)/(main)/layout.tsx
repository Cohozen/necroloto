import React from "react";
import Navbar from "@/components/layout/navbar";

export default async function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="relative">
                <div className="lg:px-10 lg:pt-7">{children}</div>
            </div>
        </>
    );
}
