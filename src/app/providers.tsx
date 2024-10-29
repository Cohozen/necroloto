"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <ClerkProvider afterSignOutUrl="/" localization={frFR}>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </ClerkProvider>
    );
}
