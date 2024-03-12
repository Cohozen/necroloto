import { Celebrity } from "@prisma/client";
import { listAllCelebrities } from "@/lib/api/celebrity";
import CelebritiesCardList from "./celebritiesCardList";

export default async function Page({ params }: { params: { id: string } }) {
    const celebrities: Celebrity[] = await listAllCelebrities();

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl">Toutes les célébrités</h1>
            </div>
            {celebrities && <CelebritiesCardList celebrities={celebrities} />}
        </main>
    );
}
