import { getBetByUserAndYear } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs";
import InsertForm from "./insertForm";
import Link from "next/link";

export const metadata = {
    title: "Necroloto | Mes paris"
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
                        Voir mon pari
                    </Link>
                </div>
            );
    }

    return (
        <main className="flex-1 overflow-auto p-4 md:px-24 lg:px-48 xl:px-80">
            <div className="flex flex-col pb-4 gap-1">
                <div className="text-xl">Mes prédictions pour l'année</div>
                <p className="text-xs">{`Saisir 30 noms de célébrités.`}</p>
            </div>
            <InsertForm />
        </main>
    );
}
