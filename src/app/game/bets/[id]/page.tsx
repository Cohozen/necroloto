import { getBetWithCelebrities } from "@/lib/api/bet";
import dayjs from "dayjs";
import { currentUser } from "@clerk/nextjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import React from "react";

import { sortBy } from "lodash";
import UserAvatar from "@/components/business/user/UserAvatar";
import { buildUserName } from "@/lib/helpers/user";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    const bet = await getBetWithCelebrities(params.id);

    const celebrities = bet?.CelebritiesOnBet.map((c) => c.celebrity);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col p-4 gap-4 items-start">
                {bet && (
                    <div className="flex flex-row gap-4 justify-center px-2">
                        <UserAvatar user={bet.user} size="w-12" />
                        <div className="flex flex-col justify-center">
                            <span className="text-xl">{buildUserName(bet.user)}</span>
                            <span className="text-xs">
                                {dayjs(bet.createdAt).format("DD/MM/YYYY HH:mm")}
                            </span>
                        </div>
                    </div>
                )}

                <div className="flex flex-row px-2 text-2xl">{`Pari pour l'année 2024`}</div>

                {bet && (
                    <div className="flex w-full flex-row px-2 gap-2">
                        <div className="basis-1/2 bg-base-200 p-3 rounded-lg">
                            {`${bet.CelebritiesOnBet.reduce(
                                (acc, curr) => acc + curr.points,
                                0
                            )} point(s)`}
                        </div>

                        <div className="basis-1/2 bg-base-200 p-3 rounded-lg">
                            {`${celebrities?.filter((c) => !c.death).length} en vie`}
                        </div>
                    </div>
                )}

                <div className="divider">Célébrités</div>

                <table className="table table-zebra">
                    <tbody>
                        {bet &&
                            sortBy(
                                bet.CelebritiesOnBet,
                                (c) => c.celebrity.death && c.celebrity.name
                            ).map((celebritiesOnBet, index) => (
                                <tr key={celebritiesOnBet.celebrity.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <CelebrityAvatar
                                                celebrity={celebritiesOnBet.celebrity}
                                                size="w-12"
                                                indicator
                                            />
                                            <div>
                                                <div className="font-bold truncate">
                                                    {celebritiesOnBet.celebrity.name}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {celebritiesOnBet.celebrity.birth
                                                        ? `${dayjs(
                                                              celebritiesOnBet.celebrity.death ||
                                                                  undefined
                                                          ).diff(
                                                              celebritiesOnBet.celebrity.birth,
                                                              "year"
                                                          )} ans`
                                                        : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        {celebritiesOnBet.celebrity.death
                                            ? `${celebritiesOnBet.points} pts`
                                            : "-"}
                                    </td>
                                    {/*<th>*/}
                                    {/*    <button className="btn btn-ghost btn-xs">details</button>*/}
                                    {/*</th>*/}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
