import { getBetByUserAndYear } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs";
import InsertForm from "./insertForm";
import Link from "next/link";

export const metadata = {
    title: "Necroloto | Mes paries"
};

export default async function BetPage() {
    const user = await currentUser();

    if (user && user.externalId) {
        const result = await getBetByUserAndYear(user.externalId, 2024);

        if (result)
            return (
                <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
                    <h1>Vous avez déjà parier pour 2024</h1>
                    <Link href={`/game/bets/${result.id}`} className="btn btn-outline btn-primary">
                        Voir mon parie
                    </Link>
                </div>
            );
    }

    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>Mes prédictions</h1>
            <p>{`Saisir jusqu'a 50 noms de célébrités.`}</p>
            <InsertForm />
        </div>
    );
}
