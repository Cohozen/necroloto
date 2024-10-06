import CelebritiesList from "../../_components/business/celebrities/CelebritiesList";
import React from "react";
import { listAllCelebrities, SearchCelebrities } from "@/lib/api/celebrity";

export const metadata = {
    title: "Necroloto | Célébrités"
};

export default async function CelebritiesPage({
    searchParams
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const query = (await searchParams).q;
    const celebrities = query
        ? await SearchCelebrities(query, true, true)
        : await listAllCelebrities();

    return (
        <main className="overflow-auto">
            <CelebritiesList celebrities={celebrities} />
        </main>
    );
}