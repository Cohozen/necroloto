"use client";

import {
    Avatar,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    Radio,
    RadioGroup,
    Tab,
    Tabs,
    useDisclosure,
    cn
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftLineIcon } from "@/ui/icons/ArrowLeftLineIcon";
import React from "react";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";
import { Circle } from "@prisma/client";
import { MaximizeIcon } from "@/ui/icons/MaximizeIcon";
import { PressEvent } from "@react-types/shared";

interface CircleNavProps {
    circleId: string;
    myCircles: Circle[];
}

export default function CircleNav({ circleId, myCircles }: CircleNavProps) {
    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const pathnames = pathname.split("/");

    const selectedCircle = myCircles.find((c) => c.id === circleId);

    const onPressReturn = (_e: PressEvent) => {
        if (pathnames.length >= 5 || pathnames[3] === "settings") router.back();
        else if (pathnames.length === 3) router.push("/home/");
        else router.push("/circles/");
    };

    return (
        <>
            <div className="flex px-1 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-12 overflow-hidden">
                <div className="flex gap-4 h-full flex-row flex-nowrap items-center justify-start flex-grow basis-0">
                    <Button
                        color="default"
                        variant="light"
                        radius="full"
                        isIconOnly
                        startContent={<ArrowLeftLineIcon className="h-5 w-5" />}
                        onPress={onPressReturn}
                    />
                </div>
                <div className="flex gap-4 h-full flex-row flex-nowrap items-center justify-center flex-shrink min-w-0">
                    {selectedCircle && (
                        <Button
                            size="sm"
                            color="default"
                            className="px-2 text-sm max-w-[250px]"
                            startContent={
                                <>
                                    <MaximizeIcon className="h-4 w-4 -rotate-45 flex-shrink-0" />
                                    <Avatar
                                        isBordered
                                        radius="full"
                                        src="https://heroui.com/avatars/avatar-1.png"
                                        classNames={{
                                            base: "w-5 h-5 flex-shrink-0"
                                        }}
                                    />
                                </>
                            }
                            variant="flat"
                            radius="full"
                            onPress={onOpen}
                        >
                            <span className="truncate">{selectedCircle.name}</span>
                        </Button>
                    )}
                </div>
                <div className="flex gap-4 h-full flex-row flex-nowrap items-center justify-end flex-grow basis-0">
                    <Button
                        color="default"
                        variant="light"
                        radius="full"
                        isIconOnly
                        startContent={
                            <SettingsIcon
                                className={cn("h-5 w-5", {
                                    "text-secondary": pathnames[3] === "settings"
                                })}
                            />
                        }
                        onPress={(e) => router.push(`/circles/${circleId}/settings`)}
                    />
                </div>
            </div>
            <Tabs
                aria-label="Circle-nav"
                radius="full"
                selectedKey={pathnames[3] || "resume"}
                variant="underlined"
                classNames={{
                    tabList: "rounded-none h-8 p-0",
                    cursor: "w-full bg-secondary",
                    tab: "h-full",
                    tabContent: "group-data-[selected=true]:text-secondary text-xs"
                }}
            >
                <Tab key="resume" href={`/circles/${circleId}`} title="Résumé" />
                <Tab key="rank" href={`/circles/${circleId}/rank`} title="Classement" />
                <Tab key="bets" href={`/circles/${circleId}/bets`} title="Prédictions" />
                <Tab key="memberships" href={`/circles/${circleId}/memberships`} title="Membres" />
            </Tabs>

            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="bottom"
                hideCloseButton
                classNames={{
                    base: "bg-background"
                }}
            >
                <DrawerContent>
                    <div
                        aria-hidden="true"
                        className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-default-200 mt-2"
                    />
                    <DrawerBody className="my-2">
                        <RadioGroup
                            label="Mes Cercles"
                            defaultValue={circleId}
                            onValueChange={(value) => {
                                router.push(`/circles/${value}`);
                            }}
                        >
                            {myCircles.map((c) => {
                                return (
                                    <Radio
                                        key={c.id}
                                        description={c.visibility}
                                        value={c.id}
                                        classNames={{
                                            base: cn(
                                                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                                "flex-row-reverse max-w-[800px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary"
                                            )
                                        }}
                                    >
                                        {c.name}
                                    </Radio>
                                );
                            })}
                        </RadioGroup>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
