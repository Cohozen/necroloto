import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";
import { GetPositionOfUserForYear } from "@/lib/actions/bet";
import { Button, Link } from "@nextui-org/react";
import { listCirclesByUserWithBets } from "@/lib/api/circle";
import CircleCard from "@/components/business/circle/CircleCard";

export default async function IndexPage() {
    const user = await currentUser();

    const currentYear = 2025;

    let myCircles = null;

    if (user) await CreateOrUpdateUserByClerkAuth(user);

    if (user?.externalId) {
        myCircles = await listCirclesByUserWithBets(user?.externalId);
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold mb-2 lg:mb-4 uppercase">Nouveau cercle ?</div>

                <div className="flex flex-row w-full gap-2">
                    <Button
                        color="primary"
                        href={`/rank?year=${currentYear}`}
                        as={Link}
                        variant="flat"
                        size="lg"
                        showAnchorIcon
                        className="flex flex-col basis-1/2 h-28 lg:h-40 lg:text-xl"
                        isDisabled
                    >
                        Créer
                    </Button>

                    <Button
                        color="primary"
                        href={`/rank?year=${currentYear}`}
                        as={Link}
                        variant="flat"
                        size="lg"
                        showAnchorIcon
                        className="flex flex-col basis-1/2 h-28 lg:h-40 lg:text-xl"
                        isDisabled
                    >
                        Rejoindre
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold mb-2 lg:mb-4 uppercase">Mes cercles</div>
                <div className="text-md font-light">{`${myCircles?.length} cercle${myCircles && myCircles?.length > 1 ? "s" : ""}`}</div>

                <div className="flex flex-row w-full gap-2">
                    {myCircles &&
                        myCircles.map(async (c) => {
                            let currentRank = 0;
                            const myCurrentBet = c.bets.find((b) => b.userId === user?.externalId);

                            if (myCurrentBet) {
                                currentRank = await GetPositionOfUserForYear(
                                    myCurrentBet.userId,
                                    myCurrentBet.year,
                                    c.id,
                                    "points"
                                );
                            }

                            return <CircleCard key={c.id} circle={c} currentRank={currentRank} />;
                        })}
                </div>
            </div>
        </div>
    );
}
