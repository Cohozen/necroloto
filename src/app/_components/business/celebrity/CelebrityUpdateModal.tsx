"use client";

import Modal from "../../ui/modal";
import { Celebrity } from "@prisma/client";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useRouter } from "next/navigation";

interface CelebrityUpdateModalProps {
    open: boolean;
    celebrity: Celebrity;
}

export default function CelebrityUpdateModal({ open, celebrity }: CelebrityUpdateModalProps) {
    const [birthDate, setBirthDate] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });
    const [deathDate, setDeathDate] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });

    const router = useRouter();

    const { trigger: updateCelebrity, isMutating } = useClerkSWRMutation(`/api/celebrities/${celebrity.id}`, "PUT");

    useEffect(() => {
        if (celebrity.birth) {
            setBirthDate({
                startDate: celebrity.birth,
                endDate: celebrity.birth
            });
        }
    }, [celebrity]);

    return (
        <Modal
            id={`modal_celebrity_${celebrity.id}`}
            title={`Mise à jour de la célébrité ${celebrity?.name}`}
            open={open}
        >
            <div className="flex flex-col gap-4 p-4">
                <Datepicker
                    asSingle={true}
                    useRange={false}
                    value={birthDate}
                    onChange={(value) => setBirthDate(value)}
                    displayFormat={"DD/MM/YYYY"}
                    placeholder="Date de naissance"
                />
                <Datepicker
                    asSingle={true}
                    useRange={false}
                    value={deathDate}
                    onChange={(value) => setDeathDate(value)}
                    displayFormat={"DD/MM/YYYY"}
                    placeholder="Date de décès"
                />
                <button
                    className="btn btn-outline btn-primary"
                    disabled={isMutating}
                    onClick={async () => {
                        const celebrityToUpdate = {
                            ...celebrity,
                            birth: new Date(birthDate?.startDate || "") || null,
                            death: new Date(deathDate?.startDate || "") || null
                        };

                        try {
                            const updateResult = await updateCelebrity(celebrityToUpdate);
                            if (updateResult) {
                                router.push(`/game/admin/`);

                                // @ts-ignore
                                document.getElementById(`modal_celebrity_${celebrity.id}`)?.close();
                            }
                        } catch (e) {
                            // gestion de l'erreur
                        }
                    }}
                >
                    Mettre à jour
                </button>
            </div>
        </Modal>
    );
}
