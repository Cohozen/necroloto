"use client";

import { Avatar, Card, CardBody, CardFooter } from "@nextui-org/react";
import { CardHeader } from "@nextui-org/card";
import React from "react";
import { CircleWithMembershipsAndBets } from "@/lib/types/circle";
import { useRouter } from "next/navigation";

interface CircleCardProps {
    circle: CircleWithMembershipsAndBets;
    currentRank: number;
}

export default function CircleCard({ circle, currentRank }: CircleCardProps) {
    const router = useRouter();

    return (
        <Card fullWidth isPressable onPress={() => router.push(`/circles/${circle.id}`)}>
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src="https://heroui.com/avatars/avatar-1.png"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {circle.name}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                            {circle.visibility}
                        </h5>
                    </div>
                </div>
                {/*<Button*/}
                {/*    className="bg-transparent text-foreground border-default-200"*/}
                {/*    color="primary"*/}
                {/*    radius="full"*/}
                {/*    size="sm"*/}
                {/*    variant="bordered"*/}
                {/*    //onPress={() => setIsFollowed(!isFollowed)}*/}
                {/*>*/}
                {/*    action*/}
                {/*</Button>*/}
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <div className="flex flex-row items-center justify-between gap-2 mb-2">
                    <span>
                        {`${circle.memberships.length} participant${circle.memberships.length > 1 ? "s" : ""}`}
                    </span>
                    {currentRank > 0 ? (
                        <span>{`${currentRank} / ${circle.bets.length}`}</span>
                    ) : (
                        "Non classé"
                    )}
                </div>
            </CardBody>
            <CardFooter className="gap-3">
                {/*<Button*/}
                {/*    color="primary"*/}
                {/*    radius="full"*/}
                {/*    size="sm"*/}
                {/*    fullWidth*/}
                {/*    variant="flat"*/}
                {/*    //onPress={() => router.push(`/circles/${c.id}/rank`)}*/}
                {/*>*/}
                {/*    Classement*/}
                {/*</Button>*/}
            </CardFooter>
        </Card>
    );
}
