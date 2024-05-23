import { Celebrity } from "@prisma/client";
import { listAllCelebrities } from "@/lib/api/celebrity";
import CelebritiesCardList from "./celebritiesCardList";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const celebrities: Celebrity[] = await listAllCelebrities();

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-4 p-4">
                {celebrities && (
                    <>
                        <div className="flex text-2xl font-bold justify-center">{`${celebrities.length} célébrités`}</div>
                        <CelebritiesCardList celebrities={celebrities} />
                    </>
                )}
            </div>
        </main>
    );
}
