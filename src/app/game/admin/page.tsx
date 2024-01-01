import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { listIncompleteCelebrities } from "@/lib/api/celebrity";
import { Prisma, Celebrity } from "@prisma/client";
import CelebritiesList from "./celebritiesList";

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

    const celebrities: Celebrity[] = await listIncompleteCelebrities();

    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="prose mb-4">
                <h1>Administration</h1>
                <p>
                    {celebrities &&
                        `${celebrities.length} célébrité${
                            celebrities.length > 1 ? "s" : ""
                        } avec des informations manquantes :`}
                </p>
            </div>
            {celebrities && <CelebritiesList celebrities={celebrities} />}
        </div>
    );
}
