import React from "react";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
    themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();
    if (user) redirect("/home");

    return (
        <div className="relative overflow-hidden h-[100dvh] light bg-background">{children}</div>
    );
}
