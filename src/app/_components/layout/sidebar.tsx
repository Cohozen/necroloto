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
    const { user } = useUser();

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
            <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex mb-4">
                <a href="/" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <path
                            fill="currentColor"
                            d="m92.406 13.02l-.164 156.353c3.064.507 6.208 1.38 9.39 2.627c36.496 14.306 74.214 22.435 111.864 25.473l43.402-60.416l42.317 58.906c36.808-4.127 72.566-12.502 105.967-24.09c3.754-1.302 7.368-2.18 10.818-2.6l1.523-156.252l-75.82 95.552l-34.084-95.55l-53.724 103.74l-53.722-103.74l-35.442 95.55l-72.32-95.55h-.006zm164.492 156.07l-28.636 39.86l28.634 39.86l28.637-39.86l-28.635-39.86zM86.762 187.55c-2.173-.08-3.84.274-5.012.762c-2.345.977-3.173 2.19-3.496 4.196c-.645 4.01 2.825 14.35 23.03 21.36c41.7 14.468 84.262 23.748 126.778 26.833l-17.75-24.704c-38.773-3.285-77.69-11.775-115.5-26.596c-3.197-1.253-5.877-1.77-8.05-1.85zm333.275.19c-2.156.052-5.048.512-8.728 1.79c-33.582 11.65-69.487 20.215-106.523 24.646l-19.264 26.818c40.427-2.602 80.433-11.287 119.22-26.96c15.913-6.43 21.46-17.81 21.36-22.362c-.052-2.276-.278-2.566-1.753-3.274c-.738-.353-2.157-.71-4.313-.658zm-18.117 47.438c-42.5 15.87-86.26 23.856-130.262 25.117l-14.76 20.547l-14.878-20.71c-44.985-1.745-89.98-10.23-133.905-24.306c-12.78 28.51-18.94 61.14-19.603 93.44c37.52 17.497 62.135 39.817 75.556 64.63C177 417.8 179.282 443.62 174.184 467.98c7.72 5.007 16.126 9.144 24.98 12.432l5.557-47.89l18.563 2.154l-5.935 51.156c9.57 2.21 19.443 3.53 29.377 3.982v-54.67h18.69v54.49c9.903-.638 19.705-2.128 29.155-4.484l-5.857-50.474l18.564-2.155l5.436 46.852c8.747-3.422 17.004-7.643 24.506-12.69c-5.758-24.413-3.77-49.666 9.01-72.988c13.28-24.234 37.718-46 74.803-64.29c-.62-33.526-6.687-66.122-19.113-94.23zm-266.733 47.006c34.602.23 68.407 12.236 101.358 36.867c-46.604 33.147-129.794 34.372-108.29-36.755c2.315-.09 4.626-.127 6.933-.11zm242.825 0c2.307-.016 4.617.022 6.93.11c21.506 71.128-61.684 69.903-108.288 36.757c32.95-24.63 66.756-36.637 101.358-36.866zM255.164 332.14c11.77 21.725 19.193 43.452 25.367 65.178h-50.737c4.57-21.726 13.77-43.45 25.37-65.18z"
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
