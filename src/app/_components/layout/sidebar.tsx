"use client";

import { useUser } from "@clerk/nextjs";
import useClerkSWR from "@/utils/hooks/useClerkSWR";
import { useCallback } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();

    const { data: userBet, isLoading } = useClerkSWR(`/api/users/${user?.externalId}/bet`);

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
    }, [userBet]);

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
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
