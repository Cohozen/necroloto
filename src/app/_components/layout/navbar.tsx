"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "vaul";

import {
    Navbar as NextNavbar,
    NavbarContent,
    NavbarItem,
    Button,
    Listbox,
    ListboxItem,
    Spacer,
    Avatar,
    Link
} from "@nextui-org/react";

import ToggleTheme from "@/components/layout/toggleTheme";
import React, { useState } from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";
import classNames from "classnames";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";
import { HamburgerMenuIcon } from "@/ui/icons/HamburgerMenuIcon";
import { AppIcon } from "@/ui/icons/AppIcon";
import { CrossLineIcon } from "@/ui/icons/CrossLineIcon";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const { user } = useUser();

    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");

    const isInPrimaryPage = pathnames.length === 2;
    const isInSecondaryPage = pathnames.length === 3;
    const isSignPages =
        isInPrimaryPage && (pathnames[1] === "sign-in" || pathnames[1] === "sign-up");

    return (
        <NextNavbar isBlurred={false} className="bg-transparent py-4 lg:hidden" height="54px">
            <NavbarContent className="gap-4 rounded-full !justify-between border-small border-default-200/20 bg-background/60 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                <NavbarItem>
                    {isInPrimaryPage && (
                        <Button
                            color="default"
                            variant="flat"
                            radius="full"
                            startContent={<HomeIcon className="h-5 w-5" />}
                            onPress={(e) => router.push("/home")}
                            isDisabled={pathnames[1] === "home"}
                        >
                            Accueil
                        </Button>
                    )}

                    {isInSecondaryPage && (
                        <Button
                            color="default"
                            variant="flat"
                            radius="full"
                            startContent={<ArrowLeftLineIcon className="h-5 w-5" />}
                            onPress={(e) => router.back()}
                        >
                            Retour
                        </Button>
                    )}
                </NavbarItem>
                <Button
                    isIconOnly
                    color="default"
                    variant="light"
                    aria-label="Open mobile menu"
                    radius="full"
                    onClick={() => setOpen(true)}
                >
                    <HamburgerMenuIcon className="h-6 w-6" />
                </Button>
            </NavbarContent>

            <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
                    <Drawer.Content className="right-0 top-0 bottom-0 fixed z-50 flex outline-none">
                        <div className="flex flex-col bg-background rounded-l-2xl w-72 grow p-6">
                            <Drawer.Title className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                                        <AppIcon className="h-7 w-7" />
                                    </div>
                                    <span className="text-base font-bold uppercase leading-6 text-foreground">
                                        Necroloto
                                    </span>
                                </div>

                                <Button
                                    isIconOnly
                                    color="default"
                                    variant="light"
                                    size="sm"
                                    onClick={() => setOpen(false)}
                                >
                                    <CrossLineIcon className="h-7 w-7" />
                                </Button>
                            </Drawer.Title>

                            <Spacer y={8} />

                            <Listbox
                                variant="bordered"
                                selectionMode="single"
                                selectedKeys={[pathnames[1]]}
                                onAction={() => setOpen(false)}
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

                            <div className="mt-auto flex flex-row justify-between">
                                <ToggleTheme />
                                <Avatar
                                    isBordered={pathname === "/profile"}
                                    color={pathname === "/profile" ? "primary" : "default"}
                                    as={Link}
                                    className="transition-transform"
                                    src={user?.imageUrl ?? ""}
                                    href="/profile"
                                    onPress={() => setOpen(false)}
                                />
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </NextNavbar>
    );
}
