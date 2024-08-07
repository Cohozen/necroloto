"use client";

import { Celebrity } from "@prisma/client";
import dayjs from "dayjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import React, { useState } from "react";
import Link from "next/link";
import { BabyIcon } from "@/ui/icons/BabyIcon";
import { CheckIcon } from "@/ui/icons/CheckIcon";
import { CrossIcon } from "@/ui/icons/CrossIcon";
import useClerkSWR from "@/utils/hooks/useClerkSWR";
import useDebounce from "@/utils/hooks/useDebounce";

export default function CelebritiesCardList() {
    const [searchName, setSearchName] = useState("");
    const debouncedSearch = useDebounce(searchName, 500);

    const { data: celebrities } = useClerkSWR<Celebrity[]>(
        `/api/celebrities?name=${debouncedSearch}`
    );

    return (
        <>
            <div className="flex flex-row text-lg font-bold gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Recherche"
                    className="input input-bordered w-full"
                    value={searchName}
                    onChange={(v) => setSearchName(v.target.value)}
                />
                <span className="shrink-0">
                    {`${celebrities?.length ?? 0} célébrité${
                        celebrities && celebrities?.length > 1 ? "s" : ""
                    }`}
                </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {celebrities &&
                    celebrities
                        .sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        })
                        .map((celebrity, index) => (
                            <Link key={celebrity.id} href={`/game/celebrities/${celebrity.id}`}>
                                <div key={celebrity.id} className="card bg-base-100 shadow-xl">
                                    <div className="card-body p-4">
                                        <div className="flex flex-col">
                                            <div className="flex flex-row gap-4 items-center">
                                                {celebrity && (
                                                    <CelebrityAvatar
                                                        celebrity={celebrity}
                                                        size="w-14"
                                                    />
                                                )}
                                                <span className="flex-1 truncate">
                                                    {celebrity.name}
                                                </span>
                                                {celebrity.death ? (
                                                    <div className="badge badge-error">Décédé</div>
                                                ) : (
                                                    <div className="badge badge-info">En vie</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <ul className="timeline">
                                                <li>
                                                    <div className="timeline-middle">
                                                        <BabyIcon
                                                            className={`w-5 h-5 ${
                                                                celebrity.death
                                                                    ? "text-error"
                                                                    : "text-primary"
                                                            }`}
                                                        />
                                                    </div>
                                                    <div className="timeline-end text-xs">
                                                        {celebrity.birth
                                                            ? dayjs(celebrity.birth).format(
                                                                  "DD/MM/YYYY"
                                                              )
                                                            : "-"}
                                                    </div>
                                                    <hr
                                                        className={` ${
                                                            celebrity.death
                                                                ? "bg-error"
                                                                : "bg-primary"
                                                        }`}
                                                    />
                                                </li>
                                                <li className="flex-1">
                                                    <hr
                                                        className={`${
                                                            celebrity.death
                                                                ? "bg-error"
                                                                : "bg-primary"
                                                        }`}
                                                    />
                                                    <div className="timeline-middle">
                                                        <CheckIcon
                                                            className={`w-5 h-5 ${
                                                                celebrity.death
                                                                    ? "text-error"
                                                                    : "text-primary"
                                                            }`}
                                                        />
                                                    </div>
                                                    <div className="timeline-end text-xs">
                                                        {celebrity.birth
                                                            ? `${dayjs(
                                                                  celebrity.death || undefined
                                                              ).diff(celebrity.birth, "year")} ans`
                                                            : "-"}
                                                    </div>
                                                    <hr
                                                        className={`${
                                                            celebrity.death ? "bg-error" : ""
                                                        }`}
                                                    />
                                                </li>
                                                <li>
                                                    <hr
                                                        className={`${
                                                            celebrity.death ? "bg-error" : ""
                                                        }`}
                                                    />
                                                    <div className="timeline-middle">
                                                        <CrossIcon
                                                            className={`w-5 h-5 ${
                                                                celebrity.death ? "text-error" : ""
                                                            }`}
                                                        />
                                                    </div>
                                                    <div className="timeline-end text-xs">
                                                        {celebrity.death
                                                            ? dayjs(celebrity.death).format(
                                                                  "DD/MM/YYYY"
                                                              )
                                                            : ""}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
            </div>
        </>
    );
}
