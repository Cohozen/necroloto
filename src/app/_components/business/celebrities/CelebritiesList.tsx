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
import CelebritiesTable from "@/components/business/celebrities/CelebritiesTable";

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
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 justify-between items-center">
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

                {displayMode && <CelebritiesTable celebrities={celebritiesSorted} />}
            </div>
        </div>
    );
}
