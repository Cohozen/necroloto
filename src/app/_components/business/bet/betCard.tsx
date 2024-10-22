"use client";

import {
    Card,
    Button,
    CardHeader,
    CardFooter,
    Avatar,
    CardBody,
    Link,
    Chip,
    Progress
} from "@nextui-org/react";
import { BetsWithUserAndCelebrities } from "@/lib/types/bet";
import React from "react";

interface BetCardProps {
    bet: BetsWithUserAndCelebrities;
}

export default async function BetCard({ bet }: BetCardProps) {
    const celebrities = bet?.CelebritiesOnBet.map((c) => c.celebrity);

    const inLife = celebrities?.filter((c) => !c.death).length;
    const inLifePercent = inLife ? (inLife / celebrities.length) * 100 : 0;

    const total = bet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0) ?? 0;

    return (
        <Card fullWidth>
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="full" size="sm" src={bet.user.image ?? ""} />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-medium text-default-600">
                            {`${bet.user.firstname} ${bet.user.lastname ?? ""}`}
                        </h4>
                    </div>
                </div>
                <Button
                    as={Link}
                    isIconOnly
                    color="primary"
                    radius="md"
                    size="sm"
                    variant="flat"
                    showAnchorIcon
                    href={`/bets/${bet.id}`}
                />
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-gradient-to-r from-primary to-secondary",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60"
                    }}
                    label="En vie"
                    value={inLifePercent}
                    showValueLabel={true}
                />
            </CardBody>
            <CardFooter className="gap-3">
                <Chip className="capitalize" color="default" variant="flat" size="sm">
                    {`${total} ${total > 1 ? "points" : "point"}`}
                </Chip>
            </CardFooter>
        </Card>
    );
}
