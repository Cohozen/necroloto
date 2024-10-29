"use client";

import {
    Card,
    Button,
    CardFooter,
    CardBody,
    Link,
    Chip,
    Progress
} from "@nextui-org/react";
import { BetsWithUserAndCelebrities } from "@/lib/types/bet";
import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface CurrentBetProps {
    bet: BetsWithUserAndCelebrities;
    rank: number;
}

export default async function CurrentBet({ bet, rank }: CurrentBetProps) {
    const total = bet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0) ?? 0;
    const celebrities = bet?.CelebritiesOnBet.map((c) => c.celebrity);

    const inLife = celebrities?.filter((c) => !c.death).length;
    const inLifePercent = inLife ? (inLife / celebrities.length) * 100 : 0;

    const formatNumberWithTwoDigits = (number: number) => {
        return number.toString().padStart(2, "0");
    };

    const now = dayjs();
    const endOfYear = dayjs().endOf("year");

    const diff = dayjs.duration(endOfYear.diff(now));

    return (
        <Card className="w-full md:basis-2/3">
            <CardBody className="text-small text-default-400">
                <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                        base: "w-full",
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
            <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex gap-2">
                    <Chip className="capitalize" color="default" variant="flat" size="sm">
                        {`${total} ${total > 1 ? "points" : "point"}`}
                    </Chip>
                    <Chip className="capitalize" color="primary" variant="flat" size="sm">
                        {rank === 1 && total === 0
                            ? "Non classé"
                            : `${rank}${rank === 1 ? "er" : "ème"}`}
                    </Chip>
                    <Chip className="capitalize" color="success" variant="flat" size="sm">
                        {`${formatNumberWithTwoDigits(
                            Math.floor(diff.asMonths())
                        )} : ${formatNumberWithTwoDigits(
                            diff.days()
                        )} : ${formatNumberWithTwoDigits(
                            diff.hours()
                        )} : ${formatNumberWithTwoDigits(diff.minutes())}`}
                    </Chip>
                </div>
                <Button
                    color="primary"
                    href={`/bets/${bet.id}`}
                    as={Link}
                    showAnchorIcon
                    variant="flat"
                    size="sm"
                    fullWidth
                >
                    Voir le détail
                </Button>
            </CardFooter>
        </Card>
    );
}
