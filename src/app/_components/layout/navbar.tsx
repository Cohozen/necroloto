"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="h-20 sticky top-0 z-30 bg-primary bg-opacity-90 backdrop-blur shadow-sm rounded-[100%/0%_0%_100%_100%]">
            <div className="navbar text-primary-content items-start">
                <div className="flex navbar-start">
                    {pathname !== "/game" && (
                        <button className="btn btn-circle btn-sm" onClick={() => router.back()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="m15 5l-6 7l6 7"
                                ></path>
                            </svg>
                        </button>
                    )}

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

                <div className="flex navbar-center">
                    <div className="text-2xl font-bold">
                        {pathname.split("/").length === 2 && "Home"}
                        {pathname.split("/")[2] === "bets" && "Les paris"}
                        {pathname.split("/")[2] === "celebrities" && "Les Célébrités"}
                        {pathname.split("/")[2] === "rank" && "Classement"}
                        {pathname.split("/")[2] === "settings" && "Paramètres"}
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="flex-none items-center block mx-2">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                    <div className="hidden lg:flex">
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </div>
    );
}
