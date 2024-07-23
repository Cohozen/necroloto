import ToggleTheme from "@/components/layout/toggleTheme";
import React from "react";
import Image from "next/image";

export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function IndexPage() {
    return (
        <>
            <div className="flex sticky top-0 z-30 h-16 w-full bg-base-100 text-base-content justify-center bg-opacity-90 backdrop-blur shadow-sm">
                <div className="navbar w-full">
                    <div className="flex flex-1 md:gap-1 lg:gap-2">
                        <a href="/" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                            <Image
                                src="/icon-192x192.png"
                                alt="necroloto-logo"
                                width="36"
                                height="36"
                            />
                            <div className="font-title inline-flex text-lg md:text-2xl">
                                Necroloto
                            </div>
                        </a>
                    </div>

                    <div className="flex-0">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <a href="/sign-in">Connexion</a>
                            </li>
                        </ul>
                        <ToggleTheme />
                    </div>
                </div>
            </div>
            <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
                <div className="flex items-center justify-center px-2 py-10 text-center xl:justify-start xl:pe-0 xl:ps-10 xl:text-start">
                    <div>
                        <h1 className="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%] xl:text-start [:root[dir=rtl]_&]:leading-[1.35]">
                            <span className="[&::selection]:text-base-content brightness-150 contrast-150 [&::selection]:bg-blue-700/20">
                                {"Défiez le destin,"}
                            </span>
                            <br />
                            <span className="inline-grid">
                                <span
                                    className="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [transform:translate3d(0,0,0)] [-webkit-text-fill-color:transparent] before:content-[attr(data-text)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
                                    aria-hidden={true}
                                    data-text="anticipez l'avenir !"
                                />
                                <span className="py-2 [&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">
                                    {"anticipez l'avenir !"}
                                </span>
                            </span>
                            <br />
                            <span className="[&::selection]:text-base-content brightness-150 contrast-150 [&::selection]:bg-blue-700/20">
                                {"Bienvenue sur Necroloto"}
                            </span>
                        </h1>
                        <div className="h-4"></div>
                        <p className="text-base-content/70 font-title py-4 font-light md:text-lg xl:text-2xl">
                            {
                                "Le jeu où vous pouvez prédire les personnalités qui marqueront l'année en nous quittant."
                            }
                            <br />
                            {
                                "Faites vos choix avant le 1er janvier et découvrez qui aura le flair le plus aiguisé."
                            }
                            <br />
                            {"Êtes-vous prêt à relever "}
                            <span className="border-base-content/20 border-b-2">
                                {"le défi de la prédiction ?"}
                            </span>
                        </p>
                        <div className="h-10"></div>
                        <div className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0 md:mt-20">
                            <a
                                href="/sign-up"
                                className="btn btn-primary md:btn-lg md:btn-wide group px-12"
                            >
                                {"S'inscrire"}
                            </a>
                            <a className="btn btn-neutral md:btn-lg md:btn-wide group px-12">
                                {"Les règles"}
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="sticky bottom-0 footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by Necroloto</p>
                </aside>
            </footer>
        </>
    );
}
