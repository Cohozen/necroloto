import {
    BetsWithCelebrities,
    BetsWithUserAndCelebrities,
    BetsWithUserAndCelebritiesOnBet
} from "@/lib/types/bet";
import { getBetByUserAndYear, listBets } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs/server";
import { head, last, sortBy } from "lodash";
import React from "react";
import dayjs from "dayjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import Link from "next/link";
import { UserHeartIcon } from "@/ui/icons/UserHeartIcon";
import { CupStarIcon } from "@/ui/icons/CupStarIcon";
import { InfoIcon } from "@/ui/icons/InfoIcon";
import { BetsList } from "@/components/business/bet/betsList";

export const metadata = {
    title: "Necroloto | Paris"
};

export default async function BetsPage({
    searchParams
}: {
    searchParams: Promise<{ year: string }>;
}) {
    const user = await currentUser();

    const year = (await searchParams).year;
    const num = isNaN(parseInt(year, 10)) ? 2024 : parseInt(year, 10);

    const bets = await listBets<BetsWithUserAndCelebrities>({
        where: { year: num },
        include: { user: true, CelebritiesOnBet: { include: { celebrity: true } } }
    });

    return (
        <main className="flex-1 overflow-auto">
            <BetsList bets={bets} />
        </main>
    );
}
