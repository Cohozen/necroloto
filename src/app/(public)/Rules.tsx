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
                    <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
                        <div className="p-4 bg-white rounded-t-[10px] flex-1">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                            <div className="max-w-md mx-auto">
                                <Drawer.Title className="font-medium mb-4 text-gray-900">
                                    Bienvenue sur Necroloto.
                                </Drawer.Title>
                                <p className="text-gray-600 mb-2 text-justify">
                                    {
                                        "Le jeu où vous pouvez prédire les personnalités qui marqueront l'année en nous quittant. Faites vos choix avant le 1er janvier et découvrez qui aura le flair le plus aiguisé."
                                    }
                                </p>
                                <p className="text-gray-600 mb-2 text-justify">
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
