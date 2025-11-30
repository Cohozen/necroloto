"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { Avatar, Button, Link } from "@nextui-org/react";

import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const { user } = useUser();

    const pathnames = pathname.split("/");
    const isInSecondaryPage = pathnames.length === 3;
    const isCirclePages = pathnames[1] === "circles";

    if (!isCirclePages)
        return (
            <nav className="sticky top-0 z-50 bg-default-100/50 border-small border-default-200/20 shadow-medium backdrop-blur-md backdrop-saturate-150">
                <div className="flex px-1 gap-4 lg:max-w-[700px] xl:max-w-[1024px] w-full lg:mx-auto flex-row relative flex-nowrap items-center justify-between h-12 lg:h-16 overflow-hidden">
                    <div className="flex h-full flex-row flex-nowrap items-center justify-start flex-grow basis-0">
                        {isInSecondaryPage && (
                            <Button
                                color="default"
                                variant="light"
                                radius="full"
                                isIconOnly
                                startContent={
                                    <ArrowLeftLineIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                                }
                                onPress={() => router.back()}
                            />
                        )}
                    </div>
                    <ul className="h-full flex-row flex-nowrap items-center justify-center hidden sm:flex gap-6">
                        <li className="text-medium whitespace-nowrap box-border list-none">
                            <Link color="foreground" href="/overview">
                                Necroloto
                            </Link>
                        </li>
                        <li className="text-medium whitespace-nowrap box-border list-none">
                            <Link color="foreground" href="/circles">
                                Cercles
                            </Link>
                        </li>
                        <li className="text-medium whitespace-nowrap box-border list-none">
                            <Link color="foreground" href="/celebrities">
                                Célébrités
                            </Link>
                        </li>
                    </ul>
                    <div className="hidden sm:flex gap-4 h-full flex-row flex-nowrap items-center justify-end flex-grow basis-0">
                        <Link href="/profile">
                            <Avatar
                                isBordered={pathname === "/profile"}
                                color={pathname === "/profile" ? "primary" : "default"}
                                className="transition-transform"
                                src={user?.imageUrl ?? ""}
                                classNames={{
                                    base: "w-7 h-7"
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </nav>
        );
}
