import { currentUser } from "@clerk/nextjs/server";
import { User as UserType } from "@prisma/client";
import { BetsWithCelebrities, BetsWithUserAndCelebrities } from "@/lib/types/bet";
import { getBetByUserAndYear, listBets } from "@/lib/api/bet";
import UserAvatar from "@/components/business/user/UserAvatar";
import React from "react";
import { buildUserName } from "@/lib/helpers/user";
import { CalendarIcon } from "@/ui/icons/CalendarIcon";
import { UserHeartIcon } from "@/ui/icons/UserHeartIcon";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import { InfoIcon } from "@/ui/icons/InfoIcon";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";
import { GetCelebritiesAliveStats, GetPositionOfUserForYear } from "@/lib/actions/bet";
import {
    Avatar,
    Chip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Card,
    CardBody,
    Divider,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Tabs,
    Tab,
    Button,
    Link,
    CircularProgress,
    CardFooter,
    Progress
} from "@nextui-org/react";
import { CardHeader } from "@nextui-org/card";
import { SearchCelebrities } from "@/lib/api/celebrity";
import CurrentBet from "./currentBet";
import { log } from "next/dist/server/typescript/utils";

export const metadata = {
    title: "Necroloto | Accueil"
};

export default async function IndexPage() {
    const user = await currentUser();

    const currentYear = 2024;
    const allowNewBet = true;

    let userDb: UserType | null = null;
    let currentRank = 0;

    if (user) userDb = await CreateOrUpdateUserByClerkAuth(user);

    const bets = await listBets<BetsWithUserAndCelebrities>({
        where: { year: currentYear },
        include: { user: true, CelebritiesOnBet: { include: { celebrity: true } } }
    });

    const deadCelebrities = await SearchCelebrities("", false, true);

    const myCurrentBet = bets.find((b) => b.userId === userDb?.id);

    if (myCurrentBet) {
        currentRank = await GetPositionOfUserForYear(
            myCurrentBet.userId,
            myCurrentBet.year,
            "points"
        );
    }

    const currentTotal =
        myCurrentBet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0) ?? 0;
    const currentCelebrities = myCurrentBet?.CelebritiesOnBet.map((c) => c.celebrity);

    const currentInLife = currentCelebrities?.filter((c) => !c.death).length;
    const currentInLifePercent = currentInLife
        ? (currentInLife / currentCelebrities.length) * 100
        : 0;

    return (
        <div className="flex flex-col gap-6 p-4">
            {userDb && (
                <User
                    description={userDb.email}
                    name={`${userDb.firstname} ${userDb.lastname ?? ""}`}
                    avatarProps={{
                        radius: "full",
                        size: "lg",
                        src: userDb.image ?? undefined
                    }}
                />
            )}

            <Divider className="my-2" />

            <div className="flex flex-col gap-4">
                <div className="text-xl uppercase font-medium">Prédiction en cours</div>

                <div className="flex flex-row w-full gap-2">
                    <Card className="basis-1/3 h-28 border-2 bg-background">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-3xl">{currentYear}</span>
                        </CardBody>
                    </Card>
                    <Card className="basis-1/3 h-28">
                        <CardBody className="justify-center">
                            <span className="text-center">Prédictions fermés</span>
                        </CardBody>
                    </Card>

                    <Button
                        color="primary"
                        href="/rank/"
                        as={Link}
                        variant="flat"
                        size="lg"
                        className="basis-1/3 h-28"
                    >
                        Classement
                    </Button>
                </div>

                <div className="flex flex-row w-full gap-3">
                    <Card className="basis-1/2 h-32 border-none bg-gradient-to-br from-primary-500 to-secondary-500">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-4xl">{bets.length}</span>
                            <span>Prédictions</span>
                        </CardBody>
                    </Card>
                    <Card className="basis-1/2 h-32 border-none bg-gradient-to-br from-primary-500 to-secondary-500">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-4xl">{deadCelebrities.length}</span>
                            <span>Décès</span>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="text-xl uppercase font-medium">Prochaine prédiction</div>

                <div className="flex flex-row w-full gap-2">
                    <Card className="basis-1/3 h-28 border-2 bg-background">
                        <CardBody className="justify-center items-center">
                            <span className="font-bold text-3xl">{currentYear + 1}</span>
                        </CardBody>
                    </Card>
                    <Card className="basis-1/3 h-28">
                        <CardBody className="justify-center">
                            <span className="text-center">A venir</span>
                        </CardBody>
                    </Card>
                    {allowNewBet && (
                        <Button
                            color="primary"
                            href={`/bet/${currentYear + 1}`}
                            as={Link}
                            variant="flat"
                            size="lg"
                            className="basis-1/3 h-28"
                        >
                            Prédire
                        </Button>
                    )}
                </div>
            </div>

            {myCurrentBet && (
                <div className="flex flex-col gap-4">
                    <div className="text-xl uppercase font-medium">Ma prediction</div>

                    <div className="flex flex-row">
                        <CurrentBet bet={myCurrentBet} rank={currentRank} />
                    </div>
                </div>
            )}
        </div>
    );
}
