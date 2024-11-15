"use client";

import React from "react";
import { Button, Chip, Listbox, ListboxItem, User as UserAvatar } from "@nextui-org/react";
import { useAuth, useUser } from "@clerk/nextjs";
import { ChevronRightIcon } from "@/ui/icons/ChevronRightIcon";
import { GoogleIcon } from "@/ui/icons/GoogleIcon";
import { User } from "@prisma/client";

interface ProfileProps {
    userDb: User;
}

export default function Profile({ userDb }: ProfileProps) {
    const { user } = useUser();
    const { signOut } = useAuth();

    const hasGoogleConnexion = user?.externalAccounts.some((a) => a.provider === "google");

    return (
        <>
            {user && (
                <>
                    <div>
                        <UserAvatar
                            description={`ID : ${user.id}`}
                            name={`${userDb.firstname ?? ""} ${userDb.lastname ?? ""}`}
                            avatarProps={{
                                radius: "full",
                                size: "lg",
                                src: userDb.image ?? undefined
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4">
                            {// @ts-ignore
                            user.publicMetadata?.roles?.map((r) => {
                                return (
                                    <Chip key={r} className="capitalize" variant="flat">
                                        {r}
                                    </Chip>
                                );
                            })}

                            {hasGoogleConnexion && (
                                <Chip
                                    className="capitalize"
                                    variant="flat"
                                    startContent={<GoogleIcon className="w-4 h-4" />}
                                >
                                    Google
                                </Chip>
                            )}
                        </div>

                        <Listbox
                            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible rounded-medium"
                            itemClasses={{
                                base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80"
                            }}
                            disabledKeys={["email"]}
                        >
                            <ListboxItem
                                key="name"
                                endContent={<ChevronRightIcon className="w-4 h-4" />}
                                href="/profile/name"
                            >
                                <div className="flex justify-between">
                                    <span>Nom</span>
                                    <span className="text-gray-500">{`${userDb.firstname ?? ""} ${
                                        userDb.lastname ?? ""
                                    }`}</span>
                                </div>
                            </ListboxItem>
                            <ListboxItem
                                key="email"
                                endContent={<ChevronRightIcon className="w-4 h-4" />}
                            >
                                <div className="flex justify-between">
                                    <span>Email</span>
                                    <span className="text-gray-500">{userDb.email}</span>
                                </div>
                            </ListboxItem>
                        </Listbox>

                        <Button
                            color="primary"
                            variant="solid"
                            radius="full"
                            onClick={() => signOut()}
                        >
                            Déconnexion
                        </Button>
                    </div>
                </>
            )}
        </>
    );
}
