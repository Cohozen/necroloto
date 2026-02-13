import React from "react";
import { RankBetsByYearWithTotalPoints, sortByRank } from "@/lib/actions/bet";
import Ranking from "./ranking";

export default async function RankPage({
    searchParams,
    params
}: {
    searchParams: Promise<{ sort: string; year: string }>;
    params: { id: string };
}) {
    const { sort, year } = await searchParams;
    const num = isNaN(parseInt(year, 10)) ? 2026 : parseInt(year, 10);

    const bets = await RankBetsByYearWithTotalPoints(num, params.id, sort as sortByRank);

    return (
        <div className="flex flex-col p-4">
            <Ranking bets={bets} year={num} circleId={params.id} />
        </div>
    );
}
