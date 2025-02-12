import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getCelebrity, SearchCelebrities } from "@/lib/api/celebrity";
import Celebrity from "./celebrity";
import { listBets } from "@/lib/api/bet";
import { BetsWithUserAndCelebritiesOnBet } from "@/lib/types/bet";
import { RankBetsByYearWithTotalPoints } from "@/lib/actions/bet";

export default async function CelebrityPage({
    params,
    searchParams
}: {
    params: { id: string };
    searchParams: Promise<{ year: string }>;
}) {
    const user = await currentUser();
    const { year } = await searchParams;

    let isAdmin = false;

    if (user) {
        const roles = user.publicMetadata?.roles as string[];
        if (roles) isAdmin = roles.some((r) => r === "admin");
    }

    const celebrity = await getCelebrity(params.id);
    const yearOfDeath = celebrity?.death ? new Date(celebrity.death).getFullYear() : 2025;

    let num = isNaN(parseInt(year, 10)) ? yearOfDeath : parseInt(year, 10);
    if (yearOfDeath < num) num = yearOfDeath;

    let bets: BetsWithUserAndCelebritiesOnBet[] = [];

    if (celebrity) {
        bets = await listBets<BetsWithUserAndCelebritiesOnBet>({
            where: { year: num, CelebritiesOnBet: { some: { celebrityId: celebrity.id } } },
            include: { user: true, CelebritiesOnBet: true }
        });
    }

    const rankedBets = await RankBetsByYearWithTotalPoints(num, "points");

    const celebrities = await SearchCelebrities("", true, true);
    const celebritiesSorted =
        celebrities
            ?.filter((c) => c.id !== params.id && !c.death)
            ?.sort((a, b) => {
                return a.name.localeCompare(b.name);
            }) ?? [];

    return (
        <div className="flex flex-col p-4 gap-4">
            {celebrity && (
                <Celebrity
                    celebrity={celebrity}
                    celebrities={celebritiesSorted}
                    bets={bets}
                    rankedBets={rankedBets}
                    isAdmin={isAdmin}
                    year={num}
                />
            )}
        </div>
    );
}
