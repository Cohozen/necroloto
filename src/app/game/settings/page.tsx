import React from "react";
import ToggleTheme from "@/components/layout/toggleTheme";

export default async function Page() {
    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-4 p-4 lg:hidden pt-8">
                <span className="text-lg font-bold">Apparence</span>
                <div className="flex flex-row items-center gap-4 w-full justify-between">
                    <div className="text-lg">Thème</div>
                    <ToggleTheme />
                </div>
            </div>
        </main>
    );
}
