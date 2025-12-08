import { getBetByUserAndYearAndCircle } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs/server";
import UpsertBet from "./upsertBet";
import { SearchCelebrities } from "@/lib/api/celebrity";
import { notFound } from "next/navigation";
import { getCircle } from "@/lib/api/circle";
import { BetsWithCelebrities } from "@/lib/types/bet";

export default async function BetPage({ params }: { params: { id: string; year: string } }) {
    const circle = await getCircle(params.id);
    if (!circle) throw new Error(`Circle with id ${params.id} not found`);

    const user = await currentUser();
    const number = parseInt(params.year, 10);

    if (!circle.allowNewBet || number !== 2026) notFound();

    const currentBet: BetsWithCelebrities | null = user?.externalId
        ? await getBetByUserAndYearAndCircle(user.externalId, number, params.id)
        : null;

    const celebrities = await SearchCelebrities("", true, false);
    const celebritiesSorted =
        celebrities?.sort((a, b) => {
            return a.name.localeCompare(b.name);
        }) ?? [];

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <UpsertBet
                year={number}
                circleId={params.id}
                celebrities={celebritiesSorted}
                bet={currentBet}
            />
        </div>
    );
}
