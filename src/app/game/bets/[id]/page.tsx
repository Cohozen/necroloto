import { getBetWithCelebrities } from "@/lib/api/bet";
import dayjs from "dayjs";
import { currentUser } from "@clerk/nextjs";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    const bet = await getBetWithCelebrities(params.id);

    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>
                {user?.externalId === bet?.userId
                    ? `Détails de votre pari ${bet?.year}`
                    : `Détails du pari ${bet?.year}`}
            </h1>
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
                        {bet &&
                            bet.CelebritiesOnBet.map((celebrityBet, index) => (
                                <tr key={celebrityBet.celebrity.id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{celebrityBet.celebrity.name}</td>
                                    <td>
                                        {celebrityBet.celebrity.birth
                                            ? dayjs(celebrityBet.celebrity.birth).format("DD/MM/YYYY")
                                            : "-"}
                                    </td>
                                    <td>
                                        {celebrityBet.celebrity.death
                                            ? dayjs(celebrityBet.celebrity.death).format("DD/MM/YYYY")
                                            : "-"}
                                    </td>
                                    <td>
                                        {!celebrityBet.celebrity.death && (
                                            <div className="badge badge-info">En vie</div>
                                        )}
                                        {celebrityBet.celebrity.death && (
                                            <div className="badge badge-error">décédé</div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
