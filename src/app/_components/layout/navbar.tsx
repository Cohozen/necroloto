"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import {
    Navbar as NextNavbar,
    NavbarContent,
    NavbarItem,
    Button,
    Listbox,
    ListboxItem,
    Avatar,
    Link,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Tooltip
} from "@nextui-org/react";

import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";
import classNames from "classnames";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";
import { HamburgerMenuIcon } from "@/ui/icons/HamburgerMenuIcon";

export default function Navbar() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { user } = useUser();

    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");

    const isInPrimaryPage = pathnames.length === 2;
    const isInSecondaryPage = pathnames.length === 3;
    // const isSignPages =
    //     isInPrimaryPage && (pathnames[1] === "sign-in" || pathnames[1] === "sign-up");

    return (
        <NextNavbar isBlurred={false} className="bg-transparent py-4 lg:hidden" height="54px">
            <NavbarContent className="gap-4 rounded-full !justify-between border-small border-default-200/20 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
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
                    onPress={() => onOpen()}
                >
                    <HamburgerMenuIcon className="h-6 w-6" />
                </Button>
            </NavbarContent>

            <Drawer
                hideCloseButton
                backdrop="blur"
                isOpen={isOpen}
                size="xs"
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                        <Tooltip content="Close">
                            <Button
                                isIconOnly
                                className="text-default-400"
                                size="sm"
                                variant="light"
                                onPress={onClose}
                            >
                                <svg
                                    fill="none"
                                    height="20"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                                </svg>
                            </Button>
                        </Tooltip>
                        <div className="w-full flex justify-start items-center gap-2">
                            Necroloto
                        </div>
                    </DrawerHeader>

                    {/*<Spacer y={8} />*/}
                    <DrawerBody className="pt-16 px-2">
                        <Listbox
                            variant="bordered"
                            selectionMode="single"
                            selectedKeys={[pathnames[1]]}
                            onAction={() => onClose()}
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
                    </DrawerBody>

                    <DrawerFooter className="mt-auto flex flex-row justify-between">
                        <ToggleTheme />
                        <Avatar
                            isBordered={pathname === "/profile"}
                            color={pathname === "/profile" ? "primary" : "default"}
                            as={Link}
                            className="transition-transform"
                            src={user?.imageUrl ?? ""}
                            href="/profile"
                            onPress={() => onClose()}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </NextNavbar>
    );
}
