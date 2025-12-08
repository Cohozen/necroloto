"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import { PeopleIcon } from "@/ui/icons/PeopleIcon";
import { Tabs, Tab, Avatar } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { LinkCircleIcon } from "@/ui/icons/LinkCircleIcon";

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useUser();

    const pathnames = pathname.split("/");

    const isInSecondaryPage = pathnames.length === 3;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe">
            <Tabs
                color="default"
                variant="underlined"
                selectedKey={pathnames[1]}
                fullWidth
                classNames={{
                    base: "bg-default-100/50 border-small border-default-200/20 shadow-medium backdrop-blur-md backdrop-saturate-150",
                    tabList: "rounded-none h-16 p-0",
                    cursor: "w-full bg-primary top-0",
                    tab: "h-full",
                    tabContent: "group-data-[selected=true]:text-primary text-xs"
                }}
            >
                <Tab
                    key="overview"
                    href="/overview"
                    title={
                        <div className="flex flex-col items-center gap-1">
                            <HomeIcon className="w-5 h-5" />
                            <span>Necroloto</span>
                        </div>
                    }
                />
                <Tab
                    key="circles"
                    href="/circles"
                    title={
                        <div className="flex flex-col items-center gap-1">
                            <LinkCircleIcon className="w-5 h-5" />
                            <span>Cercles</span>
                        </div>
                    }
                />
                <Tab
                    key="celebrities"
                    href="/celebrities"
                    title={
                        <div className="flex flex-col items-center gap-1">
                            <PeopleIcon className="w-5 h-5" />
                            <span>Célébrités</span>
                        </div>
                    }
                />
                <Tab
                    key="profile"
                    href="/profile"
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <Avatar
                                isBordered={pathname === "/profile"}
                                color={pathname === "/profile" ? "primary" : "default"}
                                className="transition-transform"
                                src={user?.imageUrl ?? ""}
                                classNames={{
                                    base: "w-5 h-5"
                                }}
                            />
                            <span>Profil</span>
                        </div>
                    }
                />
            </Tabs>
        </div>
    );
}
