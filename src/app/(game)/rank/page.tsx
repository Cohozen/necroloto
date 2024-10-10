import React from "react";
import { RankBetsByYearWithTotalPoints, sortByRank } from "@/lib/actions/bet";
import Ranking from "./ranking";

export const metadata = {
    title: "Necroloto | Classement"
};

export default async function RankPage({
    searchParams
}: {
    searchParams: Promise<{ sort: string; year: string }>;
}) {
    const { sort, year } = await searchParams;

    const num = isNaN(parseInt(year, 10)) ? 2024 : parseInt(year, 10);

    const bets = await RankBetsByYearWithTotalPoints(num, sort as sortByRank);

    return (
        <main className="flex-1 overflow-auto p-4">
            <Ranking bets={bets} />
        </main>
    );
}
