import { currentUser } from "@clerk/nextjs";
import React from "react";
import { getCelebrityWithBets } from "@/lib/api/celebrity";
import Celebrity from "./celebrity";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    let isAdmin = false;

    if (user) {
        const roles = user.publicMetadata?.roles as string[];
        if (roles) isAdmin = roles.some((r) => r === "admin");
    }

    // const res = await fetch(`/api/celebrities/${params.id}`)

    const celebrity = await getCelebrityWithBets(params.id);

    return (
        <main className="flex-1 overflow-auto p-4 md:px-24 lg:px-48 xl:px-80">
            <div className="flex flex-col gap-4">
                {celebrity && <Celebrity celebrity={celebrity} isAdmin={isAdmin} />}
            </div>
        </main>
    );
}
