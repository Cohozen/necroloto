"use client";

import { Celebrity } from "@prisma/client";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useRouter } from "next/navigation";

interface CelebrityUpdateProps {
    celebrity: Celebrity;
}

export default function CelebrityUpdate({ celebrity }: CelebrityUpdateProps) {
    const [birthDate, setBirthDate] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });
    const [deathDate, setDeathDate] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });
    const [urlPhoto, setUrlPhoto] = useState<string | null>(null);
    const [name, setName] = useState<string>("");

    const router = useRouter();

    const { trigger: updateCelebrity, isMutating } = useClerkSWRMutation(
        `/api/celebrities/${celebrity.id}`,
        "PUT"
    );

    const onUpdateCelebrity = async () => {
        const celebrityToUpdate = {
            id: celebrity.id,
            birth: new Date(birthDate?.startDate || "") || null,
            death: new Date(deathDate?.startDate || "") || null,
            photo: urlPhoto || null,
            name: name
        };

        try {
            const updateResult = await updateCelebrity(celebrityToUpdate);
            if (updateResult) router.refresh();
        } catch (e) {
            // gestion de l'erreur
        }
    };

    const updateIsDisabled = () => {
        if (isMutating) return true;
        if (name?.length === 0) return true;
        if (celebrity.photo !== urlPhoto) return false;
        if (celebrity.name !== name) return false;
        if (!!birthDate?.startDate && celebrity.birth && !deathDate?.startDate) return true;
        return !birthDate?.startDate && !deathDate?.startDate;
    };

    useEffect(() => {
        if (celebrity.photo) setUrlPhoto(celebrity.photo);

        if (celebrity.birth)
            setBirthDate({
                startDate: celebrity.birth,
                endDate: celebrity.birth
            });

        if (celebrity.death)
            setBirthDate({
                startDate: celebrity.death,
                endDate: celebrity.death
            });

        if (celebrity.name) setName(celebrity.name);
    }, [celebrity]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nom"
                    className="input input-bordered w-full"
                    value={name || ""}
                    onChange={(v) => setName(v.target.value)}
                />
                <input
                    type="text"
                    placeholder="Url photo"
                    className="input input-bordered w-full"
                    value={urlPhoto || ""}
                    onChange={(v) => setUrlPhoto(v.target.value)}
                />
                <Datepicker
                    asSingle={true}
                    useRange={false}
                    value={birthDate}
                    onChange={(value) => setBirthDate(value)}
                    displayFormat={"DD/MM/YYYY"}
                    placeholder="Date de naissance"
                    disabled={!!celebrity.birth}
                    inputClassName="input input-bordered w-full text-base-content"
                />
                <Datepicker
                    asSingle={true}
                    showShortcuts={true}
                    useRange={false}
                    value={deathDate}
                    onChange={(value) => setDeathDate(value)}
                    displayFormat={"DD/MM/YYYY"}
                    placeholder="Date de décès"
                    disabled={!!celebrity.death}
                    inputClassName="input input-bordered w-full text-base-content"
                />
            </div>
            <div className="flex flex-row justify-between">
                <button
                    className="btn btn-primary"
                    disabled={updateIsDisabled()}
                    onClick={() => onUpdateCelebrity()}
                >
                    {isMutating && <span className="loading loading-spinner"></span>}
                    Mettre à jour
                </button>
            </div>
        </div>
    );
}
