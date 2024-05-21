"use client";

import React, { useCallback } from "react";

import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import classNames from "classnames";

import useClerkSWR from "@/utils/hooks/useClerkSWR";

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useUser();

    // const { data: userBet } = useClerkSWR(`/api/users/${user?.externalId}/bet`);

    const isAdmin = () => {
        if (user) {
            const roles = user.publicMetadata?.roles as string[];
            if (roles) {
                return roles.some((r) => r === "admin");
            }
        }

        return false;
    };

    // const navigation = useCallback(() => {
    //     const navigationLinks = [{ name: "Dashboard", href: "/" }];
    //
    //     if (userBet) navigationLinks.push({ name: "Mon Pari", href: `/bets/${userBet._id}` });
    //     else
    //         navigationLinks.push({
    //             name: "Parier",
    //             href: "/bet"
    //         });
    //
    //     if (isAdmin()) navigationLinks.push({ name: "Administration", href: "/admin" });
    //
    //     return navigationLinks;
    // }, [userBet, isAdmin]);

    return (
        <div className="drawer-side z-50">
            <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex mb-4">
                <a href="/game" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <path
                            fill="currentColor"
                            d="M254.563 20.75c-42.96 0-85.918 16.387-118.688 49.156c-65.54 65.54-65.852 172.15-.313 237.688c65.54 65.54 172.15 65.226 237.688-.313c65.54-65.538 65.54-171.835 0-237.374c-32.77-32.77-75.728-49.156-118.688-49.156zm-.157 18.47a149.284 149.284 0 0 1 74.313 19.968c-13.573-3.984-26.266-2.455-34.22 5.5c-14.437 14.437-7.796 44.485 14.813 67.093c22.608 22.61 52.625 29.22 67.062 14.782c8.523-8.522 9.706-22.468 4.594-37.125c36.352 57.684 29.586 134.6-20.69 184.875c-29.158 29.16-67.353 43.773-105.56 43.813c9.436-2.3 17.762-6.732 24.436-13.406c28.885-28.886 15.64-88.954-29.594-134.19c-45.234-45.233-105.302-58.51-134.187-29.624c-4.052 4.052-7.266 8.723-9.688 13.875c3.092-33.537 17.473-66.222 43.157-91.905c29.198-29.2 67.384-43.737 105.562-43.656zM386.97 319.28c-.205.206-.39.422-.595.626c-72.78 72.78-191.252 73.155-264.03.375c-.278-.275-.54-.565-.814-.842c-11.987 9.483-18.81 20.384-18.81 32c0 36.523 67.315 66.125 151.343 66.125c84.027 0 152.093-29.6 152.093-66.125c0-11.68-6.97-22.637-19.187-32.157zm39.717 54.564c-22.225 32.29-91.192 55.906-172.625 55.906c-81.172 0-149.954-23.46-172.406-55.594c-12.638 11.3-19.72 24.052-19.72 37.563c.002 46.928 85.546 85.03 192.064 85.03c106.518 0 192.97-38.1 192.97-85.03c0-13.637-7.313-26.498-20.283-37.876z"
                        ></path>
                    </svg>
                    <div className="font-title inline-flex text-lg md:text-2xl">Necroloto</div>
                </a>
            </div>
            <ul className="menu bg-base-100 p-4 w-80">
                <li>
                    <a
                        href="/game"
                        className={classNames({
                            active: pathname === "/game"
                        })}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-primary">
                            <path
                                fill="currentColor"
                                d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z"
                            ></path>
                        </svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <h2 className="menu-title flex items-center gap-4">
                        <span className="text-base-content">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 text-secondary"
                            >
                                <path
                                    fill="currentColor"
                                    d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-11 7H8v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H4c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1m5.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"
                                ></path>
                            </svg>
                        </span>
                        Game
                    </h2>
                    <ul>
                        <li>
                            <a
                                href="/game/bet"
                                className={classNames({
                                    active: pathname === "/game/bet"
                                })}
                            >
                                Parier
                            </a>
                        </li>
                        <li>
                            <a
                                href={`/game/users/${user?.externalId}/bets`}
                                className={classNames({
                                    active: pathname === `/game/users/${user?.externalId}/bets`
                                })}
                            >
                                Mes paris
                            </a>
                        </li>
                        <li>
                            <a
                                href="/game/bets"
                                className={classNames({
                                    active: pathname.split("/").slice(1, 3).join("/") === "game/bets"
                                })}
                            >
                                Tous les paris
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        href="/game/celebrities"
                        className={classNames({
                            active: pathname === "/game/celebrities"
                        })}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-accent">
                            <circle cx="10" cy="8" r="4" fill="currentColor"></circle>
                            <path
                                fill="currentColor"
                                d="M10.35 14.01C7.62 13.91 2 15.27 2 18v1c0 .55.45 1 1 1h8.54c-2.47-2.76-1.23-5.89-1.19-5.99m9.08 4.01c.47-.8.7-1.77.48-2.82c-.34-1.64-1.72-2.95-3.38-3.16c-2.63-.34-4.85 1.87-4.5 4.5c.22 1.66 1.52 3.04 3.16 3.38c1.05.22 2.02-.01 2.82-.48l1.86 1.86a.996.996 0 1 0 1.41-1.41zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"
                            ></path>
                        </svg>
                        Célébrités
                    </a>
                </li>
                {isAdmin() && (
                    <li>
                        <a
                            href="/game/admin"
                            className={classNames({
                                active: pathname === "/game/admin"
                            })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                                <path
                                    fill="currentColor"
                                    d="M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64zm-1.98-1.71c.04.31.05.52.05.73c0 .21-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"
                                ></path>
                            </svg>
                            Administration
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}
