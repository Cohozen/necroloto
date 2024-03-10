"use client";

import Modal from "../../ui/modal";
import { Celebrity } from "@prisma/client";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import useClerkSWR from "@/utils/hooks/useClerkSWR";
import { useRouter } from "next/navigation";
import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";

interface CelebrityMergeModalProps {
    open: boolean;
    onClose: () => void;
    celebrity: Celebrity;
}

export default function CelebrityMergeModal({ open, onClose, celebrity }: CelebrityMergeModalProps) {
    const [selectedCelebrity, setSelectedCelebrity] = useState<string | null>(null);

    const router = useRouter();

    const { data: celebrities } = useClerkSWR<Celebrity[]>(`/api/celebrities`);

    const { trigger: mergeCelebrity, isMutating } = useClerkSWRMutation(
        `/api/celebrities/${celebrity.id}/merge/${selectedCelebrity}`
    );

    return (
        <Modal
            id={`modal_merge_celebrity_${celebrity.id}`}
            title={`Fusion de la célébrité ${celebrity?.name}`}
            open={open}
            onClose={onClose}
        >
            <div className="flex flex-col gap-4 p-4">
                <select
                    className="select select-bordered w-full"
                    value={selectedCelebrity || ""}
                    onChange={(event) => setSelectedCelebrity(event.target.value)}
                >
                    {celebrities?.map((celebrity) => {
                        return (
                            <option key={celebrity.id} value={celebrity.id}>
                                {celebrity.name}
                            </option>
                        );
                    })}
                </select>
                <button
                    className="btn btn-outline btn-primary"
                    disabled={isMutating}
                    onClick={async () => {
                        if (!selectedCelebrity) return null;

                        try {
                            const mergeResult = await mergeCelebrity();
                            if (mergeResult) {
                                router.push(`/game/admin/`);

                                // @ts-ignore
                                document.getElementById(`modal_merge_celebrity_${celebrity.id}`)?.close();
                            }
                        } catch (e) {
                            // gestion de l'erreur
                        }
                    }}
                >
                    Fusionner
                </button>
            </div>
        </Modal>
    );
}
