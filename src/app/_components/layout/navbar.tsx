"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "vaul";

import {
    Navbar as NextNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Listbox,
    ListboxItem,
    Spacer
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
import { AppIcon } from "@/ui/icons/AppIcon";

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");

    const isInPrimaryPage = pathnames.length === 2;
    const isInSecondaryPage = pathnames.length === 3;
    const isSignPages =
        isInPrimaryPage && (pathnames[1] === "sign-in" || pathnames[1] === "sign-up");

    return (
        <NextNavbar isBlurred={false} className="bg-transparent py-4" height="54px">
            <NavbarContent
                justify="start"
                className="gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
            >
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
                <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border mr-2 md:w-auto md:max-w-fit"></div>
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
                        <div className="flex flex-col bg-background rounded-2xl w-72 grow mt-2 mr-2 mb-2 p-6">
                            <div className="flex items-center gap-2 px-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                                    <AppIcon className="h-7 w-7" />
                                </div>
                                <span className="text-base font-bold uppercase leading-6 text-foreground">
                                    Necroloto
                                </span>
                            </div>

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
                                <UserButton />
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </NextNavbar>
    );

    // return (
    //     <div className="bg-base-300 navbar sticky top-0 text-base-content">
    //         <div className="flex navbar-start">
    //             <div className="text-xl font-bold xl:hidden">
    //                 {isSignPages && (
    //                     <a href="/" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
    //                         <Image
    //                             src="/icon-192x192.png"
    //                             alt="necroloto-logo"
    //                             width="36"
    //                             height="36"
    //                         />
    //                         <div className="font-title inline-flex text-lg md:text-2xl">
    //                             Necroloto
    //                         </div>
    //                     </a>
    //                 )}
    //                 {isInPrimaryPage && pathnames[1] === "home" && "Accueil"}
    //                 {isInPrimaryPage && pathnames[1] === "bets" && "Paris"}
    //                 {isInPrimaryPage && pathnames[1] === "celebrities" && "Célébrités"}
    //                 {isInPrimaryPage && pathnames[1] === "rank" && "Classement"}
    //                 {isInPrimaryPage && pathnames[1] === "settings" && "Paramètres"}
    //                 {isInSecondaryPage && (
    //                     <button className="btn btn-circle btn-sm" onClick={() => router.back()}>
    //                         <ArrowLeftLineIcon className="h-4 w-4" />
    //                     </button>
    //                 )}
    //             </div>
    //             <div className="flex-1 md:gap-1 lg:gap-2 hidden xl:flex">
    //                 <Link href="/home" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
    //                     <Image
    //                         src="/icon-192x192.png"
    //                         alt="necroloto-logo"
    //                         width="40"
    //                         height="40"
    //                     />
    //                     <div className="font-title inline-flex text-lg md:text-2xl">Necroloto</div>
    //                 </Link>
    //             </div>
    //         </div>
    //
    //         <div className="navbar-center hidden xl:flex">
    //             <SignedIn>
    //                 <ul className="menu menu-horizontal px-1 gap-2">
    //                     <li>
    //                         <Link
    //                             href="/home"
    //                             className={classNames("text-base-content", {
    //                                 active: pathname === "/home"
    //                             })}
    //                         >
    //                             <HomeIcon className="h-6 w-6" />
    //                             <span className="btm-nav-label text-xs">Accueil</span>
    //                         </Link>
    //                     </li>
    //                     <li>
    //                         <Link
    //                             href="/rank"
    //                             className={classNames("text-base-content", {
    //                                 active: pathname === "/rank"
    //                             })}
    //                         >
    //                             <RankingIcon className="h-6 w-6" />
    //                             <span className="btm-nav-label text-xs">Classement</span>
    //                         </Link>
    //                     </li>
    //                     <li>
    //                         <Link
    //                             href="/bets"
    //                             className={classNames("text-base-content", {
    //                                 active: pathname.split("/")[2] === "bets"
    //                             })}
    //                         >
    //                             <NoteListIcon className="h-6 w-6" />
    //                             <span className="btm-nav-label text-xs">Pari</span>
    //                         </Link>
    //                     </li>
    //                     <li>
    //                         <Link
    //                             href="/celebrities"
    //                             className={classNames("text-base-content", {
    //                                 active: pathname.split("/")[2] === "celebrities"
    //                             })}
    //                         >
    //                             <PeopleIcon className="h-6 w-6" />
    //                             <span className="btm-nav-label text-xs">Célébrités</span>
    //                         </Link>
    //                     </li>
    //                 </ul>
    //             </SignedIn>
    //         </div>
    //
    //         <div className="navbar-end">
    //             <div className="flex-none items-center block mx-2">
    //                 <UserButton
    //                     appearance={{
    //                         elements: {
    //                             userButtonPopoverCard: "bg-base-100",
    //                             userPreviewMainIdentifier: "text-base-content",
    //                             userPreviewSecondaryIdentifier: "text-base-content",
    //                             userButtonPopoverActionButtonText: "text-base-content",
    //                             userButtonPopoverActionButtonIcon: "text-base-content"
    //                         }
    //                     }}
    //                 />
    //             </div>
    //             <div className="hidden lg:flex">
    //                 <ToggleTheme />
    //             </div>
    //         </div>
    //     </div>
    // );
}
