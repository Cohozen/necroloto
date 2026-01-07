import { currentUser } from "@clerk/nextjs/server";
import { BetsWithCelebrities, BetsWithUserAndCelebrities } from "@/lib/types/bet";
import { getBetByUserAndYearAndCircle, listBets } from "@/lib/api/bet";
import React from "react";
import { GetPositionOfUserForYear } from "@/lib/actions/bet";
import { Card, CardBody, Button, Link } from "@nextui-org/react";
import { SearchCelebrities } from "@/lib/api/celebrity";
import { getCircle } from "@/lib/api/circle";
import CurrentBet from "./currentBet";

export default async function CirclePage({ params }: { params: { id: string } }) {
    const user = await currentUser();

    // TODO Check membership current user

    const circleId = params.id;
    const currentYear = 2025;

    let currentRank = 0;

    const circle = await getCircle(circleId);
    if (!circle) throw new Error(`Circle with id ${circleId} not found`);

    const bets = await listBets<BetsWithUserAndCelebrities>({
        where: { year: currentYear, circleId },
        include: { user: true, CelebritiesOnBet: { include: { celebrity: true } } }
    });

    const searchResult = await SearchCelebrities("", false, true);
    const deadCelebrities = searchResult.filter(
        (c) => c.death && new Date(c.death).getFullYear() === currentYear
    );

    const myCurrentBet = bets.find((b) => b.userId === user?.externalId);

    if (myCurrentBet) {
        currentRank = await GetPositionOfUserForYear(
            myCurrentBet.userId,
            myCurrentBet.year,
            circleId,
            "points"
        );
    }

    const currentNewBet: BetsWithCelebrities | null = user?.externalId
        ? await getBetByUserAndYearAndCircle(user.externalId, currentYear + 1, params.id)
        : null;

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold mb-2 lg:mb-4 uppercase">
                    Prédiction en cours
                </div>

                <div className="flex flex-row w-full gap-2">
                    <Card shadow="none" className="basis-1/2 h-32 lg:h-44 border-2 bg-background">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-3xl">{currentYear}</span>
                        </CardBody>
                    </Card>
                    <Card shadow="none" className="basis-1/2 h-32 lg:h-44">
                        <CardBody className="justify-center">
                            <span className="text-center lg:text-xl">Prédictions fermés</span>
                        </CardBody>
                    </Card>
                </div>

                <div className="flex flex-row w-full gap-2">
                    <Card
                        shadow="none"
                        className="basis-1/2 h-32 lg:h-44 border-none bg-gradient-to-br from-primary to-secondary text-white"
                    >
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-4xl">{bets.length}</span>
                            <span>{`Prédiction${bets.length > 1 ? "s" : ""}`}</span>
                        </CardBody>
                    </Card>
                    <Card
                        shadow="none"
                        className="basis-1/2 h-32 lg:h-44 border-none bg-gradient-to-br from-primary to-secondary text-white"
                    >
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-4xl">{deadCelebrities.length}</span>
                            <span>Décès</span>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold mb-2 lg:mb-4 uppercase">
                    Prochaine prédiction
                </div>

                <div className="flex flex-row w-full gap-2">
                    <Card shadow="none" className="basis-1/2 h-32 lg:h-44 border-2 bg-background">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-3xl">{currentYear + 1}</span>
                        </CardBody>
                    </Card>
                    {circle.allowNewBet && (
                        <Button
                            color="primary"
                            href={`/circles/${circleId}/bet/${currentYear + 1}`}
                            as={Link}
                            variant="flat"
                            size="lg"
                            showAnchorIcon
                            className="flex flex-col basis-1/2 h-32 lg:h-44 lg:text-xl"
                        >
                            {currentNewBet ? "Modifier" : "Prédire"}
                        </Button>
                    )}
                    {!circle.allowNewBet && (
                        <Card shadow="none" className="basis-1/2 h-32 lg:h-44">
                            <CardBody className="justify-center">
                                <span className="text-center lg:text-xl">
                                    {new Date().getFullYear() === currentYear
                                        ? "A venir"
                                        : "Passée"}
                                </span>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>

            {myCurrentBet && (
                <div className="flex flex-col gap-4 mt-4">
                    <div className="text-[28px] font-semibold mb-3 lg:mb-4">Ma prediction</div>

                    <div className="flex flex-row">
                        <CurrentBet bet={myCurrentBet} rank={currentRank} />
                    </div>
                </div>
            )}
        </div>
    );
}
