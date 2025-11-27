"use client";

import { Button, Listbox, ListboxItem, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { Circle } from "@prisma/client";
import { updateCircleAction } from "@/lib/actions/circle";

interface SettingsFormProps {
    circle: Circle;
}

export default function SettingsForm({ circle }: SettingsFormProps) {
    const [allowNewBet, setAllowNewBet] = useState(circle.allowNewBet);

    const onUpdateAllowNewBet = async (value: boolean) => {
        setAllowNewBet(value);
        await updateCircleAction(circle.id, value);
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-xl font-semibold">Réglages</h1>
            <Listbox
                className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible rounded-medium"
                itemClasses={{
                    base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                    description: "text-2xs text-gray-500"
                }}
            >
                <ListboxItem
                    key="code"
                    description="Code du cercle"
                    endContent={
                        <Button
                            color="secondary"
                            variant="light"
                            size="sm"
                            onPress={() => {
                                navigator.clipboard.writeText(circle.code || "");
                            }}
                        >
                            Copier le code
                        </Button>
                    }
                >
                    <div className="flex w-full justify-between">
                        <span>{circle.code}</span>
                    </div>
                </ListboxItem>
                <ListboxItem
                    key="allowNewBet"
                    endContent={
                        <Switch
                            color="secondary"
                            isSelected={allowNewBet}
                            aria-label="Allow new bet"
                            onChange={(event) => onUpdateAllowNewBet(event.target.checked)}
                        />
                    }
                    description="Pour l'année prochaine"
                >
                    <div className="flex justify-between">
                        <span>Activer prédictions</span>
                    </div>
                </ListboxItem>
            </Listbox>
        </div>
    );
}
