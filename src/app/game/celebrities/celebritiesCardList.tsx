"use client";

import { Celebrity } from "@prisma/client";
import dayjs from "dayjs";

interface CelebritiesCardListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesCardList({ celebrities }: CelebritiesCardListProps) {
    return (
        <div className="flex flex-wrap gap-4 py-5 overflow-x-auto">
            {celebrities &&
                celebrities
                    .sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })
                    .map((celebrity, index) => (
                        <div key={celebrity.id} className="card w-80 h-80 bg-base-100 shadow-xl">
                            <figure>{celebrity.photo && <img src={celebrity.photo} />}</figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {celebrity.name}
                                    {celebrity.death ? (
                                        <div className="badge badge-error">Décédé</div>
                                    ) : (
                                        <div className="badge badge-info">En vie</div>
                                    )}
                                </h2>
                                <p>{celebrity.birth ? `${dayjs().diff(celebrity.birth, "year")} ans` : null}</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">
                                        Naissance :{" "}
                                        {celebrity.birth ? dayjs(celebrity.birth).format("DD/MM/YYYY") : "-"}
                                    </div>
                                    {celebrity.death && (
                                        <div className="badge badge-outline">
                                            Décès : {dayjs(celebrity.death).format("DD/MM/YYYY")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
        </div>
    );
}
