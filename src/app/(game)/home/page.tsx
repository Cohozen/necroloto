import { currentUser } from "@clerk/nextjs/server";
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
import { GetCelebritiesAliveStats, GetPositionOfUserForYear } from "@/lib/actions/bet";

export const metadata = {
    title: "Necroloto | Accueil"
};

export default async function IndexPage() {
    const user = await currentUser();

    const year = 2024;

    let position: number = 0;
    let aliveStats: number | null = null;
    let userDb: User | null = null;

    if (user) {
        userDb = await CreateOrUpdateUserByClerkAuth(user);
    }

    let myBet: BetsWithCelebrities | null = null;

    if (userDb) {
        const result = await getBetByUserAndYear(userDb.id, year);
        if (result) myBet = result;

        position = await GetPositionOfUserForYear(userDb.id, year, "points");
        aliveStats = await GetCelebritiesAliveStats(userDb.id, year);
    }

    const totalPoints = myBet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <main className="flex flex-1">
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-8 lg:gap-16 p-4">
                    {userDb && (
                        <div className="flex flex-row gap-4 justify-center px-2 pt-4">
                            <UserAvatar user={userDb} size="w-20" />
                            <div className="flex flex-col justify-center">
                                <span className="text-[28px]">{buildUserName(userDb)}</span>
                                <span className="text-[14px]">{userDb?.email}</span>
                            </div>
                        </div>
                    )}
                    {myBet && (
                        <div className="stats w-full justify-center stats-vertical lg:stats-horizontal bg-primary text-primary-content shadow-lg">
                            <div className="stat">
                                <div className="stat-figure text-primary-content">
                                    <CalendarIcon className="h-10 w-10 text-accent" />
                                </div>
                                <div className="stat-title text-primary-content">Année</div>
                                <div className="stat-value">2024</div>
                                <div className="stat-desc text-primary-content">En cours</div>
                            </div>

                            <div className="stat border-t-primary-content">
                                <div className="stat-figure text-primary-content">
                                    <UserHeartIcon className="h-10 w-10 text-accent" />
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
                                    {aliveStats !== null ? (
                                        <>
                                            {aliveStats === 0 && "Autant que la moyenne"}
                                            {aliveStats > 0 &&
                                                `${aliveStats}% de plus que la moyenne`}
                                            {aliveStats < 0 &&
                                                `${Math.abs(aliveStats)}% de moins que la moyenne`}
                                        </>
                                    ) : null}
                                </div>
                            </div>

                            <div className="stat border-t-primary-content">
                                <div className="stat-figure text-primary-content">
                                    <RankingIcon className="h-10 w-10 text-accent" />
                                </div>
                                <div className="stat-title text-primary-content">Score</div>
                                <div className="stat-value">
                                    {totalPoints}
                                    <span className="text-sm pl-1">points</span>
                                </div>
                                <div className="stat-desc text-primary-content">
                                    {position > 0 ? (
                                        <>
                                            {position === 1
                                                ? `${position}er au classement`
                                                : `${position}ème au classement`}
                                        </>
                                    ) : null}
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
                            <Link href={`/bets/${myBet.id}`} className="btn btn-sm">
                                Voir le pari
                            </Link>
                        </div>
                    ) : (
                        <div role="alert" className="alert shadow-lg">
                            <InfoIcon className="h-6 w-6" />
                            <div>
                                <h3 className="font-bold">Aucun pari pour 2024</h3>
                                <div className="text-xs">
                                    {/*{"Vous pouvez parier dès maintenant pour l'année 2024"}*/}
                                    {
                                        "Malheureusement, il est trop tard pour faire votre pari pour l'année 2024, revenez plus tard !"
                                    }
                                </div>
                            </div>
                            {/*<Link href="/bet">*/}
                            {/*    <button className="btn btn-sm">Parier</button>*/}
                            {/*</Link>*/}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
