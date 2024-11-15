"use client";

import React from "react";
import { Drawer } from "vaul";

export default function Rules() {
    return (
        <div className="flex justify-center">
            <Drawer.Root>
                <Drawer.Trigger className="text-default-400 text-center mt-4 underline hover:text-default-600 transition-colors text-sm">
                    {"Les règles"}
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
                        <div className="p-4 bg-background rounded-t-[10px] flex-1">
                            <div
                                aria-hidden
                                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-default-200 mb-8"
                            />
                            <div className="max-w-md mx-auto">
                                <Drawer.Title className="text-default-800 font-medium mb-4">
                                    Bienvenue sur Necroloto.
                                </Drawer.Title>
                                <p className="text-default-600 mb-2 text-justify">
                                    {
                                        "Le jeu où vous pouvez prédire les personnalités qui marqueront l'année en nous quittant. Faites vos choix avant le 1er janvier et découvrez qui aura le flair le plus aiguisé."
                                    }
                                </p>
                                <p className="text-default-600 mb-2 text-justify">
                                    Êtes-vous prêt à relever le défi de la prédiction ?
                                </p>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}
