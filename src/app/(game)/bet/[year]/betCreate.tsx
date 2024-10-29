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
    Card,
    CardBody,
    CardHeader,
    MenuTriggerAction
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
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

    const [confirmationOpened, setConfirmationOpened] = useState(false);
    const [fieldState, setFieldState] = useState<AutocompleteState>({
        selectedKey: null,
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
                    size="md"
                    fullWidth
                    allowsCustomValue
                    listboxProps={{
                        emptyContent: "Ajouter une nouvelle célébrité"
                    }}
                    description="Tu peux ajouter de nouvelles célébrités"
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
                    variant="solid"
                    radius="lg"
                    className="h-14"
                    onPress={onPressAddButton}
                    isDisabled={fieldState.selectedKey === null && fieldState.inputValue === ""}
                >
                    Ajouter
                </Button>
            </div>

            <Card
                fullWidth
                isBlurred
                shadow="sm"
                className="border-none bg-background/60 dark:bg-default-100/50"
            >
                <CardHeader className="pb-0 text-xs">
                    {`${selectedCelebrities.length}/${maxCelebritiesInBet} sélectionné${
                        selectedCelebrities.length > 1 ? "s" : ""
                    }`}
                </CardHeader>
                <CardBody>
                    <div className="flex flex-wrap gap-1">
                        {selectedCelebrities.map((c) => {
                            const celebrity = celebrities.find((celebrity) => celebrity.id === c);
                            return (
                                <Chip
                                    key={c}
                                    variant="flat"
                                    onClose={() => handleDeleteCelebrity(c)}
                                    avatar={
                                        <Avatar
                                            name={celebrity?.name ?? c}
                                            src={celebrity?.photo ?? ""}
                                            getInitials={(name) => name.charAt(0)}
                                        />
                                    }
                                >
                                    {celebrity?.name ?? c}
                                </Chip>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>

            <Button
                color="primary"
                variant="solid"
                radius="full"
                isDisabled={selectedCelebrities.length < maxCelebritiesInBet || loadingCreate}
                onPress={() => setConfirmationOpened(true)}
            >
                Valider la prédiction
            </Button>

            <Drawer.Root
                direction="bottom"
                open={confirmationOpened}
                onOpenChange={setConfirmationOpened}
            >
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-background flex flex-col rounded-t-2xl mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
                        <div className="p-4 bg-background rounded-t-2xl flex-1">
                            <div
                                aria-hidden
                                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-default-50 mb-8"
                            />
                            <div className="max-w-md mx-auto flex flex-col gap-4">
                                <Drawer.Title className="text-xl font-medium">
                                    Confirmation
                                </Drawer.Title>
                                <p>
                                    Vérifie bien ta prédiction avant de la valider, il serait
                                    dommage de se tromper !
                                </p>
                                <div className="flex flex-row gap-2">
                                    <Button
                                        color="default"
                                        variant="ghost"
                                        radius="full"
                                        className="basis-1/2"
                                        onPress={() => setConfirmationOpened(false)}
                                    >
                                        Retour
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="solid"
                                        radius="full"
                                        className="basis-1/2"
                                        isLoading={loadingCreate}
                                        onPress={() => onCreateBet()}
                                    >
                                        Confirmer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}
