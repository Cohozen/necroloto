import React from "react";
import { RankBetsByYearWithTotalPoints, sortByRank } from "@/lib/actions/bet";
import Ranking from "./ranking";

export default async function RankPage({
    searchParams
}: {
    searchParams: Promise<{ sort: string; year: string }>;
}) {
    const { sort, year } = await searchParams;
    const num = isNaN(parseInt(year, 10)) ? 2025 : parseInt(year, 10);

    const bets = await RankBetsByYearWithTotalPoints(num, sort as sortByRank);

    return (
        <div className="flex flex-col p-4">
            <Ranking bets={bets} year={num} />
        </div>
    );
}
