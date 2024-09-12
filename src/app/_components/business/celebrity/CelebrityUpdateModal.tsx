"use client";

import Modal from "../../ui/modal";
import { Celebrity } from "@prisma/client";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useRouter } from "next/navigation";

interface CelebrityUpdateModalProps {
    open: boolean;
    onClose: () => void;
    celebrity: Celebrity;
}

export default function CelebrityUpdateModal({ open, onClose, celebrity }: CelebrityUpdateModalProps) {
    const [birthDate, setBirthDate] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });
    const [deathDate, setDeathDate] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });
    const [urlPhoto, setUrlPhoto] = useState<string | null>(null);

    const router = useRouter();

    const { trigger: updateCelebrity, isMutating } = useClerkSWRMutation(`/api/celebrities/${celebrity.id}`, "PUT");

    const updateIsDisabled = () => {
        if (isMutating) return true;
        if (celebrity.photo !== urlPhoto) return false;
        if (!!birthDate?.startDate && celebrity.birth && !deathDate?.startDate) return true;
        if (!birthDate?.startDate && !deathDate?.startDate) return true;
        return false;
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
    }, [celebrity]);

    return (
        <Modal
            id={`modal_celebrity_${celebrity.id}`}
            title={`Mise à jour de la célébrité ${celebrity?.name}`}
            open={open}
            onClose={onClose}
        >
            <>
                <div className="flex flex-col gap-4 py-6 mb-48">
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
                    <button className="btn btn-ghost" onClick={onClose}>
                        Fermer
                    </button>
                    <button
                        className="btn btn-outline btn-primary"
                        disabled={updateIsDisabled()}
                        onClick={async () => {
                            const celebrityToUpdate = {
                                ...celebrity,
                                birth: new Date(birthDate?.startDate || "") || null,
                                death: new Date(deathDate?.startDate || "") || null,
                                photo: urlPhoto || null
                            };

                            try {
                                const updateResult = await updateCelebrity(celebrityToUpdate);
                                if (updateResult) {
                                    router.push(`/admin/`);
                                    onClose();
                                }
                            } catch (e) {
                                // gestion de l'erreur
                            }
                        }}
                    >
                        {isMutating && <span className="loading loading-spinner"></span>}
                        Mettre à jour
                    </button>
                </div>
            </>
        </Modal>
    );
}
