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

    const isInSecondaryPage = pathnames.length === 3;

    return (
        !isInSecondaryPage && (
            <div className="sticky bottom-0 btm-nav bg-base-300 xl:hidden">
                <Link
                    href="/home"
                    className={classNames({
                        "border-t-2": pathname === "/home"
                    })}
                >
                    <HomeIcon
                        className={classNames("h-6 w-6 ease-in duration-300", {
                            "text-accent transition-transform scale-125": pathname === "/home",
                            "transition-transform scale-100 ": pathname !== "/home"
                        })}
                    />
                    <span className="btm-nav-label text-xs">Accueil</span>
                </Link>
                <Link
                    href="/rank"
                    className={classNames({
                        "border-t-2": pathname === "/rank"
                    })}
                >
                    <RankingIcon
                        className={classNames("h-6 w-6 ease-in duration-300", {
                            "text-accent transition-transform scale-125": pathname === "/rank",
                            "transition-transform scale-100 ": pathname !== "/rank"
                        })}
                    />
                    <span className="btm-nav-label text-xs">Classement</span>
                </Link>
                <Link
                    href="/bets"
                    className={classNames({
                        "border-t-2": pathname === "/bets"
                    })}
                >
                    <NoteListIcon
                        className={classNames("h-6 w-6 ease-in duration-300", {
                            "text-accent transition-transform scale-125": pathname === "/bets",
                            "transition-transform scale-100 ": pathname !== "/bets"
                        })}
                    />
                    <span className="btm-nav-label text-xs">Pari</span>
                </Link>
                <Link
                    href="/celebrities"
                    className={classNames({
                        "border-t-2": pathname === "/celebrities"
                    })}
                >
                    <PeopleIcon
                        className={classNames("h-6 w-6 ease-in duration-300", {
                            "text-accent transition-transform scale-125":
                                pathname === "/celebrities",
                            "transition-transform scale-100 ": pathname !== "/celebrities"
                        })}
                    />
                    <span className="btm-nav-label text-xs">Célébrités</span>
                </Link>
                <Link
                    href="/settings"
                    className={classNames({
                        "border-t-2": pathname === "/settings"
                    })}
                >
                    <SettingsIcon
                        className={classNames("h-6 w-6 ease-in duration-300", {
                            "text-accent transition-transform scale-125": pathname === "/settings",
                            "transition-transform scale-100 ": pathname !== "/settings"
                        })}
                    />
                    <span className="btm-nav-label text-xs">Paramètres</span>
                </Link>
            </div>
        )
    );
}
