import { getBetWithCelebrities } from "@/lib/api/bet";
import dayjs from "dayjs";
import { currentUser } from "@clerk/nextjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import React from "react";

import { sortBy } from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    const bet = await getBetWithCelebrities(params.id);

    const celebrities = bet?.CelebritiesOnBet.map((c) => c.celebrity);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col p-4 gap-4 items-center">
                <div className="flex text-2xl font-bold">
                    {user?.externalId === bet?.userId
                        ? `Détails de votre pari ${bet?.year}`
                        : `Détails du pari ${bet?.year}`}
                </div>

                <table className="table">
                    <tbody>
                        {celebrities &&
                            sortBy(celebrities, (c) => c.death && c.name).map(
                                (celebrity, index) => (
                                    <tr key={celebrity.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <CelebrityAvatar
                                                    celebrity={celebrity}
                                                    size="w-12"
                                                    indicator
                                                />
                                                <div>
                                                    <div className="font-bold truncate">
                                                        {celebrity.name}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {celebrity.birth
                                                            ? `${dayjs().diff(
                                                                  celebrity.birth,
                                                                  "year"
                                                              )} ans`
                                                            : "-"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{celebrity.death ? "2 pts" : "-"}</td>
                                        {/*<th>*/}
                                        {/*    <button className="btn btn-ghost btn-xs">details</button>*/}
                                        {/*</th>*/}
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
