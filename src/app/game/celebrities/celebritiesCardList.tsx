"use client";

import { Celebrity } from "@prisma/client";
import dayjs from "dayjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import React from "react";

interface CelebritiesCardListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesCardList({ celebrities }: CelebritiesCardListProps) {
    return (
        <div className="flex flex-col gap-4">
            {celebrities &&
                celebrities
                    .sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })
                    .map((celebrity, index) => (
                        <div key={celebrity.id} className="card bg-base-100 shadow-xl">
                            {/*<figure>{celebrity.photo && <img src={celebrity.photo} />}</figure>*/}
                            <div className="card-body">
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-4 items-center">
                                        {celebrity && (
                                            <CelebrityAvatar celebrity={celebrity} size="w-14" />
                                        )}
                                        <span className="flex-1 truncate">{celebrity.name}</span>
                                        {celebrity.death ? (
                                            <div className="badge badge-error">Décédé</div>
                                        ) : (
                                            <div className="badge badge-primary">En vie</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col ">
                                    <ul className="timeline">
                                        <li>
                                            <div className="timeline-middle ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 64 64"
                                                    className={`w-5 h-5 ${
                                                        celebrity.death
                                                            ? "text-error"
                                                            : "text-primary"
                                                    }`}
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M32 2C15.432 2 2 15.432 2 32c0 16.566 13.432 30 30 30s30-13.434 30-30C62 15.432 48.568 2 32 2m-5 12.5c0-1.25 1.25-2.5 2.5-2.5h5c1.25 0 2.5 1.25 2.5 2.5v5c0 1.25-1.25 2.502-2.5 2.5h-5c-1.25.002-2.5-1.25-2.5-2.5zM29 51l-3 1l-3-7l3-7l5 3l-4 4zm9 1l-3-1l2-6l-4-4l5-3l3 7zm0-24v6c0 2-1 3-3 3h-6c-2 0-3-1-3-3v-6l-7-5l1-2l7.946 3H36l8-3l1 2z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="timeline-end text-xs">
                                                {celebrity.birth
                                                    ? dayjs(celebrity.birth).format("DD/MM/YYYY")
                                                    : "-"}
                                            </div>
                                            <hr
                                                className={` ${
                                                    celebrity.death ? "bg-error" : "bg-primary"
                                                }`}
                                            />
                                        </li>
                                        <li className="flex-1">
                                            <hr
                                                className={`${
                                                    celebrity.death ? "bg-error" : "bg-primary"
                                                }`}
                                            />
                                            <div className="timeline-middle">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className={`w-5 h-5 ${
                                                        celebrity.death
                                                            ? "text-error"
                                                            : "text-primary"
                                                    }`}
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="timeline-end text-xs">
                                                {celebrity.birth
                                                    ? `${dayjs().diff(celebrity.birth, "year")} ans`
                                                    : "-"}
                                            </div>
                                            <hr
                                                className={`${celebrity.death ? "bg-error" : ""}`}
                                            />
                                        </li>
                                        <li>
                                            <hr
                                                className={`${celebrity.death ? "bg-error" : ""}`}
                                            />
                                            <div className="timeline-middle">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className={`w-5 h-5 ${
                                                        celebrity.death ? "text-error" : ""
                                                    }`}
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2m-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="timeline-end text-xs">
                                                {celebrity.death
                                                    ? dayjs(celebrity.death).format("DD/MM/YYYY")
                                                    : ""}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
        </div>
    );
}
