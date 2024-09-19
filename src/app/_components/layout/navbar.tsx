"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";

import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";
import classNames from "classnames";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import Link from "next/link";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");

    const isInPrimaryPage = pathnames.length === 2;
    const isInSecondaryPage = pathnames.length === 3;
    const isSignPages =
        isInPrimaryPage && (pathnames[1] === "sign-in" || pathnames[1] === "sign-up");

    return (
        <div className="navbar sticky top-0 text-base-content">
            <div className="flex navbar-start">
                <div className="text-xl font-bold xl:hidden">
                    {isSignPages && (
                        <a href="/" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                            <Image
                                src="/icon-192x192.png"
                                alt="necroloto-logo"
                                width="36"
                                height="36"
                            />
                            <div className="font-title inline-flex text-lg md:text-2xl">
                                Necroloto
                            </div>
                        </a>
                    )}
                    {isInPrimaryPage && pathnames[1] === "home" && "Accueil"}
                    {isInPrimaryPage && pathnames[1] === "bets" && "Paris"}
                    {isInPrimaryPage && pathnames[1] === "celebrities" && "Célébrités"}
                    {isInPrimaryPage && pathnames[1] === "rank" && "Classement"}
                    {isInPrimaryPage && pathnames[1] === "settings" && "Paramètres"}
                    {isInSecondaryPage && (
                        <button className="btn btn-circle btn-sm" onClick={() => router.back()}>
                            <ArrowLeftLineIcon className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <div className="flex-1 md:gap-1 lg:gap-2 hidden xl:flex">
                    <Link href="/home" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                        <Image
                            src="/icon-192x192.png"
                            alt="necroloto-logo"
                            width="40"
                            height="40"
                        />
                        <div className="font-title inline-flex text-lg md:text-2xl">Necroloto</div>
                    </Link>
                </div>
            </div>

            <div className="navbar-center hidden xl:flex">
                <SignedIn>
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <li>
                            <Link
                                href="/home"
                                className={classNames("text-base-content", {
                                    active: pathname === "/home"
                                })}
                            >
                                <HomeIcon className="h-6 w-6" />
                                <span className="btm-nav-label text-xs">Accueil</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/rank"
                                className={classNames("text-base-content", {
                                    active: pathname === "/rank"
                                })}
                            >
                                <RankingIcon className="h-6 w-6" />
                                <span className="btm-nav-label text-xs">Classement</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/bets"
                                className={classNames("text-base-content", {
                                    active: pathname.split("/")[2] === "bets"
                                })}
                            >
                                <NoteListIcon className="h-6 w-6" />
                                <span className="btm-nav-label text-xs">Pari</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/celebrities"
                                className={classNames("text-base-content", {
                                    active: pathname.split("/")[2] === "celebrities"
                                })}
                            >
                                <PeopleIcon className="h-6 w-6" />
                                <span className="btm-nav-label text-xs">Célébrités</span>
                            </Link>
                        </li>
                    </ul>
                </SignedIn>
            </div>

            <div className="navbar-end">
                <div className="flex-none items-center block mx-2">
                    <UserButton
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
