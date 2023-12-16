import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { listBetWithCelebritiesNotAttached } from "@/lib/api/bet";

export default async function Page() {
    const user = await currentUser();

    if (user) {
        const roles = user.publicMetadata?.roles as string[];
        if (roles) {
            const isAdmin = roles.some((r) => r === "admin");
            if (!isAdmin) {
                return (
                    <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
                        <h1>{"Vous n'avez pas les droits d'accès"}</h1>
                        <Link href={`/game`} className="btn btn-outline btn-primary">
                            {"Retour à l'accueil"}
                        </Link>
                    </div>
                );
            }
        }
    }

    const bets = await listBetWithCelebritiesNotAttached();

    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>Administration</h1>
            <p>{bets && `${bets.length} parie${bets.length > 1 ? "s" : ""} avec des célébrités non relié`}</p>
        </div>
    );
}
