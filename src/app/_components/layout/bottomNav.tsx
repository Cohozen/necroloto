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

    return (
        <div className="sticky bottom-0 btm-nav bg-base-300">
            <Link
                href="/game"
                className={classNames("text-base-content", {
                    active: pathname === "/game"
                })}
            >
                <HomeIcon className="h-6 w-6" />
                <span className="btm-nav-label text-xs">Accueil</span>
            </Link>
            <Link
                href="/game/rank"
                className={classNames("text-base-content", {
                    active: pathname === "/game/rank"
                })}
            >
                <RankingIcon className="h-6 w-6" />
                <span className="btm-nav-label text-xs">Classement</span>
            </Link>
            <Link
                href="/game/bets"
                className={classNames("text-secondary", {
                    active: pathname.split("/")[2] === "bets"
                })}
            >
                <NoteListIcon className="h-6 w-6" />
                <span className="btm-nav-label text-xs">Pari</span>
            </Link>
            <Link
                href="/game/celebrities"
                className={classNames("text-base-content", {
                    active: pathname.split("/")[2] === "celebrities"
                })}
            >
                <PeopleIcon className="h-6 w-6" />
                <span className="btm-nav-label text-xs">Célébrités</span>
            </Link>
            <Link
                href="/game/settings"
                className={classNames("text-base-content", {
                    active: pathname === "/game/settings"
                })}
            >
                <SettingsIcon className="h-6 w-6" />
                <span className="btm-nav-label text-xs">Paramètres</span>
            </Link>
        </div>
    );
}
