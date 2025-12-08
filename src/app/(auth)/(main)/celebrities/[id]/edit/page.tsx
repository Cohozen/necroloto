import React from "react";

import { notFound } from "next/navigation";
import CelebrityUpdate from "@/components/business/celebrities/celebrityUpdate";
import { getCelebrity, SearchCelebrities } from "@/lib/api/celebrity";
import { currentUser } from "@clerk/nextjs/server";

export default async function EditCelebrityPage({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) notFound();

    let isAdmin = false;
    const roles = user.publicMetadata?.roles as string[];
    if (roles) isAdmin = roles.some((r) => r === "admin");

    const celebrity = await getCelebrity(params.id);
    const celebrities = await SearchCelebrities("", true, true);
    const celebritiesSorted =
        celebrities
            ?.filter((c) => c.id !== params.id && !c.death)
            ?.sort((a, b) => {
                return a.name.localeCompare(b.name);
            }) ?? [];

    if (!celebrity || !isAdmin) notFound();

    return (
        <div className="flex flex-col p-4">
            <CelebrityUpdate celebrity={celebrity} celebrities={celebritiesSorted} />
        </div>
    );
}
