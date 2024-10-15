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
    CardFooter
} from "@nextui-org/react";
import { CardHeader } from "@nextui-org/card";

export const metadata = {
    title: "Necroloto | Accueil"
};

export default async function IndexPage() {
    const user = await currentUser();

    const year = 2024;

    let userDb: UserType | null = null;

    if (user) userDb = await CreateOrUpdateUserByClerkAuth(user);

    const bets = await listBets<BetsWithUserAndCelebrities>({
        where: { year: year },
        include: { user: true, CelebritiesOnBet: { include: { celebrity: true } } }
    });

    const haveBet = bets.find((b) => b.userId === userDb?.id);

    return (
        <div className="flex flex-col gap-8 p-4">
            {userDb && (
                <div className="flex flex-row gap-4 justify-center px-2 pt-4">
                    <User
                        description={userDb.email}
                        name={`${userDb.firstname} ${userDb.lastname ?? ""}`}
                        avatarProps={{
                            radius: "full",
                            size: "lg",
                            src: userDb.image ?? undefined
                        }}
                    />
                </div>
            )}

            {!haveBet && (
                <Card>
                    <CardHeader className="gap-2">
                        <InfoIcon className="h-6 w-6" />
                        <span>Dommage</span>
                    </CardHeader>
                    <CardBody>
                        <p>
                            {
                                "Malheureusement, il est trop tard pour faire votre pari pour l'année 2024, revenez plus tard !"
                            }
                        </p>
                    </CardBody>
                </Card>
            )}

            <div className="flex w-full flex-row gap-3">
                <Card className="basis-1/2 h-36 border-none bg-gradient-to-br from-primary-500 to-secondary-500">
                    <CardBody className="justify-center items-center">
                        <span className="font-bold text-4xl">{bets.length}</span>
                        <span>Paris</span>
                    </CardBody>
                    <CardFooter className="justify-center items-center pt-0">
                        <Chip
                            classNames={{
                                base: "border-1 border-white/30",
                                content: "text-white/90 text-small font-semibold"
                            }}
                            variant="bordered"
                        >
                            {year}
                        </Chip>
                    </CardFooter>
                </Card>
                <Card className="basis-1/2 h-36 border-none bg-gradient-to-br from-primary-500 to-secondary-500">
                    <CardBody className="justify-center items-center">
                        <span className="font-bold text-4xl">5</span>
                        <span>Décès</span>
                    </CardBody>
                    <CardFooter className="justify-center items-center pt-0">
                        <Chip
                            classNames={{
                                base: "border-1 border-white/30",
                                content: "text-white/90 text-small font-semibold"
                            }}
                            variant="bordered"
                        >
                            Trouvés
                        </Chip>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
