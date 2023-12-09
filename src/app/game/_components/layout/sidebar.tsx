"use client";

import React, { useCallback } from "react";

import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import classNames from "classnames";

import useClerkSWR from "@/utils/hooks/useClerkSWR";

interface SidebarProps {
    isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
    const pathname = usePathname();
    const { user } = useUser();

    const { data: userBet } = useClerkSWR(`/api/users/${user?.externalId}/bet`);

    const navigation = useCallback(() => {
        const navigationLinks = [{ name: "Dashboard", href: "/" }];

        if (userBet) navigationLinks.push({ name: "Mon Parie", href: `/bets/${userBet._id}` });
        else
            navigationLinks.push({
                name: "Parier",
                href: "/bet"
            });

        if (isAdmin) navigationLinks.push({ name: "Administration", href: "/admin" });

        return navigationLinks;
    }, [userBet, isAdmin]);

    return (
        <div className="drawer-side">
            <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex mb-4">
                <a href="/game" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <path
                            fill="#888888"
                            d="M254.563 20.75c-42.96 0-85.918 16.387-118.688 49.156c-65.54 65.54-65.852 172.15-.313 237.688c65.54 65.54 172.15 65.226 237.688-.313c65.54-65.538 65.54-171.835 0-237.374c-32.77-32.77-75.728-49.156-118.688-49.156zm-.157 18.47a149.284 149.284 0 0 1 74.313 19.968c-13.573-3.984-26.266-2.455-34.22 5.5c-14.437 14.437-7.796 44.485 14.813 67.093c22.608 22.61 52.625 29.22 67.062 14.782c8.523-8.522 9.706-22.468 4.594-37.125c36.352 57.684 29.586 134.6-20.69 184.875c-29.158 29.16-67.353 43.773-105.56 43.813c9.436-2.3 17.762-6.732 24.436-13.406c28.885-28.886 15.64-88.954-29.594-134.19c-45.234-45.233-105.302-58.51-134.187-29.624c-4.052 4.052-7.266 8.723-9.688 13.875c3.092-33.537 17.473-66.222 43.157-91.905c29.198-29.2 67.384-43.737 105.562-43.656zM386.97 319.28c-.205.206-.39.422-.595.626c-72.78 72.78-191.252 73.155-264.03.375c-.278-.275-.54-.565-.814-.842c-11.987 9.483-18.81 20.384-18.81 32c0 36.523 67.315 66.125 151.343 66.125c84.027 0 152.093-29.6 152.093-66.125c0-11.68-6.97-22.637-19.187-32.157zm39.717 54.564c-22.225 32.29-91.192 55.906-172.625 55.906c-81.172 0-149.954-23.46-172.406-55.594c-12.638 11.3-19.72 24.052-19.72 37.563c.002 46.928 85.546 85.03 192.064 85.03c106.518 0 192.97-38.1 192.97-85.03c0-13.637-7.313-26.498-20.283-37.876z"
                        ></path>
                    </svg>
                    <div className="font-title inline-flex text-lg md:text-2xl">Necroloto</div>
                </a>
            </div>
            <ul className="menu bg-base-100 p-4 w-80 min-h-full">
                {navigation().map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className={classNames({
                                active: pathname === item.href
                            })}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
