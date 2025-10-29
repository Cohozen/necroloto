"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
    }
}

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        // @ts-ignore
        <ClerkProvider afterSignOutUrl="/" localization={frFR}>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </ClerkProvider>
    );
}
