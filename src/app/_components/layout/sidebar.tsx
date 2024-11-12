"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import NextImage from "next/image";
import React from "react";
import ToggleTheme from "@/components/layout/toggleTheme";
import { Avatar, Image, Link, Listbox, ListboxItem, Spacer } from "@nextui-org/react";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import classNames from "classnames";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";

export default function Sidebar() {
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const pathnames = pathname.split("/");

    return (
        <nav className="fixed lg:flex flex-col pt-5 pb-4 bg-default-50 top-0 h-screen hidden w-[280px]">
            <div className="flex items-center px-4">
                <div className="flex items-center gap-2">
                    <Image
                        as={NextImage}
                        src="/logo.jpeg"
                        width={52}
                        height={38}
                        alt="Necroloto logo"
                    />
                    <span className="text-base font-bold uppercase leading-6 text-foreground">
                        Necroloto
                    </span>
                </div>
            </div>

            <Spacer y={8} />

            <Listbox
                variant="bordered"
                selectionMode="single"
                selectedKeys={[pathnames[1]]}
                className="px-2"
            >
                <ListboxItem
                    key="home"
                    href="/home"
                    startContent={<HomeIcon className="w-5 h-5" />}
                    className={classNames({
                        "bg-default-200": pathname === "/home"
                    })}
                >
                    Accueil
                </ListboxItem>
                <ListboxItem
                    key="rank"
                    href="/rank"
                    startContent={<RankingIcon className="w-5 h-5" />}
                    className={classNames({
                        "bg-default-200": pathname === "/rank"
                    })}
                >
                    Classement
                </ListboxItem>
                <ListboxItem
                    key="bets"
                    href="/bets"
                    startContent={<NoteListIcon className="w-5 h-5" />}
                    className={classNames({
                        "bg-default-200": pathname === "/bets"
                    })}
                >
                    Prédictions
                </ListboxItem>
                <ListboxItem
                    key="celebrities"
                    href="/celebrities"
                    startContent={<PeopleIcon className="w-5 h-5" />}
                    className={classNames({
                        "bg-default-200": pathname === "/celebrities"
                    })}
                >
                    Célébrités
                </ListboxItem>
            </Listbox>

            <Spacer y={8} />

            <div className="mt-auto flex flex-row justify-between px-4">
                <ToggleTheme />
                <Avatar
                    isBordered={pathname === "/profile"}
                    color={pathname === "/profile" ? "primary" : "default"}
                    as={Link}
                    className="transition-transform"
                    src={user?.imageUrl ?? ""}
                    href="/profile"
                />
            </div>
        </nav>
    );
}
