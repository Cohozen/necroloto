"use client";

import React from "react";

import { Celebrity } from "@prisma/client";
import {
    Button,
    Chip,
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import dayjs from "dayjs";

interface CelebritiesTableProps {
    celebrities: Celebrity[];
    hideHeader?: boolean;
}

export default function CelebritiesTable({ celebrities, hideHeader }: CelebritiesTableProps) {
    return (
        <Table removeWrapper hideHeader={hideHeader}>
            <TableHeader>
                <TableColumn>Célébrités</TableColumn>
                <TableColumn align="center">Etat</TableColumn>
                <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody items={celebrities} emptyContent={"Aucune célébrité"}>
                {(item) => {
                    const old = dayjs(item.death || new Date()).diff(item?.birth, "year");

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
                                    color="primary"
                                    showAnchorIcon
                                    variant="flat"
                                    size="sm"
                                    radius="md"
                                    href={`/celebrities/${item.id}`}
                                />
                            </TableCell>
                        </TableRow>
                    );
                }}
            </TableBody>
        </Table>
    );
}
