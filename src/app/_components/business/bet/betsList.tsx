"use client";

import React, { useEffect, useState } from "react";
import { BetsWithUserAndCelebrities } from "@/lib/types/bet";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import BetCard from "@/components/business/bet/betCard";

interface BetsListProps {
    bets: BetsWithUserAndCelebrities[];
}

export async function BetsList({ bets }: BetsListProps) {
    const router = useRouter();

    const [year, setYear] = useState("2024");

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
        router.replace(`/bets/?year=${encodeURIComponent(year)}`);
    }, [year]);

    return (
        <>
            <Select
                selectionMode="single"
                label="Année"
                disallowEmptySelection
                variant="bordered"
                radius="lg"
                fullWidth
                selectedKeys={[year]}
                disabledKeys={["2025"]}
                onChange={(event) => setYear(event.target.value)}
                items={yearSelect}
            >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {bets.map((b) => {
                    return <BetCard key={b.id} bet={b} />;
                })}
            </div>
        </>
    );
}
