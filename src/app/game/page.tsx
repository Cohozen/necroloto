import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { BetsWithCelebrities } from "@/lib/types/bet";
import { getBetByUserAndYear } from "@/lib/api/bet";
import UserAvatar from "@/components/business/user/UserAvatar";
import React from "react";
import Link from "next/link";
import { buildUserName } from "@/lib/helpers/user";
import { CalendarIcon } from "@/ui/icons/CalendarIcon";
import { UserHeartIcon } from "@/ui/icons/UserHeartIcon";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { InfoIcon } from "@/ui/icons/InfoIcon";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";

export const metadata = {
    title: "Necroloto | Dashboard"
};

export default async function IndexPage() {
    const user = await currentUser();

    let userDb: User | null = null;

    if (user) {
        userDb = await CreateOrUpdateUserByClerkAuth(user);
    }

    let myBet: BetsWithCelebrities | null = null;

    if (user && user?.externalId) {
        const result = await getBetByUserAndYear(user?.externalId, 2024);
        if (result) myBet = result;
    }

    const totalPoints = myBet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-8 p-4">
                    {userDb && (
                        <div className="flex flex-row gap-4 justify-center px-2 pt-4">
                            <UserAvatar user={userDb} size="w-20" />
                            <div className="flex flex-col justify-center">
                                <span className="text-2xl">{buildUserName(userDb)}</span>
                                <span className="text-sm">{userDb?.email}</span>
                            </div>
                        </div>
                    )}
                    {myBet && (
                        <div className="stats w-full justify-center stats-vertical lg:stats-horizontal bg-primary text-primary-content shadow-lg">
                            <div className="stat">
                                <div className="stat-figure text-primary-content">
                                    <CalendarIcon className="h-10 w-10 text-secondary" />
                                </div>
                                <div className="stat-title text-primary-content">Année</div>
                                <div className="stat-value">2024</div>
                                <div className="stat-desc text-primary-content">En cours</div>
                            </div>
                            <div className="stat border-t-primary-content">
                                <div className="stat-figure text-primary-content">
                                    <UserHeartIcon className="h-10 w-10 text-secondary" />
                                </div>
                                <div className="stat-title text-primary-content">Encore en vie</div>
                                <div className="stat-value">
                                    {
                                        myBet.CelebritiesOnBet.filter((cb) => !cb.celebrity.death)
                                            .length
                                    }
                                    <span className="text-sm pl-1">célébrités</span>
                                </div>
                                <div className="stat-desc text-primary-content">
                                    18% de plus que la moyenne
                                </div>
                            </div>

                            <div className="stat border-t-primary-content">
                                <div className="stat-figure text-primary-content">
                                    <RankingIcon className="h-10 w-10 text-secondary" />
                                </div>
                                <div className="stat-title text-primary-content">Score</div>
                                <div className="stat-value">
                                    {totalPoints}
                                    <span className="text-sm pl-1">points</span>
                                </div>
                                <div className="stat-desc text-primary-content">
                                    1er au classement
                                </div>
                            </div>
                        </div>
                    )}
                    {myBet ? (
                        <div role="alert" className="alert shadow-lg">
                            <InfoIcon className="h-6 w-6" />
                            <div>
                                <h3 className="font-bold">{"Vous avez déjà parier pour 2024"}</h3>
                                <div className="text-xs">
                                    {"Le parie pour l'année 2024 est déjà enregistré"}
                                </div>
                            </div>
                            <Link href={`/game/bets/${myBet.id}`}>
                                <button className="btn btn-sm">Voir le pari</button>
                            </Link>
                        </div>
                    ) : (
                        <div role="alert" className="alert shadow-lg">
                            <InfoIcon className="h-6 w-6" />
                            <div>
                                <h3 className="font-bold">Aucun pari pour 2024</h3>
                                <div className="text-xs">
                                    {"Vous pouvez parier dès maintenant pour l'année 2024"}
                                </div>
                            </div>
                            <Link href="/game/bet">
                                <button className="btn btn-sm">Parier</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
