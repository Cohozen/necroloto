import { getBetByUserAndYear } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs/server";
import BetCreate from "./betCreate";
import { SearchCelebrities } from "@/lib/api/celebrity";
import { notFound, redirect } from "next/navigation";

export default async function BetPage({ params }: { params: { year: string } }) {
    const user = await currentUser();
    const number = parseInt(params.year, 10);

    if (process.env.ALLOW_NEW_BET !== "true" || number !== 2026) notFound();

    if (user && user.externalId) {
        const result = await getBetByUserAndYear(user.externalId, number);
        if (result) redirect(`/bets/${result.id}`);
    }

    const celebrities = await SearchCelebrities("", true, false);
    const celebritiesSorted =
        celebrities?.sort((a, b) => {
            return a.name.localeCompare(b.name);
        }) ?? [];

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <BetCreate year={number} celebrities={celebritiesSorted} />
        </div>
    );
}
