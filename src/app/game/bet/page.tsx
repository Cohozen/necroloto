import { getBetByUser } from "@/lib/api/bet";
import { auth } from "@clerk/nextjs";
import InsertForm from "./insertForm";

export default async function BetPage() {
    const { userId }: { userId: string | null } = auth();

    if (userId) {
        const result = await getBetByUser(userId);
        if (result) return <div>Bonjour voici votre pari en cours</div>;
    }

    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>Mes prédictions</h1>
            <p>Saisir 15 noms de célébrités.</p>
            <InsertForm />
        </div>
    );
}
