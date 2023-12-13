"use client";

import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { CelebrityBet } from "@/lib/api/bet";
import { useRouter } from "next/navigation";

export default function InsertForm() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const [celebrity1, setCelebrity1] = useState<CelebrityBet>();
    const [celebrity2, setCelebrity2] = useState<CelebrityBet>();
    const [celebrity3, setCelebrity3] = useState<CelebrityBet>();
    const [celebrity4, setCelebrity4] = useState<CelebrityBet>();
    const [celebrity5, setCelebrity5] = useState<CelebrityBet>();
    const [celebrity6, setCelebrity6] = useState<CelebrityBet>();
    const [celebrity7, setCelebrity7] = useState<CelebrityBet>();
    const [celebrity8, setCelebrity8] = useState<CelebrityBet>();
    const [celebrity9, setCelebrity9] = useState<CelebrityBet>();
    const [celebrity10, setCelebrity10] = useState<CelebrityBet>();
    const [celebrity11, setCelebrity11] = useState<CelebrityBet>();
    const [celebrity12, setCelebrity12] = useState<CelebrityBet>();
    const [celebrity13, setCelebrity13] = useState<CelebrityBet>();
    const [celebrity14, setCelebrity14] = useState<CelebrityBet>();
    const [celebrity15, setCelebrity15] = useState<CelebrityBet>();

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
                    onChange={(e) => setCelebrity1({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 2"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity2({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 3"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity3({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 4"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity4({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 5"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity5({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 6"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity6({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 7"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity7({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 8"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity8({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 9"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity9({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 10"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity10({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 11"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity11({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 12"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity12({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 13"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity13({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 14"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity14({ name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Célébrité 15"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setCelebrity15({ name: e.target.value })}
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
                        const result = await insertBet(celebrities);
                        if (result) {
                            console.log(result);
                            setSuccessForm(true);
                            router.push(`/game/bets/${result.insertedId}`);
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
