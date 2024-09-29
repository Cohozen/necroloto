"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "vaul";

import { SignedIn } from "@clerk/nextjs";
import {
    Navbar as NextNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Listbox,
    ListboxItem
} from "@nextui-org/react";

import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";
import classNames from "classnames";
import { HomeIcon } from "@/ui/icons/HomeIcon";
// import Link from "next/link";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { NoteListIcon } from "@/ui/icons/NoteListIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";
import Image from "next/image";
import { HamburgerMenuIcon } from "@/ui/icons/HamburgerMenuIcon";

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");

    const isInPrimaryPage = pathnames.length === 2;
    const isInSecondaryPage = pathnames.length === 3;
    const isSignPages =
        isInPrimaryPage && (pathnames[1] === "sign-in" || pathnames[1] === "sign-up");

    console.log(pathnames);

    return (
        <NextNavbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">Necroloto</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        aria-label="Open mobile menu"
                        onClick={() => setOpen(true)}
                    >
                        <HamburgerMenuIcon className="h-6 w-6" />
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
                    <Drawer.Content className="right-0 top-0 bottom-0 fixed z-50 flex outline-none">
                        <div className="bg-background rounded-2xl w-[310px] grow mt-2 mr-2 mb-2 p-5 flex flex-col justify-between">
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
                                    Paris
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

                            <div className="flex flex-row justify-between">
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
