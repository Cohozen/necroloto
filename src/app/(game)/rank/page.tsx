import React from "react";
import { RankBetsByYearWithTotalPoints, sortByRank } from "@/lib/actions/bet";
import Ranking from "./ranking";

export const metadata = {
    title: "Necroloto | Classement"
};

export default async function RankPage({
    searchParams
}: {
    searchParams: Promise<{ sort: string }>;
}) {
    const sort = (await searchParams).sort;

    const bets = await RankBetsByYearWithTotalPoints(2024, sort as sortByRank);

    return (
        <main className="flex-1 overflow-auto p-4">
            <Ranking bets={bets} />
        </main>
    );
}
