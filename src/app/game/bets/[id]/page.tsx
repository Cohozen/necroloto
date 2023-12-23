import { getBetWithCelebrities } from "@/lib/api/bet";

export default async function Page({ params }: { params: { id: string } }) {
    const bet = await getBetWithCelebrities(params.id);

    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>Détails du parie {bet?.year}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nom</th>
                            <th>Date de naissance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bet &&
                            bet.CelebritiesOnBet.map((celebrityBet, index) => (
                                <tr key={celebrityBet.celebrity.id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{celebrityBet.celebrity.name}</td>
                                    <td>{celebrityBet.celebrity.birth?.toDateString()}</td>
                                    <td>
                                        {!celebrityBet.celebrity.death && (
                                            <div className="badge badge-secondary">En vie</div>
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
