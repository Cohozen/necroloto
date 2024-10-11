"use client";

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Chip,
    Popover,
    PopoverTrigger,
    CardFooter,
    Card,
    CardBody,
    Divider,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    AccordionItem,
    Accordion,
    User,
    Tabs,
    Tab,
    Button,
    Link,
    Select,
    SelectItem
} from "@nextui-org/react";
import { Celebrity } from "@prisma/client";
import { BetsWithUserAndCelebritiesOnBet, RankedBets, RankedBetsWithUsers } from "@/lib/types/bet";
import UserAvatar from "@/components/business/user/UserAvatar";
import { MedalStarIcon } from "@/ui/icons/MedalStarIcon";
import { CupFirstIcon } from "@/ui/icons/CupFirstIcon";
import { MedalRibbonsIcon } from "@/ui/icons/MedalRibbonsIcon";
import { buildUserName } from "@/lib/helpers/user";
import { CardHeader } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti-boom";

interface RankingProps {
    bets: RankedBetsWithUsers[];
}

export default function Ranking({ bets }: RankingProps) {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState("points");
    const [year, setYear] = useState("2024");

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
            `/rank/?sort=${encodeURIComponent(selectedTab)}&year=${encodeURIComponent(year)}`
        );
    }, [selectedTab, year]);

    return (
        <div>
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
                    <Tab key={item.id} title={item.label} className="flex flex-col gap-4 px-0">
                        <Select
                            selectionMode="single"
                            label="Année"
                            disallowEmptySelection
                            variant="bordered"
                            size="sm"
                            radius="lg"
                            fullWidth
                            selectedKeys={[year]}
                            disabledKeys={["2025"]}
                            onChange={(event) => setYear(event.target.value)}
                            items={yearSelect}
                        >
                            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                        </Select>

                        <Divider />

                        <Card>
                            <CardBody className="pb-0">
                                <div className="flex flex-row justify-center items-end md:pb-4">
                                    <div className="flex flex-col items-center gap-2">
                                        {bets[2]?.user && (
                                            <Avatar
                                                isBordered
                                                radius="full"
                                                size="sm"
                                                src={bets[2]?.user.image ?? undefined}
                                                name={`${bets[2]?.user.firstname} ${
                                                    bets[2]?.user.lastname ?? ""
                                                }`}
                                            />
                                        )}
                                        <div className="flex justify-center items-start py-4 bg-secondary-200 dark:bg-secondary-400 h-16 w-20 rounded-tl-xl">
                                            <MedalStarIcon className="w-6 h-6 text-amber-800" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        {bets[0].user && (
                                            <Avatar
                                                isBordered
                                                radius="full"
                                                size="sm"
                                                src={bets[0]?.user.image ?? undefined}
                                                name={`${bets[0]?.user.firstname} ${
                                                    bets[0]?.user.lastname ?? ""
                                                }`}
                                            />
                                        )}
                                        <div className="flex justify-center items-start py-4 bg-secondary-400 dark:bg-secondary-200 h-44 w-20 rounded-t-xl">
                                            <CupFirstIcon className="w-8 h-8 text-amber-300" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        {bets[1]?.user && (
                                            <Avatar
                                                isBordered
                                                radius="full"
                                                size="sm"
                                                src={bets[1]?.user.image ?? undefined}
                                                name={`${bets[1]?.user.firstname} ${
                                                    bets[1]?.user.lastname ?? ""
                                                }`}
                                            />
                                        )}
                                        <div className="flex justify-center items-start py-4 bg-secondary-300 h-28 w-20 rounded-tr-xl">
                                            <MedalRibbonsIcon className="w-6 h-6 text-zinc-500" />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Confetti mode="boom" />

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
                                        key={bet.id}
                                        fullWidth
                                        isPressable
                                        onPress={() => router.push(`/bets/${bet.id}`)}
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

                                            <div className="flex flex-col flex-1 items-start">
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
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}
