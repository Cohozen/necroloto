"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CelebrityUpdate from "./celebrityUpdate";
import {
    Avatar,
    Chip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Card,
    CardBody,
    Divider,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Tabs,
    Tab,
    Button,
    Link
} from "@nextui-org/react";
import { calculPointByCelebrity } from "@/lib/helpers/bet";
import { CardHeader } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { Celebrity } from "@prisma/client";
import { BetsWithUserAndCelebritiesOnBet, RankedBets } from "@/lib/types/bet";
import { findIndex } from "lodash";

interface CelebrityProps {
    celebrity: Celebrity;
    bets: BetsWithUserAndCelebritiesOnBet[];
    rankedBets: RankedBets[];
    isAdmin: boolean;
}

export default function Celebrity({ celebrity, bets, rankedBets, isAdmin }: CelebrityProps) {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState("2024");
    const [mode, setMode] = useState("consultation");

    const tabs = [
        {
            id: "2024",
            label: "2024"
        },
        {
            id: "2025",
            label: "2025"
        }
    ];

    const usersWhoBetThisCelebrity = bets.map((b) => b.user);

    const points = celebrity.birth
        ? calculPointByCelebrity(celebrity.birth, celebrity.death ?? new Date())
        : 0;

    useEffect(() => {
        router.replace(`/celebrities/${celebrity.id}/?year=${encodeURIComponent(selectedTab)}`);
    }, [selectedTab]);

    return (
        <>
            {mode === "consultation" && (
                <>
                    <div className="flex flex-col gap-4">
                        <Avatar
                            isBordered
                            src={celebrity.photo ?? undefined}
                            name={celebrity.name}
                            radius="md"
                            className="w-full h-56 text-large"
                        />

                        <div className="text-3xl font-bold">{celebrity.name}</div>

                        <div className="flex flex-row items-center gap-2">
                            <Chip
                                className="capitalize"
                                color={celebrity.death ? "danger" : "success"}
                                variant="flat"
                            >
                                {celebrity.death ? "Décédé" : "En vie"}
                            </Chip>

                            <Popover placement="bottom" backdrop="blur">
                                <PopoverTrigger>
                                    <Chip className="capitalize" color="default" variant="flat">
                                        {`${dayjs(celebrity.death || undefined).diff(
                                            celebrity.birth,
                                            "year"
                                        )} ans`}
                                    </Chip>
                                </PopoverTrigger>
                                <PopoverContent className="p-1">
                                    <Card
                                        shadow="none"
                                        className="max-w-[250px] border-none bg-transparent"
                                    >
                                        <CardBody>
                                            <p className="flex flex-row gap-1">
                                                <span>
                                                    {celebrity.birth
                                                        ? dayjs(celebrity.birth).format(
                                                              "DD/MM/YYYY"
                                                          )
                                                        : ""}
                                                </span>
                                                <span>-</span>
                                                <span>
                                                    {celebrity.death
                                                        ? dayjs(celebrity.death).format(
                                                              "DD/MM/YYYY"
                                                          )
                                                        : ""}
                                                </span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </PopoverContent>
                            </Popover>

                            <Chip className="capitalize" color="warning" variant="flat">
                                {celebrity.birth && `${points} point${points > 1 ? "s" : ""}`}
                            </Chip>
                        </div>
                    </div>

                    <Divider className="my-1" />

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
                            <Tab key={item.id} title={item.label}>
                                <Card>
                                    <CardHeader className="flex flex-col">
                                        <p className="text-lg font-medium text-center">
                                            {`${usersWhoBetThisCelebrity?.length} Pari${
                                                usersWhoBetThisCelebrity?.length > 1 ? "s" : ""
                                            }`}
                                        </p>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <Table removeWrapper hideHeader>
                                            <TableHeader>
                                                <TableColumn>Nom</TableColumn>
                                                <TableColumn>Points</TableColumn>
                                                <TableColumn>Classement</TableColumn>
                                                <TableColumn>Action</TableColumn>
                                            </TableHeader>
                                            <TableBody
                                                items={usersWhoBetThisCelebrity}
                                                emptyContent="Aucun paris pour l'année sélectionnée"
                                            >
                                                {(item) => {
                                                    const currentBet = rankedBets.find(
                                                        (b) => b.userId === item.id
                                                    );

                                                    const index = findIndex(
                                                        rankedBets,
                                                        (b) => b.total === currentBet?.total
                                                    );

                                                    return (
                                                        <TableRow key={item.id}>
                                                            <TableCell>
                                                                <User
                                                                    name={`${item.firstname} ${
                                                                        item.lastname ?? ""
                                                                    }`}
                                                                    avatarProps={{
                                                                        radius: "full",
                                                                        size: "sm",
                                                                        src: item.image ?? undefined
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-center text-xs font-light">
                                                                {`${currentBet?.total} Pts`}
                                                            </TableCell>
                                                            <TableCell className="text-center text-xs font-light">
                                                                {`${index + 1}${
                                                                    index + 1 === 1 ? "er" : "ème"
                                                                }`}
                                                            </TableCell>
                                                            <TableCell className="">
                                                                <Button
                                                                    isIconOnly
                                                                    href={`/bets/${currentBet?.id}`}
                                                                    as={Link}
                                                                    color="primary"
                                                                    showAnchorIcon
                                                                    variant="flat"
                                                                    size="sm"
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }}
                                            </TableBody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Tab>
                        )}
                    </Tabs>
                </>
            )}

            {isAdmin && mode === "consultation" && (
                <div className="flex justify-center">
                    <Button color="primary" onPress={() => setMode("editing")}>
                        Modifier
                    </Button>
                </div>
            )}

            {isAdmin && mode === "editing" && (
                <CelebrityUpdate celebrity={celebrity} onBack={() => setMode("consultation")} />
            )}
        </>
    );
}
