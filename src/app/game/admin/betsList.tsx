"use client";

import { Bet } from "@/lib/api/bet";

interface BetsListProps {
    Bets: Bet[];
}

export default function BetsList({ Bets }: BetsListProps) {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Utilisateur</th>
                        <th>Année</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Bets &&
                        Bets.map((bet, index) => (
                            <tr key={`${bet?.userId}-${index}`} className="hover">
                                <th>{index + 1}</th>
                                <td>{bet.user?.email}</td>
                                <td>{bet.year}</td>
                                <td></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
