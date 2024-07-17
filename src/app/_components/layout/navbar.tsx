"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");

    const isInHomePage = pathnames.length === 2;
    const isInPrimaryPage = pathnames.length === 3;
    const isInSecondaryPage = pathnames.length === 4;

    return (
        <div className="navbar sticky top-0 text-base-content ">
            <div className="flex navbar-start">
                <div className="text-xl font-bold">
                    {isInHomePage && "Accueil"}
                    {isInPrimaryPage && pathnames[2] === "bets" && "Paris"}
                    {isInPrimaryPage && pathnames[2] === "celebrities" && "Célébrités"}
                    {isInPrimaryPage && pathnames[2] === "rank" && "Classement"}
                    {isInPrimaryPage && pathnames[2] === "settings" && "Paramètres"}
                    {isInSecondaryPage && (
                        <button className="btn btn-circle btn-sm" onClick={() => router.back()}>
                            <ArrowLeftLineIcon className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/*<div className="text-sm breadcrumbs px-2">*/}
                {/*    <ul>*/}
                {/*        {pathname.split("/").map((route, index) => {*/}
                {/*            const isLastRoute = pathname.split("/").length === index + 1;*/}
                {/*            const href = pathname*/}
                {/*                .split("/")*/}
                {/*                .slice(0, index + 1)*/}
                {/*                .join("/");*/}

                {/*            return (*/}
                {/*                <li key={`breadcrumb-${route}`}>*/}
                {/*                    {!route && <a href="/game">Home</a>}*/}
                {/*                    {(route && !isLastRoute && <a href={href}>{route}</a>) || route}*/}
                {/*                </li>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>

            {/*<div className="flex navbar-center">*/}

            {/*</div>*/}

            <div className="navbar-end">
                <div className="flex-none items-center block mx-2">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonPopoverCard: "bg-base-100",
                                userPreviewMainIdentifier: "text-base-content",
                                userPreviewSecondaryIdentifier: "text-base-content",
                                userButtonPopoverActionButtonText: "text-base-content",
                                userButtonPopoverActionButtonIcon: "text-base-content"
                            }
                        }}
                    />
                </div>
                <div className="hidden lg:flex">
                    <ToggleTheme />
                </div>
            </div>
        </div>
    );
}
