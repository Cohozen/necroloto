"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="bg-primary sticky top-0 z-30 bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm rounded-[100%/0%_0%_100%_100%]">
            <div className="text-primary-content flex h-16 w-full justify-center ">
                <div className="navbar w-full">
                    <div className="flex flex-1 md:gap-1 lg:gap-2">
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

                    <div className="flex-0">
                        <div className="flex-none items-center block mx-2">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        <ToggleTheme />
                    </div>
                </div>
            </div>
            <div className="h-4 w-full" />
        </div>
    );
}
