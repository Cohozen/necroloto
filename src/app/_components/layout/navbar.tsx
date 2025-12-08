"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";

import React from "react";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const pathnames = pathname.split("/");
    const isInSecondaryPage = pathnames.length >= 3;

    if (isInSecondaryPage)
        return (
            <nav className="sticky top-0 z-50 bg-default-100/50 border-small border-default-200/20 shadow-medium backdrop-blur-md backdrop-saturate-150">
                <div className="flex px-1 gap-4 lg:max-w-[700px] xl:max-w-[1024px] w-full lg:mx-auto flex-row relative flex-nowrap items-center justify-between h-12 lg:h-16 overflow-hidden">
                    <div className="flex h-full flex-row flex-nowrap items-center justify-start flex-grow basis-0">
                        <Button
                            color="default"
                            variant="light"
                            radius="full"
                            isIconOnly
                            startContent={<ArrowLeftLineIcon className="h-5 w-5 lg:h-6 lg:w-6" />}
                            onPress={() => router.back()}
                        />
                    </div>
                </div>
            </nav>
        );
}
