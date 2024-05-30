import React from "react";
import ToggleTheme from "@/components/layout/toggleTheme";

export default async function Page() {
    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col items-center gap-4 p-4 lg:hidden">
                <div className="flex text-xl">Changer le thème</div>
                <ToggleTheme />
            </div>
        </main>
    );
}
