import { listBetsByYear } from "@/lib/api/bet";
import { findIndex, sortBy } from "lodash";

export async function RankBetsByYearWithTotalPoints(year: number) {
    const bets = await listBetsByYear(year);

    const totals = bets?.map((b) => {
        const total = b.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);
        return {
            ...b,
            total
        };
    });

    return sortBy(totals, (b) => b.total && b.user.firstname);
}

export async function GetPositionOfUserForYear(userId: string, year: number) {
    const bets = await RankBetsByYearWithTotalPoints(year);
    const index = findIndex(bets, (b) => b.userId === userId);
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
