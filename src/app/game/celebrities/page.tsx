import CelebritiesCardList from "./celebritiesCardList";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-4 p-4">
                <CelebritiesCardList />
            </div>
        </main>
    );
}
