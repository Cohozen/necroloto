import React from "react";
import Link from "next/link";
import UserAvatar from "@/components/business/user/UserAvatar";
import { buildUserName } from "@/lib/helpers/user";
import { MedalStarIcon } from "@/ui/icons/MedalStarIcon";
import { CupFirstIcon } from "@/ui/icons/CupFirstIcon";
import { MedalRibbonsIcon } from "@/ui/icons/MedalRibbonsIcon";
import { RankBetsByYearWithTotalPoints } from "@/lib/actions/bet";

export default async function Page() {
    const bets = await RankBetsByYearWithTotalPoints(2024);

    return (
        <main className="flex-1 flex flex-col gap-8 overflow-auto">
            <div className="flex flex-col items-center gap-6 p-4">
                <div className="flex text-2xl font-bold">Classement 2024</div>
            </div>

            <div className="flex flex-row justify-center items-end">
                <div className="flex flex-col items-center gap-2">
                    {bets[2]?.user && (
                        <Link href={`/game/bets/${bets[2].id}`}>
                            <UserAvatar user={bets[2].user} />
                        </Link>
                    )}
                    <div className="flex justify-center items-start py-4 bg-primary/40 h-16 w-20 rounded-tl-xl">
                        <MedalStarIcon className="w-8 h-8 text-orange-800 hover:animate-bounce" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {bets[0].user && (
                        <Link href={`/game/bets/${bets[0].id}`}>
                            <UserAvatar user={bets[0].user} />{" "}
                        </Link>
                    )}
                    <div className="flex justify-center items-start py-4 bg-primary/80 h-44 w-20 rounded-t-xl">
                        <CupFirstIcon className="w-12 h-12 text-amber-300/80 hover:animate-bounce" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {bets[1]?.user && (
                        <Link href={`/game/bets/${bets[1].id}`}>
                            <UserAvatar user={bets[1].user} />
                        </Link>
                    )}
                    <div className="flex justify-center items-start py-4 bg-primary/60 h-28 w-20 rounded-tr-xl">
                        <MedalRibbonsIcon className="w-10 h-10 text-gray-500 hover:animate-bounce" />
                    </div>
                </div>
            </div>

            <table className="table text-base-content w-full">
                <tbody>
                    {bets &&
                        bets.map((bet, index) => {
                            return (
                                <tr key={bet.id}>
                                    <td>
                                        <div className="w-8 h-8 rounded-full text-base-content border border-primary-content flex justify-center items-center">
                                            <span>{index + 1}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <Link key={bet.id} href={`/game/bets/${bet.id}`}>
                                            <div className="flex items-center gap-3">
                                                <UserAvatar user={bet.user} size="w-12" />
                                                <div className="flex flex-col">
                                                    <div className="font-bold">
                                                        {buildUserName(bet.user)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td>{bet.total ? `${bet.total} pts` : "-"}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </main>
    );
}
