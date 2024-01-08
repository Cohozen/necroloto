import { BetsWithUser } from "@/lib/types/bet";
import { listBetsByYear } from "@/lib/api/bet";
import BetsCardList from "../betsCardList";

export default async function Page() {
    let bets: BetsWithUser[] = [];

    const result = await listBetsByYear(2024);
    if (result) bets = result;

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl">Tous les paris</h1>
            </div>
            <BetsCardList bets={bets} />
        </main>
    );
}
