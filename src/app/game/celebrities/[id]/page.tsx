import { currentUser } from "@clerk/nextjs";
import React from "react";
import { getCelebrityWithBets } from "@/lib/api/celebrity";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import { BabyIcon } from "@/ui/icons/BabyIcon";
import dayjs from "dayjs";
import { CheckIcon } from "@/ui/icons/CheckIcon";
import { CrossIcon } from "@/ui/icons/CrossIcon";
import { CalendarIcon } from "@/ui/icons/CalendarIcon";
import { UserHeartIcon } from "@/ui/icons/UserHeartIcon";
import { RankingIcon } from "@/ui/icons/RankingIcon";
import UserAvatar from "@/components/business/user/UserAvatar";
import { CupStarIcon } from "@/ui/icons/CupStarIcon";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    const celebrity = await getCelebrityWithBets(params.id);

    const usersWhoBetThisCelebrity = celebrity?.CelebritiesOnBet.map((b) => b.bet.user);

    const points = celebrity?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-4 p-4">
                {celebrity && (
                    <>
                        <div className="flex flex-col gap-4 p-4 items-center">
                            <CelebrityAvatar celebrity={celebrity} size="w-48" />
                            <div className="text-4xl">{celebrity.name}</div>
                            {celebrity.death ? (
                                <div className="badge badge-error">Décédé</div>
                            ) : (
                                <div className="badge badge-info">En vie</div>
                            )}
                        </div>

                        <div className="px-4">
                            <div
                                className="stats w-full justify-center stats-vertical lg:stats-horizontal bg-primary text-primary-content shadow-lg">
                                <div className="stat">
                                    <div className="stat-figure text-primary-content">
                                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                            {usersWhoBetThisCelebrity?.map((user) => {
                                                return (
                                                    <UserAvatar
                                                        key={user.id}
                                                        user={user}
                                                        size="w-12"
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="stat-title text-primary-content">
                                        Pari(s) en cours
                                    </div>
                                    <div className="stat-value">
                                        {usersWhoBetThisCelebrity?.length}
                                    </div>
                                    <div className="stat-desc text-primary-content">
                                        Pour cette personne
                                    </div>
                                </div>

                                {points ? (
                                    <div className="stat border-t-primary-content">
                                        <div className="stat-figure text-primary-content">
                                            <CupStarIcon className="h-10 w-10 text-accent" />
                                        </div>
                                        <div className="stat-title text-primary-content">
                                            Points distribués
                                        </div>
                                        <div className="stat-value">
                                            {points}
                                            <span className="text-sm pl-1">pts</span>
                                        </div>
                                        <div className="stat-desc text-primary-content">
                                            {`${points / (usersWhoBetThisCelebrity?.length || 1)}pts par pari`}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <ul className="timeline timeline-vertical">
                                <li>
                                    <div className="timeline-start">Naissance</div>
                                    <div className="timeline-middle">
                                        <BabyIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="timeline-end timeline-box my-6">
                                        {celebrity.birth
                                            ? dayjs(celebrity.birth).format("DD/MM/YYYY")
                                            : "-"}
                                    </div>
                                    <hr className="bg-accent" />
                                </li>
                                <li className="flex-1">
                                    <hr className="bg-accent" />
                                    <div className="timeline-start">Age</div>
                                    <div className="timeline-middle">
                                        <CheckIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="timeline-end timeline-box my-6">
                                        {celebrity.birth
                                            ? `${dayjs(celebrity.death || undefined).diff(
                                                celebrity.birth,
                                                "year"
                                            )} ans`
                                            : "-"}
                                    </div>
                                    <hr className={`${celebrity.death ? "bg-accent" : ""}`} />
                                </li>
                                <li>
                                    <hr className={`${celebrity.death ? "bg-accent" : ""}`} />
                                    <div className="timeline-start">{`${
                                        celebrity.death ? "Mort" : ""
                                    }`}</div>
                                    <div className="timeline-middle">
                                        <CrossIcon
                                            className={`w-5 h-5 ${
                                                celebrity.death ? "text-accent" : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`timeline-end my-6 ${
                                            celebrity.death ? "timeline-box" : ""
                                        }`}
                                    >
                                        {celebrity.death
                                            ? dayjs(celebrity.death).format("DD/MM/YYYY")
                                            : ""}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
