"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import ToggleTheme from "@/components/layout/toggleTheme";

export default function Navbar() {
    const { isLoaded } = useAuth();

    return (
        <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
            <div className="navbar w-full ">
                <div className="flex-none lg:hidden">
                    <label htmlFor="main-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-6 h-6 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className="flex flex-1 md:gap-1 lg:gap-2">

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
