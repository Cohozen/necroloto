import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getCelebrity } from "@/lib/api/celebrity";
import Celebrity from "./celebrity";
import { listBets } from "@/lib/api/bet";
import { BetsWithUserAndCelebritiesOnBet } from "@/lib/types/bet";
import { RankBetsByYearWithTotalPoints } from "@/lib/actions/bet";

export default async function Page({
    params,
    searchParams
}: {
    params: { id: string };
    searchParams: Promise<{ year: string }>;
}) {
    const user = await currentUser();

    let isAdmin = false;

    if (user) {
        const roles = user.publicMetadata?.roles as string[];
        if (roles) isAdmin = roles.some((r) => r === "admin");
    }

    const year = (await searchParams).year;
    const num = isNaN(parseInt(year, 10)) ? 2024 : parseInt(year, 10);

    const celebrity = await getCelebrity(params.id);

    let bets: BetsWithUserAndCelebritiesOnBet[] = [];

    if (celebrity) {
        bets = await listBets<BetsWithUserAndCelebritiesOnBet>({
            where: { year: num, CelebritiesOnBet: { some: { celebrityId: celebrity.id } } },
            include: { user: true, CelebritiesOnBet: true }
        });
    }

    const rankedBets = await RankBetsByYearWithTotalPoints(num);

    return (
        <main className="flex-1 overflow-auto p-4 md:px-24 lg:px-48 xl:px-80">
            <div className="flex flex-col gap-4">
                {celebrity && (
                    <Celebrity
                        celebrity={celebrity}
                        bets={bets}
                        rankedBets={rankedBets}
                        isAdmin={isAdmin}
                    />
                )}
            </div>
        </main>
    );
}
