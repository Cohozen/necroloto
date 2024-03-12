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
            <>
                <div className="flex flex-col gap-4 p-4">
                    <div role="alert" className="alert alert-warning">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>
                            <b>Attention</b> : la célébrité <b>{celebrity?.name}</b> sera supprimé. Tous les paris avec
                            cette célébrité seront modifiés avec celle sélectionné.
                        </span>
                    </div>
                    <select
                        className="select select-bordered w-full"
                        value={selectedCelebrity || ""}
                        onChange={(event) => setSelectedCelebrity(event.target.value)}
                    >
                        {celebrities
                            ?.sort((a, b) => {
                                return a.name.localeCompare(b.name);
                            })
                            ?.map((celebrity) => {
                                return (
                                    <option key={celebrity.id} value={celebrity.id}>
                                        {celebrity.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="flex flex-row justify-between">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Fermer
                    </button>
                    <button
                        className="btn btn-outline btn-primary"
                        disabled={isMutating}
                        onClick={async () => {
                            if (!selectedCelebrity) return null;

                            try {
                                const mergeResult = await mergeCelebrity();
                                if (mergeResult) {
                                    router.push(`/game/admin/`);
                                    onClose();
                                }
                            } catch (e) {
                                // gestion de l'erreur
                            }
                        }}
                    >
                        Fusionner
                    </button>
                </div>
            </>
        </Modal>
    );
}
