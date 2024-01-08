import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import dayjs from "dayjs";
import Avatar from "@/components/business/user/Avatar";
import { BetsWithUser } from "@/lib/types/bet";

interface BetsCardListProps {
    bets: BetsWithUser[];
}

export default async function BetsCardList({ bets }: BetsCardListProps) {
    return (
        <div className="py-5">
            {(bets && bets.length > 0 && (
                <div className="flex flex-row gap-2">
                    {bets.map((b) => {
                        return (
                            <div key={b.id} className="card card-compact card-bordered w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title flex flex-row">
                                        <span className="grow">{b.year}</span>
                                        <Avatar user={b.user} />
                                    </h2>
                                    <p>{`Créé le ${dayjs(b.createdAt).format("DD/MM/YYYY")}`}</p>
                                    <div className="card-actions justify-end">
                                        <Link href={`/game/bets/${b.id}`} className="btn btn-primary">
                                            Voir le pari
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )) || (
                <Link href="/game/bet" className="btn btn-primary">
                    Aller parier
                </Link>
            )}
        </div>
    );
}
