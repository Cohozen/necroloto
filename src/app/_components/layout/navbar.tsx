"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import ToggleTheme from "@/components/layout/toggleTheme";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="bg-base-200 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
            <div className="navbar w-full">
                {/*<div className="flex-none lg:hidden">*/}
                {/*    <label htmlFor="main-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">*/}
                {/*        <svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            fill="none"*/}
                {/*            viewBox="0 0 24 24"*/}
                {/*            className="inline-block w-6 h-6 stroke-current"*/}
                {/*        >*/}
                {/*            <path*/}
                {/*                strokeLinecap="round"*/}
                {/*                strokeLinejoin="round"*/}
                {/*                strokeWidth="2"*/}
                {/*                d="M4 6h16M4 12h16M4 18h16"*/}
                {/*            ></path>*/}
                {/*        </svg>*/}
                {/*    </label>*/}
                {/*</div>*/}

                <div className="flex flex-1 md:gap-1 lg:gap-2">
                    <div className="text-sm breadcrumbs px-2">
                        <ul>
                            {pathname.split("/").map((route, index) => {
                                const isLastRoute = pathname.split("/").length === index + 1;
                                const href = pathname
                                    .split("/")
                                    .slice(0, index + 1)
                                    .join("/");

                                return (
                                    <li key={`breadcrumb-${route}`}>
                                        {!route && <a href="/game">Home</a>}
                                        {(route && !isLastRoute && <a href={href}>{route}</a>) || route}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="flex-0">
                    <div className="flex-none items-center block mx-2">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                    <ToggleTheme />
                </div>
            </div>
        </div>
    );
}
