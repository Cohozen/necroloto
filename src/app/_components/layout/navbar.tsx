"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";

import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");
    const isInSecondaryPage = pathnames.length === 3;
    const isCirclePages = pathnames[1] === "circles";

    if (isInSecondaryPage && !isCirclePages)
        return (
            <nav className="sticky top-0 z-50 bg-default-100/50 border-small border-default-200/20 shadow-medium backdrop-blur-md backdrop-saturate-150">
                <div className="flex px-1 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-12 overflow-hidden">
                    <div className="flex gap-4 h-full flex-row flex-nowrap items-center justify-start flex-grow basis-0">
                        <Button
                            color="default"
                            variant="light"
                            radius="full"
                            isIconOnly
                            startContent={<ArrowLeftLineIcon className="h-5 w-5" />}
                            onPress={() => router.back()}
                        />
                    </div>
                </div>
            </nav>
        );
}
