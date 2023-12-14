import { getBet } from "@/lib/api/bet";

export default async function Page({ params }: { params: { id: string } }) {
    const bet = await getBet(params.id);

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
                            bet.celebrities.map((celebrity, index) => (
                                <tr key={`${celebrity?.name}-${index}`} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{celebrity?.name}</td>
                                    <td>{celebrity?.birth}</td>
                                    <td>
                                        <div className="badge badge-secondary">En vie</div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
