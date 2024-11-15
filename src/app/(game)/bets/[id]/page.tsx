import { getBetWithCelebrities } from "@/lib/api/bet";
import dayjs from "dayjs";
import React from "react";
import {
    User,
    Chip,
    CardFooter,
    CircularProgress,
    CardBody,
    Card,
    Divider
} from "@nextui-org/react";
import { head, last, sortBy } from "lodash";
import CelebritiesTable from "@/components/business/celebrities/CelebritiesTable";
import { GetCelebritiesAliveStats, GetPositionOfUserForYear } from "@/lib/actions/bet";
import { CardHeader } from "@nextui-org/card";

export default async function BetPage({ params }: { params: { id: string } }) {
    const bet = await getBetWithCelebrities(params.id);
    let rank = 0;
    let aliveStats: number = 0;

    if (bet) {
        rank = await GetPositionOfUserForYear(bet.userId, bet.year, "points");
        const resultAliveStats = await GetCelebritiesAliveStats(bet.userId, bet.year);
        if (resultAliveStats) aliveStats = resultAliveStats;
    }

    const celebrities = bet?.CelebritiesOnBet.map((c) => c.celebrity);
    const celebritiesSorted = sortBy(celebrities, (c) => c.death && c.name) ?? [];

    const total = bet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0) ?? 0;

    const inLife = celebrities?.filter((c) => !c.death).length;
    const inLifePercent = inLife ? (inLife / celebrities.length) * 100 : 0;

    const olderCelebrity = head(
        sortBy(celebrities?.filter((c) => c.birth && !c.death), (c) => c.birth)
    );
    const youngerCelebrity = last(sortBy(celebrities?.filter((c) => c.birth), (c) => c.birth));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-4 items-start">
                {bet && (
                    <>
                        <div className="flex flex-row gap-4">
                            <User
                                name={`${bet.user.firstname} ${bet.user.lastname ?? ""}`}
                                description={dayjs(bet.createdAt).format("DD/MM/YYYY HH:mm")}
                                avatarProps={{
                                    src: bet.user.image ?? "",
                                    isBordered: true
                                }}
                            />
                        </div>

                        <div className="flex flex-row gap-2">
                            <Chip className="capitalize" color="primary" variant="flat">
                                {bet.year}
                            </Chip>
                            <Chip className="capitalize" color="primary" variant="flat">
                                {rank === 1 && total === 0
                                    ? "Non classé"
                                    : `${rank}${rank === 1 ? "er" : "ème"}`}
                            </Chip>
                            <Chip className="capitalize" color="primary" variant="flat">
                                <span className="font-bold">{`${total} point${
                                    total > 1 ? "s" : ""
                                }`}</span>
                            </Chip>
                        </div>
                    </>
                )}

                <Divider />

                {bet && (
                    <>
                        <div className="flex w-full flex-row gap-3">
                            <Card
                                shadow="none"
                                className="basis-1/2 h-[180px] border-none bg-gradient-to-br from-primary to-secondary"
                            >
                                <CardBody className="justify-center items-center p-0">
                                    <CircularProgress
                                        classNames={{
                                            svg: "w-32 h-32 drop-shadow-md",
                                            indicator: "stroke-white",
                                            track: "stroke-white/10",
                                            value: "text-3xl font-semibold text-white"
                                        }}
                                        value={inLifePercent}
                                        strokeWidth={3}
                                        showValueLabel={true}
                                    />
                                </CardBody>
                                <CardFooter className="justify-center items-center">
                                    <Chip
                                        classNames={{
                                            base: "border-1 border-white/30",
                                            content: "text-white/90 text-xs font-semibold"
                                        }}
                                        variant="bordered"
                                    >
                                        {`${inLife} en vie`}
                                    </Chip>
                                </CardFooter>
                            </Card>

                            <Card
                                shadow="none"
                                className="basis-1/2 h-[180px] border-none bg-gradient-to-br from-primary to-secondary"
                            >
                                <CardBody className="justify-center items-center p-0">
                                    <CircularProgress
                                        classNames={{
                                            svg: "w-32 h-32 drop-shadow-md",
                                            indicator: "stroke-white",
                                            track: "stroke-white/10",
                                            value: "text-3xl font-semibold text-white"
                                        }}
                                        value={Math.abs(aliveStats)}
                                        strokeWidth={3}
                                        showValueLabel={true}
                                    />
                                </CardBody>
                                <CardFooter className="justify-center items-center">
                                    <Chip
                                        classNames={{
                                            base: "border-1 border-white/30",
                                            content: "text-white/90 text-xs font-semibold"
                                        }}
                                        variant="bordered"
                                    >
                                        {aliveStats === 0 && "Autant que la moyenne"}
                                        {aliveStats > 0 && `de plus que la moyenne`}
                                        {aliveStats < 0 && `de moins que la moyenne`}
                                    </Chip>
                                </CardFooter>
                            </Card>
                        </div>

                        <Card
                            shadow="none"
                            className="w-full h-32 border-none bg-gradient-to-br from-primary to-secondary"
                        >
                            <CardHeader className="justify-evenly gap-4">
                                <div className="flex flex-col items-center px-6">
                                    <span className="font-bold text-4xl">
                                        {dayjs(olderCelebrity?.death || new Date()).diff(
                                            olderCelebrity?.birth,
                                            "year"
                                        )}
                                    </span>
                                    <span>ans</span>
                                </div>
                                <div className="flex flex-col items-center px-6">
                                    <span className="font-bold text-4xl">
                                        {dayjs(youngerCelebrity?.death || new Date()).diff(
                                            youngerCelebrity?.birth,
                                            "year"
                                        )}
                                    </span>
                                    <span>ans</span>
                                </div>
                            </CardHeader>
                            <CardFooter className="justify-evenly gap-4 py-0">
                                <div className="flex flex-col gap-1 items-center">
                                    <Chip
                                        classNames={{
                                            base: "border-1 border-white/30",
                                            content: "text-white/90 text-xs font-semibold"
                                        }}
                                        variant="bordered"
                                    >
                                        Plus vieux
                                    </Chip>
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <Chip
                                        classNames={{
                                            base: "border-1 border-white/30",
                                            content: "text-white/90 text-xs font-semibold"
                                        }}
                                        variant="bordered"
                                    >
                                        Plus jeune
                                    </Chip>
                                </div>
                            </CardFooter>
                        </Card>
                    </>
                )}
            </div>

            <Divider />

            <CelebritiesTable celebrities={celebritiesSorted} hideHeader />
        </div>
    );
}
