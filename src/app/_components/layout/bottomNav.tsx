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
import { User } from "@prisma/client";
import { Tabs, Tab } from "@nextui-org/react";
import UserAvatar from "@/components/business/user/UserAvatar";

interface BottomNavProps {
    user: User;
}

export default function BottomNav({ user }: BottomNavProps) {
    const pathname = usePathname();

    const pathnames = pathname.split("/");

    const isInSecondaryPage = pathnames.length === 3;

    return (
        <div className="flex w-full flex-col px-2 sticky bottom-0">
            <Tabs aria-label="Options" color="success" variant="bordered">
                <Tab
                    key="photos"
                    title={
                        <div className="flex items-center space-x-2">
                            <HomeIcon className="w-4 h-4" />
                            <span>Photos</span>
                        </div>
                    }
                />
                <Tab
                    key="music"
                    title={
                        <div className="flex items-center space-x-2">
                            <RankingIcon className="w-4 h-4"/>
                            <span>Music</span>
                        </div>
                    }
                />
                <Tab
                    key="videos"
                    title={
                        <div className="flex items-center space-x-2">
                            <PeopleIcon className="w-4 h-4"/>
                            <span>Videos</span>
                        </div>
                    }
                />
            </Tabs>
        </div>
    );

    // return (
    //     !isInSecondaryPage && (
    //         <div className="sticky bottom-0 btm-nav h-14 bg-base-300 rounded-t-2xl xl:hidden">
    //             <Link
    //                 href="/home"
    //                 className={classNames({
    //                     "text-accent": pathname === "/home"
    //                 })}
    //             >
    //                 <HomeIcon
    //                     className={classNames("h-6 w-6", {
    //                         // "text-accent transition-transform scale-125": pathname === "/home",
    //                         // "transition-transform scale-100 ": pathname !== "/home"
    //                     })}
    //                 />
    //                 <span className="text-xs">Accueil</span>
    //             </Link>
    //             <Link
    //                 href="/rank"
    //                 className={classNames({
    //                     "text-accent": pathname === "/rank"
    //                 })}
    //             >
    //                 <RankingIcon
    //                     className={classNames("h-6 w-6", {
    //                         // "text-accent transition-transform scale-125": pathname === "/rank",
    //                         // "transition-transform scale-100 ": pathname !== "/rank"
    //                     })}
    //                 />
    //                 <span className="text-xs">Classement</span>
    //             </Link>
    //             {/*<Link*/}
    //             {/*    href="/bets"*/}
    //             {/*    className={classNames({*/}
    //             {/*        "text-accent": pathname === "/bets"*/}
    //             {/*    })}*/}
    //             {/*>*/}
    //             {/*    <NoteListIcon*/}
    //             {/*        className={classNames("h-6 w-6", {*/}
    //             {/*            // "text-accent transition-transform scale-125": pathname === "/bets",*/}
    //             {/*            // "transition-transform scale-100 ": pathname !== "/bets"*/}
    //             {/*        })}*/}
    //             {/*    />*/}
    //             {/*    <span className="text-xs">Pari</span>*/}
    //             {/*</Link>*/}
    //             <Link
    //                 href="/celebrities"
    //                 className={classNames({
    //                     "text-accent": pathname === "/celebrities"
    //                 })}
    //             >
    //                 <PeopleIcon
    //                     className={classNames("h-6 w-6", {
    //                         // "text-accent transition-transform scale-125":
    //                         //   pathname === "/celebrities",
    //                         //"transition-transform scale-100 ": pathname !== "/celebrities"
    //                     })}
    //                 />
    //                 <span className="text-xs">Célébrités</span>
    //             </Link>
    //             <Link
    //                 href="/profile"
    //                 className={classNames({
    //                     "text-accent": pathname === "/profile"
    //                 })}
    //             >
    //                 {/*<SettingsIcon*/}
    //                 {/*    className={classNames("h-5 w-5 ease-in duration-300", {*/}
    //                 {/*        "text-accent transition-transform scale-125": pathname === "/settings",*/}
    //                 {/*        "transition-transform scale-100 ": pathname !== "/settings"*/}
    //                 {/*    })}*/}
    //                 {/*/>*/}
    //                 <UserAvatar user={user} size="w-6" active={pathname === "/profile"} />
    //                 <span className="text-xs">Profil</span>
    //             </Link>
    //         </div>
    //     )
    // );
}
