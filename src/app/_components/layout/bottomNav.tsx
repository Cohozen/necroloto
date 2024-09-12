"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";

export default function BottomNav() {
    const pathname = usePathname();

    const pathnames = pathname.split("/");

    const isInSecondaryPage = pathnames.length === 4;

    return (
        !isInSecondaryPage && (
            <div className="sticky bottom-0 btm-nav bg-base-300 xl:hidden">
                <Link
                    href="/home"
                    className={classNames("text-base-content", {
                        active: pathname === "/home"
                    })}
                >
                    <HomeIcon className="h-6 w-6" />
                    <span className="btm-nav-label text-xs">Accueil</span>
                </Link>
                <Link
                    href="/rank"
                    className={classNames("text-base-content", {
                        active: pathname === "/rank"
                    })}
                >
                    <RankingIcon className="h-6 w-6" />
                    <span className="btm-nav-label text-xs">Classement</span>
                </Link>
                <Link
                    href="/bets"
                    className={classNames("text-secondary", {
                        active: pathname.split("/")[2] === "bets"
                    })}
                >
                    <NoteListIcon className="h-6 w-6" />
                    <span className="btm-nav-label text-xs">Pari</span>
                </Link>
                <Link
                    href="/celebrities"
                    className={classNames("text-base-content", {
                        active: pathname.split("/")[2] === "celebrities"
                    })}
                >
                    <PeopleIcon className="h-6 w-6" />
                    <span className="btm-nav-label text-xs">Célébrités</span>
                </Link>
                <Link
                    href="/settings"
                    className={classNames("text-base-content", {
                        active: pathname === "/settings"
                    })}
                >
                    <SettingsIcon className="h-6 w-6" />
                    <span className="btm-nav-label text-xs">Paramètres</span>
                </Link>
            </div>
        )
    );
}
