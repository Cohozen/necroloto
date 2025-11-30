"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import NextImage from "next/image";
import React from "react";
import ToggleTheme from "@/components/layout/toggleTheme";
import { Avatar, Image, Link } from "@nextui-org/react";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import classNames from "classnames";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";

const navigation = [
    { name: "Aperçu", href: "/overview", icon: HomeIcon },
    { name: "Mes Cercles", href: "/circles", icon: NoteListIcon }
] as const;

export default function Sidebar() {
    const { user } = useUser();
    const pathname = usePathname();

    const isActive = (itemHref: string) => {
        return pathname === itemHref || pathname.startsWith(itemHref);
    };

    return (
        <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-500 bg-background p-4">
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
                <nav aria-label="core navigation links" className="flex flex-1 flex-col space-y-10">
                    <ul role="list" className="space-y-0.5">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        isActive(item.href)
                                            ? "text-primary-600"
                                            : "text-default-700",
                                        "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-primary-50",
                                        "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-primary-light-500 dark:outline-primary-dark-500"
                                    )}
                                >
                                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

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
            </aside>
        </nav>
    );
}
