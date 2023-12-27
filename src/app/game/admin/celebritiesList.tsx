"use client";

import { Celebrity } from "@prisma/client";

interface CelebritiesListProps {
    celebrities: Celebrity[];
}

export default function CelebritiesList({ celebrities }: CelebritiesListProps) {
    return (
        <div className="overflow-x-auto">
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
                            <tr key={celebrity.id} className="hover">
                                <th>{index + 1}</th>
                                <td>{celebrity.name}</td>
                                <td>{celebrity.birth?.toDateString()}</td>
                                <td>{celebrity.death?.toDateString()}</td>
                                <td></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
