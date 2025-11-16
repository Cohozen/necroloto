import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";
import { GetPositionOfUserForYear } from "@/lib/actions/bet";
import { Card, CardBody, Button, Link, Avatar, CardFooter } from "@nextui-org/react";
import { listCirclesByUserWithBets } from "@/lib/api/circle";
import { CardHeader } from "@nextui-org/card";

export default async function IndexPage() {
    const user = await currentUser();

    const currentYear = 2025;

    let myCircles = null;

    if (user) await CreateOrUpdateUserByClerkAuth(user);

    if (user?.externalId) {
        myCircles = await listCirclesByUserWithBets(user?.externalId);
        console.log(myCircles);
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

                            return (
                                <Card
                                    key={c.id}
                                    fullWidth
                                    isPressable
                                    //onPress={() => router.push(`/circles/${c.id}`)}
                                >
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-3">
                                            <Avatar
                                                isBordered
                                                radius="full"
                                                size="md"
                                                src="https://heroui.com/avatars/avatar-1.png"
                                            />
                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">
                                                    {c.name}
                                                </h4>
                                                <h5 className="text-small tracking-tight text-default-400">
                                                    {c.visibility}
                                                </h5>
                                            </div>
                                        </div>
                                        <Button
                                            className="bg-transparent text-foreground border-default-200"
                                            color="primary"
                                            radius="full"
                                            size="sm"
                                            variant="bordered"
                                            //onPress={() => setIsFollowed(!isFollowed)}
                                        >
                                            action
                                        </Button>
                                    </CardHeader>
                                    <CardBody className="px-3 py-0 text-small text-default-400">
                                        <div className="flex flex-row items-center justify-between gap-2 mb-2">
                                            <span>
                                                {`${c.memberships.length} participant${c.memberships.length > 1 ? "s" : ""}`}
                                            </span>
                                            {currentRank > 0 ? (
                                                <span>{`${currentRank} / ${c.bets.length}`}</span>
                                            ) : (
                                                "Non classé"
                                            )}
                                        </div>
                                    </CardBody>
                                    <CardFooter className="gap-3">
                                        <Button
                                            color="primary"
                                            radius="full"
                                            size="sm"
                                            fullWidth
                                            variant="flat"
                                            //onPress={() => router.push(`/circles/${c.id}/rank`)}
                                        >
                                            Classement
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
