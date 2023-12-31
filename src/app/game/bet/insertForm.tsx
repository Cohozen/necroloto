"use client";

import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InsertForm() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const year: number = 2024;

    const [values, setValues] = useState("");

    const [errorForm, setErrorForm] = useState(false);
    const [successForm, setSuccessForm] = useState(false);

    const { trigger: insertBet, isMutating } = useClerkSWRMutation(`/api/users/${user?.externalId}/bet`);

    return (
        <div className="flex flex-col gap-4">
            {errorForm && (
                <div role="alert" className="alert alert-error">
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
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Erreur ! Veuillez saisir tous les champs textes.</span>
                </div>
            )}
            {successForm && (
                <div role="alert" className="alert alert-success">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Votre parie est enregistré.</span>
                </div>
            )}
            <label className="form-control">
                <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Paries"
                    onChange={(e) => setValues(e.target.value)}
                />
                <div className="label">
                    <span className="label-text-alt">{`Séparer les noms des célébrités par des points virgules ( ; )`}</span>
                </div>
            </label>
            <button
                className="btn btn-outline btn-primary"
                disabled={isMutating}
                onClick={async () => {
                    setErrorForm(false);

                    const celebrities = values.split(";").filter((v) => v.trim());

                    // const someEmpty = celebrities.some((c) => !c.trim());
                    // if (someEmpty || celebrities.length !== 50) {
                    //     setErrorForm(true);
                    //     return;
                    // }

                    try {
                        const createResult = await insertBet({
                            year,
                            celebrities
                        });
                        if (createResult) {
                            console.log("createBetResult : ", createResult);
                            setSuccessForm(true);
                            router.push(`/game/bets/${createResult.id}`);
                        }
                    } catch (e) {
                        // gestion de l'erreur
                    }
                }}
            >
                Parier
            </button>
        </div>
    );
}
