"use client";

import { Celebrity } from "@prisma/client";
import CelebrityUpdateModal from "@/components/business/celebrity/CelebrityUpdateModal";
import { useState } from "react";
import dayjs from "dayjs";

interface CelebritiesListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesList({ celebrities }: CelebritiesListProps) {
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [celebritySelected, setCelebritySelected] = useState<Celebrity | null>(null);

    const handleClick = (celebrity: Celebrity) => {
        setOpenModalUpdate(!openModalUpdate);
        setCelebritySelected(celebrity);
    };

    return (
        <div className="overflow-x-auto">
            {celebritySelected && <CelebrityUpdateModal open={openModalUpdate} celebrity={celebritySelected} />}
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
                        celebrities.map((celebrity, index) => (
                            <tr key={celebrity.id}>
                                <th>{index + 1}</th>
                                <td>{celebrity.name}</td>
                                <td>{celebrity.birth ? dayjs(celebrity.birth).format("DD/MM/YYYY") : "-"}</td>
                                <td>{celebrity.death ? dayjs(celebrity.death).format("DD/MM/YYYY") : "-"}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleClick(celebrity)}>
                                        Mise à jour
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
