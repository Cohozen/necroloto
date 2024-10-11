"use client";

import React, { useEffect, useState } from "react";
import { BetsWithUserAndCelebrities, BetsWithUserAndCelebritiesOnBet } from "@/lib/types/bet";
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

            <div className="flex flex-col gap-2">
                {bets.map((b) => {
                    return <BetCard key={b.id} bet={b} />;
                })}
            </div>
        </>
    );
}
