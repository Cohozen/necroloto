"use client";

import React, { useState, Key } from "react";
import { Celebrity } from "@prisma/client";
import { useFilter } from "@react-aria/i18n";

import {
    Avatar,
    Chip,
    AutocompleteItem,
    Button,
    Autocomplete,
    Progress,
    MenuTriggerAction
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { createBetWithCelebritiesAction } from "@/lib/actions/bet";

interface BetCreateProps {
    year: number;
    celebrities: Celebrity[];
}

type AutocompleteState = {
    selectedKey: React.Key | null;
    inputValue: string;
    items: Celebrity[];
};

export default function BetCreate({ year, celebrities }: BetCreateProps) {
    const { user } = useUser();
    const router = useRouter();

    const maxCelebritiesInBet = 5;

    const [fieldState, setFieldState] = useState<AutocompleteState>({
        selectedKey: "",
        inputValue: "",
        items: celebrities
    });
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [selectedCelebrities, setSelectedCelebrities] = useState<string[]>([]);

    const { contains } = useFilter({ sensitivity: "base" });

    const onSelectionChange = (key: Key | null) => {
        setFieldState((prevState) => {
            let selectedItem = prevState.items.find((option) => option.id === key);

            return {
                inputValue: selectedItem?.name || "",
                selectedKey: key,
                items: celebrities
                    .filter((c) => !selectedCelebrities.includes(c.id))
                    .filter((item) => contains(item.name, selectedItem?.name || ""))
            };
        });
    };

    const onInputChange = (value: string) => {
        setFieldState((prevState) => ({
            inputValue: value,
            selectedKey: value === "" ? null : prevState.selectedKey,
            items: celebrities
                .filter((c) => !selectedCelebrities.includes(c.id))
                .filter((item) => contains(item.name, value))
        }));
    };

    const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
        if (menuTrigger === "manual" && isOpen) {
            setFieldState((prevState) => ({
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
                items: celebrities.filter((c) => !selectedCelebrities.includes(c.id))
            }));
        }
    };

    const onPressAddButton = () => {
        const newSelected = [...selectedCelebrities];

        if (fieldState.selectedKey) newSelected.push(fieldState.selectedKey.toString());
        else if (fieldState.inputValue) newSelected.push(fieldState.inputValue);

        setSelectedCelebrities(newSelected);

        setFieldState({
            inputValue: "",
            selectedKey: null,
            items: celebrities.filter((c) => !newSelected.includes(c.id))
        });
    };

    const handleDeleteCelebrity = (key: string) => {
        const newSelected = [...selectedCelebrities.filter((c) => c !== key)];
        setSelectedCelebrities(newSelected);

        setFieldState({
            ...fieldState,
            items: celebrities.filter((c) => !newSelected.includes(c.id))
        });
    };

    const onCreateBet = async () => {
        setLoadingCreate(true);

        if (!user?.externalId) return;

        const result = await createBetWithCelebritiesAction(
            user.externalId,
            year,
            selectedCelebrities
        );

        setLoadingCreate(false);
        router.push(`/bets/${result.id}`);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="text-xl font-medium">{`Mes prédictions pour l'année ${year}`}</div>
            <Progress
                label="Progression de la prédiction"
                value={selectedCelebrities.length}
                size="sm"
                showValueLabel={true}
                maxValue={maxCelebritiesInBet}
                classNames={{
                    label: `text-default-600 ${
                        selectedCelebrities.length < maxCelebritiesInBet
                            ? "text-foreground/50"
                            : "font-medium"
                    }`,
                    value: `${
                        selectedCelebrities.length < maxCelebritiesInBet
                            ? "text-foreground/50"
                            : "font-medium"
                    }`
                }}
            />

            <div className="flex flex-row gap-1">
                <Autocomplete
                    inputValue={fieldState.inputValue}
                    items={fieldState.items}
                    selectedKey={fieldState.selectedKey}
                    onInputChange={onInputChange}
                    onOpenChange={onOpenChange}
                    onSelectionChange={onSelectionChange}
                    label={`${celebrities.length} Célébrités`}
                    placeholder="Rechercher une célébrité"
                    radius="lg"
                    size="sm"
                    fullWidth
                    allowsCustomValue
                    listboxProps={{
                        emptyContent: "Ajouter une nouvelle célébrité"
                    }}
                    isDisabled={selectedCelebrities.length >= maxCelebritiesInBet}
                >
                    {(celebrity) => (
                        <AutocompleteItem
                            key={celebrity.id}
                            startContent={
                                <Avatar className="w-6 h-6" src={celebrity.photo ?? ""} />
                            }
                        >
                            {celebrity.name}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
                <Button
                    color="primary"
                    variant="flat"
                    size="lg"
                    onPress={onPressAddButton}
                    isDisabled={fieldState.selectedKey === null && fieldState.inputValue === ""}
                >
                    Ajouter
                </Button>
            </div>

            <div className="flex flex-wrap gap-1">
                {selectedCelebrities.map((c) => {
                    const celebrity = celebrities.find((celebrity) => celebrity.id === c);
                    return (
                        <Chip
                            key={c}
                            variant="flat"
                            avatar={
                                <Avatar
                                    name={celebrity?.name ?? c}
                                    src={celebrity?.photo ?? ""}
                                    getInitials={(name) => name.charAt(0)}
                                />
                            }
                            onClose={() => handleDeleteCelebrity(c)}
                        >
                            {celebrity?.name ?? c}
                        </Chip>
                    );
                })}
            </div>

            <Button
                color="primary"
                variant="flat"
                size="lg"
                isLoading={loadingCreate}
                isDisabled={selectedCelebrities.length < maxCelebritiesInBet}
                onPress={() => onCreateBet()}
            >
                Valider la prédiction
            </Button>
        </div>
    );
}
