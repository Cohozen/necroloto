"use client";

import { Celebrity } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { updateCelebrityAction } from "@/lib/actions/celebrity";
import { DatePicker, Input, Button } from "@nextui-org/react";
import { parseDate, CalendarDate } from "@internationalized/date";

interface CelebrityUpdateProps {
    celebrity: Celebrity;
    onBack: () => void;
}

export default function CelebrityUpdate({ celebrity, onBack }: CelebrityUpdateProps) {
    const [birthDate, setBirthDate] = useState<CalendarDate | null>(null);
    const [deathDate, setDeathDate] = useState<CalendarDate | null>(null);
    const [urlPhoto, setUrlPhoto] = useState<string | null>(null);
    const [name, setName] = useState<string>("");

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
                />
            </div>
            <div className="flex flex-row gap-2">
                <Button
                    color="primary"
                    onPress={() => onUpdateCelebrity()}
                    disabled={updateIsDisabled()}
                >
                    Mettre à jour
                </Button>
                <Button color="secondary" variant="solid" onPress={onBack}>
                    Retour
                </Button>
            </div>
        </div>
    );
}
