import Link from "next/link";
import dayjs from "dayjs";
import UserAvatar from "@/components/business/user/UserAvatar";
import { BetsWithUser } from "@/lib/types/bet";
import { buildUserName } from "@/lib/helpers/user";

interface BetsCardListProps {
    bets: BetsWithUser[];
}

export default async function BetsCardList({ bets }: BetsCardListProps) {
    return (
        <div className="py-5">
            {(bets && bets.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {bets.map((b) => {
                        return (
                            <>
                                <div key={b.id} className="card card-compact card-bordered w-96 bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title flex flex-row">
                                            <span className="grow">{buildUserName(b.user)}</span>
                                            <UserAvatar user={b.user} />
                                        </h2>
                                        <p className="text-lg">{`Pari ${b.year}`}</p>
                                        <p className="text-xs">{`Créé le ${dayjs(b.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}`}</p>
                                        <div className="card-actions justify-end">
                                            <Link href={`/game/bets/${b.id}`} className="btn btn-primary">
                                                Voir le pari
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
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
