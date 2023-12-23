import { currentUser } from "@clerk/nextjs";
import { listBetByUser } from "@/lib/api/bet";
import Link from "next/link";
import { Bet } from "@prisma/client";

export default async function BetsCardList() {
    const user = await currentUser();

    let bets: Bet[] = [];

    if (user && user?.externalId) {
        const result = await listBetByUser(user?.externalId);
        if (result) bets = result;
    }

    return (
        <div className="">
            <h1>Mes paries : </h1>
            {bets &&
                bets.map((b) => {
                    return (
                        <div key={b.id} className="card card-compact w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{b.year}</h2>
                                <p>{b.createdAt.toDateString()}</p>
                                <div className="card-actions justify-end">
                                    <Link href={`/game/bets/${b.id}`} className="btn btn-primary">
                                        Voir le parie
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
