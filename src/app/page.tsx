export const metadata = {
    title: "Necroloto",
    description: "Necroloto Application."
};

export default async function IndexPage() {
    return (
        <div className="flex min-h-max max-w-[100vw] flex-col items-center justify-start">
            <div className="shrink">
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-2 py-10 text-center xl:justify-start xl:pe-0 xl:ps-10 xl:text-start">
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
                            {"Le jeu où vous pouvez prédire les personnalités qui marqueront l'année en nous quittant."}
                            <br />
                            {"Faites vos choix avant le 1er janvier et découvrez qui aura le flair le plus aiguisé."}
                            <br />
                            {"Êtes-vous prêt à relever "}
                            <span className="border-base-content/20 border-b-2">{"le défi de la prédiction ?"}</span>
                        </p>
                        <div className="h-10"></div>
                        <div className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0">
                            <a href="/sign-up" className="btn md:btn-lg md:btn-wide group px-12">
                                {"S'inscrire"}
                            </a>
                            <a className="btn btn-neutral md:btn-lg md:btn-wide group px-12">{"Les règles"}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
