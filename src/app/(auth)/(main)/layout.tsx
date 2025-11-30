import React from "react";

export default async function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative">
            <div className="lg:px-10 lg:pt-7">{children}</div>
        </div>
    );
}
