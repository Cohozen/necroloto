"use server";

import { insertBetWithCelebrities, listBetsByYear } from "@/lib/api/bet";
import { findIndex, sortBy } from "lodash";
import { revalidatePath } from "next/cache";

export type sortByRank = "points" | "death";

export async function RankBetsByYearWithTotalPoints(year: number, sort: sortByRank) {
    const bets = await listBetsByYear(year);

    const totals = bets?.map((b) => {
        const total = b.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);
        return {
            ...b,
            total
        };
    });

    if (sort === "death")
        return sortBy(
            totals,
            (b) => b.CelebritiesOnBet.filter((c) => !!c.celebrity.death).length
        ).reverse();

    return sortBy(totals, (b) => b.total).reverse();
}

export async function GetPositionOfUserForYear(userId: string, year: number, sort: sortByRank) {
    const bets = await RankBetsByYearWithTotalPoints(year, sort);

    const currentBet = bets.find((b) => b.userId === userId);
    const currentTotal =
        currentBet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0) ?? 0;

    if (sort === "death") {
        const currentCelebrities = currentBet?.CelebritiesOnBet.map((c) => c.celebrity);
        const currentInLife = currentCelebrities?.filter((c) => !c.death).length;

        return (
            findIndex(
                bets,
                (b) => b.CelebritiesOnBet.filter((c) => !c.celebrity.death).length === currentInLife
            ) + 1
        );
    }

    const index = findIndex(bets, (b) => b.total === currentTotal);
    return index + 1;
}

export async function GetCelebritiesAliveStats(userId: string, year: number) {
    const bets = await listBetsByYear(year);

    const alive = bets.reduce(
        (acc, curr) => acc + curr.CelebritiesOnBet.filter((c) => !c.celebrity.death).length,
        0
    );

    const aliveAverage = Math.round(alive / bets.length);

    const userBet = bets.find((b) => b.userId === userId);
    if (!userBet) return null;

    const userBetAlive = userBet.CelebritiesOnBet.filter((c) => !c.celebrity.death).length;

    const percent = Math.round((userBetAlive * 100) / aliveAverage);

    return percent - 100;
}

export async function createBetWithCelebritiesAction(
    userId: string,
    year: number,
    celebrities: string[]
) {
    const bet = {
        userId: userId,
        year: year
    };

    const result = await insertBetWithCelebrities(bet, celebrities);

    revalidatePath("/bets");

    return result;
}
