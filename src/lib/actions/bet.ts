"use server";

import { insertBetWithCelebrities, listBetsByYear, listBetsByYearAndCircle } from "@/lib/api/bet";
import { sortBy } from "lodash";
import { revalidatePath } from "next/cache";

export type sortByRank = "points" | "death";

export async function RankBetsByYearWithTotalPoints(
    year: number,
    circleId: string,
    sort: sortByRank
) {
    const bets = await listBetsByYearAndCircle(year, circleId);

    const totals = bets?.map((b) => {
        const total = b.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);
        const deathCount = b.CelebritiesOnBet.filter((c) => !!c.celebrity.death).length;
        return {
            ...b,
            total,
            deathCount
        };
    });

    const sorted =
        sort === "death"
            ? sortBy(totals, (b) => b.deathCount).reverse()
            : sortBy(totals, (b) => b.total).reverse();

    let currentRank = 1;

    return sorted.map((bet, index) => {
        if (index > 0) {
            const prevBet = sorted[index - 1];
            const currentValue = sort === "death" ? bet.deathCount : bet.total;
            const prevValue = sort === "death" ? prevBet.deathCount : prevBet.total;

            if (currentValue !== prevValue) currentRank = currentRank + 1;
        }

        return {
            ...bet,
            rank: currentRank
        };
    });
}

export async function GetPositionOfUserForYear(
    userId: string,
    year: number,
    circleId: string,
    sort: sortByRank
) {
    const bets = await RankBetsByYearWithTotalPoints(year, circleId, sort);

    const currentBet = bets.find((b) => b.userId === userId);

    return currentBet?.rank ?? 0;
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
