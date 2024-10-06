"use client";

import { Celebrity } from "@prisma/client";
import React, { useEffect, useState } from "react";
import useClerkSWR from "@/utils/hooks/useClerkSWR";
import useDebounce from "@/utils/hooks/useDebounce";
import { WidgetLineIcon } from "@/ui/icons/WidgetLineIcon";
import { ListLineIcon } from "@/ui/icons/ListLineIcon";
import classNames from "classnames";
import CelebrityCard from "@/components/business/celebrity/CelebrityCard";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Input,
    Switch,
    Button,
    Link
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface CelebritiesListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesList({ celebrities }: CelebritiesListProps) {
    const router = useRouter();

    const [searchName, setSearchName] = useState("");
    const [displayMode, setDisplayMode] = useState(false);
    const [open, setOpen] = useState(false);

    // const debouncedSearch = useDebounce(searchName, 500);
    //
    // const { data: celebrities } = useClerkSWR<Celebrity[]>(
    //     `/api/celebrities?name=${debouncedSearch}`
    // );

    const celebritiesSorted =
        celebrities?.sort((a, b) => {
            return a.name.localeCompare(b.name);
        }) ?? [];

    useEffect(() => {
        router.replace(`/celebrities/?q=${encodeURIComponent(searchName)}`);
    }, [searchName]);

    return (
        <div
            className={classNames("flex flex-col gap-4", {
                "py-2 px-4 md:px-24 lg:px-48 xl:px-80": !displayMode
            })}
        >
            <div
                className={classNames("flex flex-row gap-2 justify-between items-center", {
                    "py-2 px-4": displayMode
                })}
            >
                <Input
                    type="text"
                    placeholder="Rechercher"
                    variant="faded"
                    size="sm"
                    radius="full"
                    className="grow"
                    isClearable
                    value={searchName}
                    onValueChange={(v) => setSearchName(v)}
                />

                <Switch
                    size="md"
                    color="default"
                    isSelected={displayMode}
                    onValueChange={setDisplayMode}
                    startContent={<WidgetLineIcon className="h-4 w-4" />}
                    endContent={<ListLineIcon className="h-4 w-4" />}
                />
            </div>

            <div className="flex">
                {!displayMode && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {celebritiesSorted.map((celebrity) => (
                            <CelebrityCard celebrity={celebrity} key={celebrity.id} />
                        ))}
                    </div>
                )}

                {displayMode && (
                    <Table removeWrapper>
                        <TableHeader>
                            <TableColumn>Célébrités</TableColumn>
                            <TableColumn align="center">Etat</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody
                            items={celebritiesSorted}
                            emptyContent={"Aucune célébrité avec cette recherche"}
                        >
                            {(item) => {
                                const old = dayjs(item.death || new Date()).diff(
                                    item?.birth,
                                    "year"
                                );

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <User
                                                avatarProps={{
                                                    radius: "lg",
                                                    src: item.photo || undefined,
                                                    name: item.name
                                                }}
                                                description={`${old} ans`}
                                                name={item.name}
                                            >
                                                {item.name}
                                            </User>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                className="capitalize"
                                                color={item.death ? "danger" : "success"}
                                                size="sm"
                                                variant="flat"
                                            >
                                                {item.death ? "Décédé" : "En vie"}
                                            </Chip>
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                as={Link}
                                                isIconOnly
                                                color="secondary"
                                                showAnchorIcon
                                                variant="solid"
                                                size="sm"
                                                href={`/celebrities/${item.id}`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            }}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
