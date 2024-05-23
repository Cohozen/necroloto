import { Celebrity } from "@prisma/client";
import { listAllCelebrities } from "@/lib/api/celebrity";
import CelebritiesCardList from "./celebritiesCardList";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const celebrities: Celebrity[] = await listAllCelebrities();

    return (
        <div className="flex flex-col items-center gap-8 p-4 md:p-10 h-full">
            <div className="flex text-2xl font-bold">Les célébrités</div>
            {celebrities && <CelebritiesCardList celebrities={celebrities} />}
        </div>
    );
}
