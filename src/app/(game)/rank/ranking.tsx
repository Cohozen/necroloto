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
    Link
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

interface RankingProps {
    bets: RankedBetsWithUsers[];
}

export default function Ranking({ bets }: RankingProps) {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState("points");

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

    useEffect(() => {
        router.replace(`/rank/?sort=${encodeURIComponent(selectedTab)}`);
    }, [selectedTab]);

    return (
        <div>
            <Tabs
                fullWidth
                variant="bordered"
                color="secondary"
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key.toString())}
                items={tabs}
            >
                {(item) => (
                    <Tab key={item.id} title={item.label} className="flex flex-col gap-4">
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex text-2xl font-bold">2024</div>
                        </div>

                        <Card>
                            <CardBody className="pb-0">
                                <div className="flex flex-row justify-center items-end md:pb-4">
                                    <div className="flex flex-col items-center gap-2">
                                        {bets[2]?.user && (
                                            <Avatar
                                                radius="full"
                                                size="sm"
                                                src={bets[2]?.user.image ?? undefined}
                                                name={`${bets[2]?.user.firstname} ${
                                                    bets[2]?.user.lastname ?? ""
                                                }`}
                                            />
                                        )}
                                        <div className="flex justify-center items-start py-4 bg-primary-200 dark:bg-primary-400 h-16 w-20 rounded-tl-xl">
                                            <MedalStarIcon className="w-6 h-6 text-orange-700" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        {bets[0].user && (
                                            <Avatar
                                                radius="full"
                                                size="sm"
                                                src={bets[0]?.user.image ?? undefined}
                                                name={`${bets[0]?.user.firstname} ${
                                                    bets[0]?.user.lastname ?? ""
                                                }`}
                                            />
                                        )}
                                        <div className="flex justify-center items-start py-4 bg-primary-400 dark:bg-primary-200 h-44 w-20 rounded-t-xl">
                                            <CupFirstIcon className="w-8 h-8 text-amber-300" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        {bets[1]?.user && (
                                            <Avatar
                                                radius="full"
                                                size="sm"
                                                src={bets[1]?.user.image ?? undefined}
                                                name={`${bets[1]?.user.firstname} ${
                                                    bets[1]?.user.lastname ?? ""
                                                }`}
                                            />
                                        )}
                                        <div className="flex justify-center items-start py-4 bg-primary-300 h-28 w-20 rounded-tr-xl">
                                            <MedalRibbonsIcon className="w-6 h-6 text-zinc-400" />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {bets &&
                            bets.map((bet, index) => {
                                const rank = index + 1;
                                return (
                                    <Card key={bet.id} fullWidth>
                                        <CardHeader className="flex gap-3">
                                            <div className="flex justify-center bg-default-300 p-2 rounded-xl">
                                                {rank === 1 && (
                                                    <CupFirstIcon className="w-6 h-6 text-amber-300" />
                                                )}
                                                {rank === 2 && (
                                                    <MedalRibbonsIcon className="w-6 h-6 text-zinc-400" />
                                                )}

                                                {rank === 3 && (
                                                    <MedalStarIcon className="w-6 h-6 text-orange-700" />
                                                )}

                                                {rank > 3 && <MedalStarIcon className="w-6 h-6 " />}
                                            </div>

                                            <div className="flex flex-col flex-1">
                                                <p className="text-md font-medium">
                                                    {`${bet.user.firstname} ${
                                                        bet.user.lastname ?? ""
                                                    }`}
                                                </p>
                                                <p className="flex text-small gap-1">
                                                    <Chip variant="flat" size="sm" color="primary">
                                                        {`${rank}${rank === 1 ? "er" : "ème"}`}
                                                    </Chip>
                                                    <Chip variant="flat" size="sm" color="primary">
                                                        {bet.total}pts
                                                    </Chip>
                                                    <Chip variant="flat" size="sm" color="primary">
                                                        {
                                                            bet.CelebritiesOnBet.filter(
                                                                (c) => !!c.celebrity.death
                                                            ).length
                                                        }{" "}
                                                        décès
                                                    </Chip>
                                                </p>
                                            </div>
                                            <div>
                                                <Avatar
                                                    radius="full"
                                                    src={bet.user.image ?? undefined}
                                                    size="sm"
                                                    name={bet.user.firstname || ""}
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
