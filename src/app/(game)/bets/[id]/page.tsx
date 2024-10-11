import { getBetWithCelebrities } from "@/lib/api/bet";
import dayjs from "dayjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    CardFooter,
    CircularProgress,
    CardBody,
    Card,
    Divider
} from "@nextui-org/react";
import { findIndex, head, last, sortBy } from "lodash";
import UserAvatar from "@/components/business/user/UserAvatar";
import { buildUserName } from "@/lib/helpers/user";
import CelebritiesTable from "@/components/business/celebrities/CelebritiesTable";
import { GetPositionOfUserForYear, RankBetsByYearWithTotalPoints } from "@/lib/actions/bet";

export default async function BetPage({ params }: { params: { id: string } }) {
    const bet = await getBetWithCelebrities(params.id);
    let rank = 0;

    if (bet) rank = await GetPositionOfUserForYear(bet.userId, bet.year, "points");

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
                                {`${rank}${rank === 1 ? "er" : "ème"}`}
                            </Chip>
                        </div>
                    </>
                )}

                {bet && (
                    <div className="flex w-full flex-row gap-3">
                        <Card className="basis-1/2 h-[180px] border-none bg-gradient-to-br from-primary-500 to-secondary-500">
                            <CardBody className="justify-center items-center p-0">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-32 h-32 drop-shadow-md",
                                        indicator: "stroke-white",
                                        track: "stroke-white/10",
                                        value: "text-3xl font-semibold text-white"
                                    }}
                                    value={total}
                                    strokeWidth={3}
                                    formatOptions={{ style: "decimal" }}
                                    showValueLabel={true}
                                />
                            </CardBody>
                            <CardFooter className="justify-center items-center">
                                <Chip
                                    classNames={{
                                        base: "border-1 border-white/30",
                                        content: "text-white/90 text-small font-semibold"
                                    }}
                                    variant="bordered"
                                >
                                    {`${total} point${total > 1 ? "s" : ""}`}
                                </Chip>
                            </CardFooter>
                        </Card>

                        <Card className="basis-1/2 h-[180px] border-none bg-gradient-to-br from-primary-500 to-secondary-500">
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
                                        content: "text-white/90 text-small font-semibold"
                                    }}
                                    variant="bordered"
                                >
                                    {`${inLife} en vie`}
                                </Chip>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>

            <Divider />

            <CelebritiesTable celebrities={celebritiesSorted} hideHeader />
        </div>
    );
}
