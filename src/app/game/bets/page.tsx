import { BetsWithCelebrities } from "@/lib/types/bet";
import { getBetByUserAndYear } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs";
import { head, last, sortBy } from "lodash";
import React from "react";
import dayjs from "dayjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import Link from "next/link";
import { UserHeartIcon } from "@/ui/icons/UserHeartIcon";
import { CupStarIcon } from "@/ui/icons/CupStarIcon";

export default async function Page() {
    const user = await currentUser();

    let myBet: BetsWithCelebrities | null = null;

    if (user?.externalId) {
        myBet = await getBetByUserAndYear(user?.externalId, 2024);
    }

    const celebrities = myBet?.CelebritiesOnBet.map((c) => c.celebrity);

    const olderCelebrity = head(
        sortBy(celebrities?.filter((c) => c.birth && !c.death), (c) => c.birth)
    );
    const youngerCelebrity = last(sortBy(celebrities?.filter((c) => c.birth), (c) => c.birth));

    const totalPoints = myBet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col items-center gap-6 p-4">
                <div className="flex text-2xl font-bold">Mon pari 2024</div>
                {myBet && celebrities && (
                    <>
                        <div className="flex flex-row gap-8 justify-center px-2 py-4">
                            <div
                                className="radial-progress text-primary"
                                style={{
                                    // @ts-ignore
                                    "--value":
                                        (celebrities.filter((c) => !c.death).length /
                                            celebrities.length) *
                                            100 || 0,
                                    "--size": "8rem",
                                    "--thickness": "10px"
                                }}
                                role="progressbar"
                            >
                                <div className="flex flex-col items-center text-base-content">
                                    <UserHeartIcon className="h-8 w-8 text-accent" />
                                    <span className="font-bold">
                                        {celebrities.filter((c) => !c.death).length} /{" "}
                                        {celebrities.length}
                                    </span>
                                    <span className="text-sm">en vie</span>
                                </div>
                            </div>
                            <div
                                className="radial-progress text-primary"
                                style={{
                                    // @ts-ignore
                                    "--value": "100",
                                    "--size": "8rem",
                                    "--thickness": "10px"
                                }}
                                role="progressbar"
                            >
                                <div className="flex flex-col items-center text-base-content">
                                    <CupStarIcon className="h-8 w-8 text-accent" />
                                    <span className="font-bold">{totalPoints}</span>
                                    <span className="text-sm">points</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex text-2xl font-bold">Aperçu des vivants</div>
                        <div className="flex flex-row gap-8 justify-center px-2">
                            <div>
                                {youngerCelebrity && (
                                    <div className="flex flex-col items-center">
                                        <CelebrityAvatar celebrity={youngerCelebrity} size="w-32" />
                                        <span>Plus jeune</span>
                                        <span>
                                            {youngerCelebrity.birth
                                                ? `${dayjs(
                                                      youngerCelebrity.death || undefined
                                                  ).diff(youngerCelebrity.birth, "year")} ans`
                                                : null}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                {olderCelebrity && (
                                    <div className="flex flex-col items-center">
                                        <CelebrityAvatar celebrity={olderCelebrity} size="w-32" />
                                        <span>Plus vieux</span>
                                        <span>
                                            {olderCelebrity.birth
                                                ? `${dayjs(olderCelebrity.death || undefined).diff(
                                                      olderCelebrity.birth,
                                                      "year"
                                                  )} ans`
                                                : null}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link href={`/game/bets/${myBet.id}`} className="btn btn-primary btn-wide">
                            Détail du pari
                        </Link>
                    </>
                )}
            </div>
        </main>
    );
}
