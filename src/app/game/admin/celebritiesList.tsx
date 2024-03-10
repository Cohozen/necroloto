"use client";

import { Celebrity } from "@prisma/client";
import CelebrityUpdateModal from "@/components/business/celebrity/CelebrityUpdateModal";
import CelebrityMergeModal from "@/components/business/celebrity/CelebrityMergeModal";
import { useState } from "react";
import dayjs from "dayjs";

interface CelebritiesListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesList({ celebrities }: CelebritiesListProps) {
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalMerge, setOpenModalMerge] = useState(false);

    const [celebritySelected, setCelebritySelected] = useState<Celebrity | null>(null);

    const handleUpdateClick = (celebrity: Celebrity) => {
        setOpenModalUpdate(true);
        setCelebritySelected(celebrity);
    };

    const handleMergeClick = (celebrity: Celebrity) => {
        setOpenModalMerge(!openModalMerge);
        setCelebritySelected(celebrity);
    };

    return (
        <div className="overflow-x-auto">
            {celebritySelected && openModalUpdate && (
                <CelebrityUpdateModal
                    open={openModalUpdate}
                    onClose={() => setOpenModalUpdate(false)}
                    celebrity={celebritySelected}
                />
            )}
            {celebritySelected && openModalMerge && (
                <CelebrityMergeModal
                    open={openModalMerge}
                    onClose={() => setOpenModalMerge(false)}
                    celebrity={celebritySelected}
                />
            )}
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Nom</th>
                        <th>Date de naissance</th>
                        <th>Date de décès</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {celebrities &&
                        celebrities
                            .sort((a, b) => {
                                return a.name.localeCompare(b.name);
                            })
                            .map((celebrity, index) => (
                                <tr key={celebrity.id}>
                                    <th>{index + 1}</th>
                                    <td>{celebrity.name}</td>
                                    <td>{celebrity.birth ? dayjs(celebrity.birth).format("DD/MM/YYYY") : "-"}</td>
                                    <td>{celebrity.death ? dayjs(celebrity.death).format("DD/MM/YYYY") : "-"}</td>
                                    <td className="flex flex-row gap-2">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateClick(celebrity)}
                                        >
                                            Mise à jour
                                        </button>
                                        <button className="btn btn-accent" onClick={() => handleMergeClick(celebrity)}>
                                            Fusionner
                                        </button>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    );
}
