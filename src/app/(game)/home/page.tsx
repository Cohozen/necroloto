import { currentUser } from "@clerk/nextjs/server";
import { BetsWithUserAndCelebrities } from "@/lib/types/bet";
import { listBets } from "@/lib/api/bet";
import React from "react";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";
import { GetPositionOfUserForYear } from "@/lib/actions/bet";
import { Card, CardBody, Button, Link } from "@nextui-org/react";
import { SearchCelebrities } from "@/lib/api/celebrity";
import CurrentBet from "./currentBet";

export default async function IndexPage() {
    const user = await currentUser();

    const currentYear = 2025;
    //const allowNewBet = process.env.ALLOW_NEW_BET;

    let currentRank = 0;

    if (user) await CreateOrUpdateUserByClerkAuth(user);

    const bets = await listBets<BetsWithUserAndCelebrities>({
        where: { year: currentYear },
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
            "points"
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-6">
                <div className="text-[28px] font-semibold mb-3 lg:mb-4">Prédiction en cours</div>

                <div className="flex flex-row w-full gap-2">
                    <Card shadow="none" className="basis-1/3 h-28 lg:h-40 border-2 bg-background">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-3xl">{currentYear}</span>
                        </CardBody>
                    </Card>
                    <Card shadow="none" className="basis-1/3 h-28 lg:h-40">
                        <CardBody className="justify-center">
                            <span className="text-center lg:text-xl">Prédictions fermés</span>
                        </CardBody>
                    </Card>

                    <Button
                        color="primary"
                        href={`/rank?year=${currentYear}`}
                        as={Link}
                        variant="flat"
                        size="lg"
                        showAnchorIcon
                        className="flex flex-col basis-1/3 h-28 lg:h-40 lg:text-xl"
                    >
                        Classement
                    </Button>
                </div>

                <div className="flex flex-row w-full gap-3">
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

            {/*<div className="flex flex-col gap-4 mt-4">*/}
            {/*    <div className="text-[28px] font-semibold mb-3 lg:mb-4">Prochaine prédiction</div>*/}

            {/*    <div className="flex flex-row w-full gap-2">*/}
            {/*        <Card shadow="none" className="basis-1/3 h-28 lg:h-40 border-2 bg-background">*/}
            {/*            <CardBody className="justify-center items-center">*/}
            {/*                <span className="font-bold text-3xl">{currentYear + 1}</span>*/}
            {/*            </CardBody>*/}
            {/*        </Card>*/}
            {/*        <Card shadow="none" className="basis-1/3 h-28 lg:h-40">*/}
            {/*            <CardBody className="justify-center">*/}
            {/*                <span className="text-center lg:text-xl">A venir</span>*/}
            {/*            </CardBody>*/}
            {/*        </Card>*/}
            {/*        {allowNewBet === "true" && (*/}
            {/*            <Button*/}
            {/*                color="primary"*/}
            {/*                href={`/bet/${currentYear + 1}`}*/}
            {/*                as={Link}*/}
            {/*                variant="flat"*/}
            {/*                size="lg"*/}
            {/*                showAnchorIcon*/}
            {/*                className="flex flex-col basis-1/3 h-28 lg:h-40 lg:text-xl"*/}
            {/*            >*/}
            {/*                Prédire*/}
            {/*            </Button>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}

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
