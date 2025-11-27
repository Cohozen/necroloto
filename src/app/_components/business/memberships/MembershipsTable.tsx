"use client";

import React from "react";

import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import dayjs from "dayjs";
import { MembershipWithUser } from "@/lib/types/membership";

interface MembershipsTableProps {
    memberships: MembershipWithUser[];
}

export default function MembershipsTable({ memberships }: MembershipsTableProps) {
    return (
        <Table removeWrapper hideHeader fullWidth>
            <TableHeader>
                <TableColumn>Célébrités</TableColumn>
                <TableColumn align="center">Etat</TableColumn>
                <TableColumn align="end"> </TableColumn>
            </TableHeader>
            <TableBody items={memberships} emptyContent={"Aucun membre"}>
                {(item) => {
                    return (
                        <TableRow key={item.id}>
                            <TableCell>
                                <User
                                    avatarProps={{
                                        radius: "full",
                                        src: item.user.image || undefined,
                                        name: `${item.user.firstname} ${item.user.lastname ?? ""}`,
                                        className: "shrink-0",
                                        size: "sm"
                                    }}
                                    name={`${item.user.firstname} ${item.user.lastname ?? ""}`}
                                >
                                    {`${item.user.firstname} ${item.user.lastname ?? ""}`}
                                </User>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    className="capitalize text-2xs"
                                    color={item.role === "ADMIN" ? "success" : "secondary"}
                                    size="sm"
                                    variant="flat"
                                >
                                    {item.role === "ADMIN" ? "Administrateur" : "Membre"}
                                </Chip>
                            </TableCell>

                            <TableCell className="text-2xs font-light">{dayjs(item.joinedAt).format("DD/MM/YYYY")}</TableCell>
                        </TableRow>
                    );
                }}
            </TableBody>
        </Table>
    );
}
