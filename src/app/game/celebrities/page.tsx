import CelebritiesCardList from "./celebritiesCardList";
import React from "react";

export const metadata = {
    title: "Necroloto | Célébrités"
};

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="flex-1 overflow-auto p-4 md:px-24 lg:px-48 xl:px-80">
            <CelebritiesCardList />
        </main>
    );
}
