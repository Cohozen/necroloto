"use client";

import { Celebrity } from "@prisma/client";
import CelebrityUpdateModal from "@/components/business/celebrity/CelebrityUpdateModal";
import { useState } from "react";

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
                                <td>{celebrity.birth?.toDateString()}</td>
                                <td>{celebrity.death?.toDateString()}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleClick(celebrity)}>
                                        Mise à jour
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {/*<dialog id="my_modal_3" className="modal">*/}
            {/*    <div className="modal-box">*/}
            {/*        <form method="dialog">*/}
            {/*            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>*/}
            {/*        </form>*/}
            {/*        <h3 className="font-bold text-lg">Hello!</h3>*/}
            {/*        <p className="py-4">Press ESC key or click on ✕ button to close</p>*/}
            {/*    </div>*/}
            {/*    <form method="dialog" className="modal-backdrop">*/}
            {/*        <button>close</button>*/}
            {/*    </form>*/}
            {/*</dialog>*/}
        </div>
    );
}
