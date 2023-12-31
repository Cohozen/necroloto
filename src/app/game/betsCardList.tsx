import { currentUser } from "@clerk/nextjs";
import { listBetsByUser } from "@/lib/api/bet";
import Link from "next/link";
import { Bet, Prisma } from "@prisma/client";
import dayjs from "dayjs";

export default async function BetsCardList() {
    const user = await currentUser();

    type BetsWithUser = Prisma.BetGetPayload<{ include: { user: true } }>;

    let bets: BetsWithUser[] = [];

    if (user && user?.externalId) {
        const result = await listBetsByUser(user?.externalId);
        if (result) bets = result;
    }

    return (
        <div>
            {bets && bets.length > 0 && (
                <>
                    <h1>Mes paries : </h1>
                    {bets.map((b) => {
                        return (
                            <div key={b.id} className="card card-compact card-bordered w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{b.year}</h2>
                                    <p>{`Créé le ${dayjs(b.createdAt).format("DD/MM/YYYY")}`}</p>
                                    <div className="card-actions justify-end">
                                        <Link href={`/game/bets/${b.id}`} className="btn btn-primary">
                                            Voir le parie
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) || (<>
                <Link href="/game/bet" className="btn btn-primary">
                    Aller parier
                </Link>
            </>)}
        </div>
    );
}
