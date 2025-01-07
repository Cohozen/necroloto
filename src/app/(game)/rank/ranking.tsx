"use client";

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Chip,
    Card,
    CardBody,
    Tabs,
    Tab,
    Select,
    SelectItem,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
import { RankedBetsWithUsers } from "@/lib/types/bet";
import { MedalStarIcon } from "@/ui/icons/MedalStarIcon";
import { CupFirstIcon } from "@/ui/icons/CupFirstIcon";
import { MedalRibbonsIcon } from "@/ui/icons/MedalRibbonsIcon";
import { CardHeader } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti-boom";
import Link from "next/link";

interface RankingProps {
    bets: RankedBetsWithUsers[];
    year: number;
}

export default function Ranking({ bets, year }: RankingProps) {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState("points");
    const [yearState, setYearState] = useState("");

    const tabs = [
        {
            id: "points",
            label: "Par points"
        },
        {
            id: "death",
            label: "Par décès"
        }
    ];

    const yearSelect = [
        {
            key: "2024",
            label: "2024"
        },
        {
            key: "2025",
            label: "2025"
        }
    ];

    useEffect(() => {
        router.replace(
            `/rank/?sort=${encodeURIComponent(selectedTab)}&year=${encodeURIComponent(yearState)}`
        );
    }, [selectedTab, yearState]);

    useEffect(() => {
        setYearState(year.toString())
    }, [year]);

    return (
        <Tabs
            fullWidth
            variant="bordered"
            color="primary"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key.toString())}
            items={tabs}
            radius="full"
        >
            {(item) => (
                <Tab key={item.id} title={item.label} className="flex flex-col gap-6 px-0">
                    <Select
                        selectionMode="single"
                        label="Année"
                        disallowEmptySelection
                        variant="bordered"
                        radius="lg"
                        fullWidth
                        selectedKeys={[yearState]}
                        onChange={(event) => setYearState(event.target.value)}
                        items={yearSelect}
                    >
                        {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>

                    <Card shadow="none">
                        <CardBody className="pb-0">
                            <div className="flex flex-row justify-center items-end md:pb-4">
                                <div className="flex flex-col items-center gap-2">
                                    {bets[2]?.user && (
                                        <Popover
                                            showArrow
                                            backdrop="blur"
                                            classNames={{
                                                base: ["before:bg-default-200"],
                                                content: [
                                                    "py-3 px-4 border border-default-200",
                                                    "bg-gradient-to-br from-white to-default-300",
                                                    "dark:from-default-100 dark:to-default-50"
                                                ]
                                            }}
                                        >
                                            <PopoverTrigger>
                                                <Avatar
                                                    isBordered
                                                    radius="full"
                                                    size="sm"
                                                    src={bets[2]?.user.image ?? undefined}
                                                    name={`${bets[2]?.user.firstname} ${
                                                        bets[2]?.user.lastname ?? ""
                                                    }`}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">
                                                        {`${bets[2]?.user.firstname} ${
                                                            bets[2]?.user.lastname ?? ""
                                                        }`}
                                                    </div>
                                                    <div className="text-tiny">
                                                        {`3ème place avec ${bets[2]?.total} points`}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                    <div className="flex justify-center items-start py-4 bg-secondary-200 dark:bg-secondary-400 h-16 w-20 rounded-tl-xl">
                                        <MedalStarIcon className="w-6 h-6 text-amber-800" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    {bets[0].user && (
                                        <Popover
                                            showArrow
                                            backdrop="blur"
                                            classNames={{
                                                base: ["before:bg-default-200"],
                                                content: [
                                                    "py-3 px-4 border border-default-200",
                                                    "bg-gradient-to-br from-white to-default-300",
                                                    "dark:from-default-100 dark:to-default-50"
                                                ]
                                            }}
                                        >
                                            <PopoverTrigger>
                                                <Avatar
                                                    isBordered
                                                    radius="full"
                                                    size="sm"
                                                    src={bets[0]?.user.image ?? undefined}
                                                    name={`${bets[0]?.user.firstname} ${
                                                        bets[0]?.user.lastname ?? ""
                                                    }`}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">
                                                        {`${bets[0]?.user.firstname} ${
                                                            bets[0]?.user.lastname ?? ""
                                                        }`}
                                                    </div>
                                                    <div className="text-tiny">
                                                        {`1ère place avec ${bets[0]?.total} points`}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                    <div className="flex justify-center items-start py-4 bg-secondary-400 dark:bg-secondary-200 h-44 w-20 rounded-t-xl">
                                        <CupFirstIcon className="w-8 h-8 text-amber-300" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    {bets[1]?.user && (
                                        <Popover
                                            showArrow
                                            backdrop="blur"
                                            classNames={{
                                                base: ["before:bg-default-200"],
                                                content: [
                                                    "py-3 px-4 border border-default-200",
                                                    "bg-gradient-to-br from-white to-default-300",
                                                    "dark:from-default-100 dark:to-default-50"
                                                ]
                                            }}
                                        >
                                            <PopoverTrigger>
                                                <Avatar
                                                    isBordered
                                                    radius="full"
                                                    size="sm"
                                                    src={bets[1]?.user.image ?? undefined}
                                                    name={`${bets[1]?.user.firstname} ${
                                                        bets[1]?.user.lastname ?? ""
                                                    }`}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">
                                                        {`${bets[1]?.user.firstname} ${
                                                            bets[1]?.user.lastname ?? ""
                                                        }`}
                                                    </div>
                                                    <div className="text-tiny">
                                                        {`2ème place avec ${bets[1]?.total} points`}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                    <div className="flex justify-center items-start py-4 bg-secondary-300 h-28 w-20 rounded-tr-xl">
                                        <MedalRibbonsIcon className="w-6 h-6 text-zinc-500" />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Confetti mode="boom" />

                    <div className="flex flex-col gap-3">
                        {bets &&
                            bets.map((bet, index) => {
                                let rank = index + 1;
                                const deathNumber = bet.CelebritiesOnBet.filter(
                                    (c) => !!c.celebrity.death
                                ).length;

                                const previous = bets[index - 1];
                                const previousDeathNumber = previous?.CelebritiesOnBet.filter(
                                    (c) => !!c.celebrity.death
                                ).length;

                                const isSamePoints = previous?.total === bet.total;
                                const isSameDeaths = previousDeathNumber === deathNumber;

                                if (selectedTab === "points") {
                                    if (isSamePoints)
                                        rank = bets.findIndex((b) => b.total === bet.total) + 1;
                                }

                                if (selectedTab === "death") {
                                    if (isSameDeaths)
                                        rank =
                                            bets.findIndex(
                                                (b) =>
                                                    b.CelebritiesOnBet.filter(
                                                        (c) => !!c.celebrity.death
                                                    ).length === deathNumber
                                            ) + 1;
                                }

                                return (
                                    <Card
                                        as={Link}
                                        href={`/bets/${bet.id}`}
                                        key={bet.id}
                                        fullWidth
                                        isPressable
                                        shadow="none"
                                    >
                                        <CardHeader className="flex gap-3">
                                            <div className="flex bg-default-300 p-2 rounded-xl h-full">
                                                {rank === 1 && (
                                                    <CupFirstIcon className="w-6 h-6 dark:text-amber-300 text-yellow-600" />
                                                )}
                                                {rank === 2 && (
                                                    <MedalRibbonsIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                                                )}

                                                {rank === 3 && (
                                                    <MedalStarIcon className="w-6 h-6 text-amber-800" />
                                                )}

                                                {rank > 3 && <MedalStarIcon className="w-6 h-6 " />}
                                            </div>

                                            <div className="flex flex-col flex-1 items-start gap-1">
                                                <div className="text-md font-medium">
                                                    {`${bet.user.firstname} ${
                                                        bet.user.lastname ?? ""
                                                    }`}
                                                </div>
                                                <div className="flex gap-1">
                                                    <Chip
                                                        variant="flat"
                                                        size="sm"
                                                        color="primary"
                                                        className="text-2xs"
                                                    >
                                                        {`${rank}${rank === 1 ? "er" : "ème"}`}
                                                    </Chip>
                                                    <Chip
                                                        variant="flat"
                                                        size="sm"
                                                        color="primary"
                                                        className="text-2xs"
                                                    >
                                                        <span
                                                            className={
                                                                selectedTab === "points"
                                                                    ? "font-bold"
                                                                    : ""
                                                            }
                                                        >
                                                            {bet.total}pts
                                                        </span>
                                                    </Chip>
                                                    <Chip
                                                        variant="flat"
                                                        size="sm"
                                                        color="primary"
                                                        className="text-2xs"
                                                    >
                                                        <span
                                                            className={
                                                                selectedTab === "death"
                                                                    ? "font-bold"
                                                                    : ""
                                                            }
                                                        >
                                                            {`${deathNumber} décès`}
                                                        </span>
                                                    </Chip>
                                                </div>
                                            </div>
                                            <div>
                                                <Avatar
                                                    radius="full"
                                                    src={bet.user.image ?? undefined}
                                                    size="sm"
                                                    name={bet.user.firstname || ""}
                                                    isBordered
                                                />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                    </div>
                </Tab>
            )}
        </Tabs>
    );
}
