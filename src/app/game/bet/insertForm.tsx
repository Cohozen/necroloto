"use client";

import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InsertForm() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const year = 2024;

    const [celebrity1, setCelebrity1] = useState<string>();
    const [celebrity2, setCelebrity2] = useState<string>();
    const [celebrity3, setCelebrity3] = useState<string>();
    const [celebrity4, setCelebrity4] = useState<string>();
    const [celebrity5, setCelebrity5] = useState<string>();
    const [celebrity6, setCelebrity6] = useState<string>();
    const [celebrity7, setCelebrity7] = useState<string>();
    const [celebrity8, setCelebrity8] = useState<string>();
    const [celebrity9, setCelebrity9] = useState<string>();
    const [celebrity10, setCelebrity10] = useState<string>();
    const [celebrity11, setCelebrity11] = useState<string>();
    const [celebrity12, setCelebrity12] = useState<string>();
    const [celebrity13, setCelebrity13] = useState<string>();
    const [celebrity14, setCelebrity14] = useState<string>();
    const [celebrity15, setCelebrity15] = useState<string>();

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Célébrité 1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity1(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 2"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity2(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 3"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity3(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 4"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity4(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 5"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity5(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 6"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity6(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 7"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity7(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 8"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity8(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 9"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity9(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 10"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity10(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 11"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity11(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 12"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity12(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 13"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity13(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 14"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity14(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Célébrité 15"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity15(e.target.value)}
                />
            </div>
            <button
                className="btn btn-outline btn-primary"
                disabled={isMutating}
                onClick={async () => {
                    setErrorForm(false);

                    const celebrities = [
                        celebrity1,
                        celebrity2,
                        celebrity3,
                        celebrity4,
                        celebrity5,
                        celebrity6,
                        celebrity7,
                        celebrity8,
                        celebrity9,
                        celebrity10,
                        celebrity11,
                        celebrity12,
                        celebrity13,
                        celebrity14,
                        celebrity15
                    ];

                    // const someEmpty = celebrities.some((c) => !c?.name?.trim());
                    // if (someEmpty) {
                    //     setErrorForm(true);
                    //     return;
                    // }

                    try {
                        const createResult = await insertBet({
                            year,
                            celebrities: celebrities.filter((c) => typeof c === "string")
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
