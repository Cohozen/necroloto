import { getBetWithCelebrities } from "@/lib/api/bet";
import dayjs from "dayjs";
import { currentUser } from "@clerk/nextjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import React from "react";

import { sortBy } from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    const bet = await getBetWithCelebrities(params.id);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col p-4 gap-4 items-center">
                <div className="flex text-2xl font-bold">
                    {user?.externalId === bet?.userId
                        ? `Détail de votre pari ${bet?.year}`
                        : `Détail du pari ${bet?.year}`}
                </div>

                <table className="table">
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
