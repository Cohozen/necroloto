"use client";

import { Celebrity } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { WidgetLineIcon } from "@/ui/icons/WidgetLineIcon";
import { ListLineIcon } from "@/ui/icons/ListLineIcon";
import CelebrityCard from "@/components/business/celebrity/CelebrityCard";

import { Input, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CelebritiesTable from "@/components/business/celebrities/CelebritiesTable";

interface CelebritiesListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesList({ celebrities }: CelebritiesListProps) {
    const router = useRouter();

    const [searchName, setSearchName] = useState("");
    const [displayMode, setDisplayMode] = useState(true);

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
                    variant="bordered"
                    color="default"
                    radius="full"
                    className="grow"
                    isClearable
                    value={searchName}
                    onValueChange={(v) => setSearchName(v)}
                />

                <Switch
                    size="lg"
                    color="default"
                    isSelected={displayMode}
                    onValueChange={setDisplayMode}
                    startContent={<WidgetLineIcon className="h-4 w-4" />}
                    endContent={<ListLineIcon className="h-4 w-4" />}
                />
            </div>

            <div className="flex">
                {!displayMode && (
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                        {celebritiesSorted.map((celebrity) => (
                            <CelebrityCard celebrity={celebrity} key={celebrity.id} />
                        ))}
                    </div>
                )}

                {displayMode && <CelebritiesTable hideHeader celebrities={celebritiesSorted} />}
            </div>
        </div>
    );
}
