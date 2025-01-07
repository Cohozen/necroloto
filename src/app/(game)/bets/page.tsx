import { BetsWithUserAndCelebrities } from "@/lib/types/bet";
import { listBets } from "@/lib/api/bet";
import React from "react";
import { BetsList } from "@/components/business/bet/betsList";

export default async function BetsPage({
    searchParams
}: {
    searchParams: Promise<{ year: string }>;
}) {
    const { year } = await searchParams;
    const num = isNaN(parseInt(year, 10)) ? 2025 : parseInt(year, 10);

    const bets = await listBets<BetsWithUserAndCelebrities>({
        where: { year: num },
        include: { user: true, CelebritiesOnBet: { include: { celebrity: true } } }
    });

    return (
        <div className="flex flex-col gap-6 p-4">
            <BetsList bets={bets} year={num} />
        </div>
    );
}
