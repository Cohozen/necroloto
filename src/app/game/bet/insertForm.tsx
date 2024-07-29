"use client";

import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uniq } from "lodash";

export default function InsertForm() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const year: number = 2024;

    const [values, setValues] = useState("");

    const [errorForm, setErrorForm] = useState("");
    const [successForm, setSuccessForm] = useState(false);

    const { trigger: insertBet, isMutating } = useClerkSWRMutation(
        `/api/users/${user?.externalId}/bet`
    );

    return (
        <div className="flex flex-col gap-4">
            {errorForm.length > 0 && (
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
                    <span>{errorForm}</span>
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
                    <span>Votre pari est enregistré.</span>
                </div>
            )}
            <label className="form-control">
                <textarea
                    className="textarea textarea-bordered h-36"
                    placeholder="Paris"
                    disabled={isMutating}
                    onChange={(e) => setValues(e.target.value)}
                />
                <div className="label">
                    <span className="label-text-alt">{`Séparer les noms des célébrités par des points virgules ( ; )`}</span>
                </div>
            </label>
            <button
                className="btn btn-primary"
                disabled={isMutating}
                onClick={async () => {
                    setErrorForm("");

                    const celebrities = uniq(values.split(";").filter((v) => v.trim()));

                    const someEmpty = celebrities.some((c) => !c.trim());

                    if (celebrities.length < 30) {
                        setErrorForm(
                            `Il te manque des noms ! ${30 - celebrities.length - 1} manquant.`
                        );
                        return;
                    }

                    if (celebrities.length > 30) {
                        setErrorForm(`Trop de noms ! ${celebrities.length - 30} en trop.`);
                        return;
                    }

                    if (someEmpty) {
                        setErrorForm("Il reste des cases vides !");
                        return;
                    }

                    try {
                        const createResult = await insertBet({
                            year,
                            celebrities
                        });

                        if (createResult) {
                            setSuccessForm(true);
                            router.push(`/game/bets/${createResult.id}`);
                        }
                    } catch (e) {
                        // gestion de l'erreur
                    }
                }}
            >
                Parier
                {isMutating && <span className="loading loading-spinner loading-sm"></span>}
            </button>
        </div>
    );
}
