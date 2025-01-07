"use client";

import { Celebrity } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { mergeCelebrityAction, updateCelebrityAction } from "@/lib/actions/celebrity";
import {
    DatePicker,
    Input,
    Button,
    Autocomplete,
    AutocompleteItem,
    Avatar
} from "@nextui-org/react";
import { parseDate, CalendarDate } from "@internationalized/date";
import { useRouter } from "next/navigation";

interface CelebrityUpdateProps {
    celebrity: Celebrity;
    celebrities: Celebrity[];
    onBack: () => void;
}

export default function CelebrityUpdate({ celebrity, onBack, celebrities }: CelebrityUpdateProps) {
    const router = useRouter();

    const [birthDate, setBirthDate] = useState<CalendarDate | null>(null);
    const [deathDate, setDeathDate] = useState<CalendarDate | null>(null);
    const [urlPhoto, setUrlPhoto] = useState<string | null>(null);
    const [name, setName] = useState<string>("");

    const [key, setValue] = React.useState<React.Key | null>(null);

    const onUpdateCelebrity = async () => {
        await updateCelebrityAction(
            celebrity.id,
            name,
            birthDate ? new Date(birthDate.toString()).toISOString() : null,
            deathDate ? new Date(deathDate.toString()).toISOString() : null,
            urlPhoto
        );

        onBack();
    };

    const onMergeCelebrity = async () => {
        await mergeCelebrityAction(celebrity.id, key as string);
        router.replace(`/celebrities/${key}`);
    };

    const updateIsDisabled = () => {
        if (name?.length === 0) return true;
        if (birthDate === null) return true;
        if (celebrity.photo !== urlPhoto) return false;
        if (celebrity.name !== name) return false;
        if (!!birthDate && celebrity.birth && !deathDate) return true;
        return !birthDate && !deathDate;
    };

    useEffect(() => {
        if (celebrity.photo) setUrlPhoto(celebrity.photo);
        if (celebrity.name) setName(celebrity.name);

        if (celebrity.birth) {
            const date = new Date(celebrity?.birth);
            const isoString = date.toISOString().split("T")[0];
            setBirthDate(parseDate(isoString));
        }

        if (celebrity.death) {
            const date = new Date(celebrity?.death);
            const isoString = date.toISOString().split("T")[0];
            setDeathDate(parseDate(isoString));
        }
    }, [celebrity]);

    return (
        <div className="flex flex-col gap-4 h-screen">
            <div className="flex flex-col gap-4">
                <Input
                    isRequired
                    variant="bordered"
                    label="Nom"
                    value={name || ""}
                    onValueChange={setName}
                    isInvalid={name.length === 0}
                />
                <Input
                    variant="bordered"
                    label="Url photo"
                    value={urlPhoto || ""}
                    onValueChange={setUrlPhoto}
                />

                <DatePicker
                    isRequired
                    variant="bordered"
                    showMonthAndYearPickers
                    className="w-full"
                    label="Date de naissance"
                    value={birthDate}
                    isInvalid={birthDate === null}
                    onChange={setBirthDate}
                />
                <DatePicker
                    showMonthAndYearPickers
                    variant="bordered"
                    className="w-full"
                    label="Date de décès"
                    value={deathDate}
                    onChange={setDeathDate}
                    isDisabled={!!celebrity.death}
                />
            </div>
            <Button
                color="primary"
                onPress={() => onUpdateCelebrity()}
                isDisabled={updateIsDisabled()}
            >
                Mettre à jour
            </Button>

            <div className="flex flex-col gap-4 my-6">
                <p className="text-2xl">Fusion</p>
                <Autocomplete
                    defaultItems={celebrities}
                    label="Chercher une autre célébrité"
                    selectedKey={key}
                    variant="bordered"
                    fullWidth
                    onSelectionChange={setValue}
                    description={`La célébrité ${celebrity.name} sera remplacé par celle sélectionné. Cela implique toutes les prédictions concernant ${celebrity.name}.`}
                >
                    {(item) => (
                        <AutocompleteItem key={item.id} textValue={item.name}>
                            <div className="flex gap-2 items-center">
                                <Avatar
                                    alt={item.name}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={item.photo ?? undefined}
                                />
                                <div className="flex flex-col">
                                    <span className="text-small">{item.name}</span>
                                    <span className="text-tiny text-default-400">{item.id}</span>
                                </div>
                            </div>
                        </AutocompleteItem>
                    )}
                </Autocomplete>
                <Button
                    color="primary"
                    onPress={() => onMergeCelebrity()}
                    isDisabled={!key || !!celebrity.death}
                >
                    Fusionner
                </Button>
            </div>

            <Button color="secondary" variant="solid" onPress={onBack}>
                Retour
            </Button>
        </div>
    );
}
