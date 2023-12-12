"use client";

import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useUser } from "@clerk/nextjs";

export default function InsertForm() {
    const { user, isLoaded } = useUser();

    const { trigger, isMutating } = useClerkSWRMutation(`/api/users/${user?.externalId}/bet`);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <input type="text" placeholder="Célébrité 1" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 2" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 3" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 4" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 5" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 6" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 7" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 8" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 9" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 10" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 11" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 12" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 13" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 14" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Célébrité 15" className="input input-bordered w-full max-w-xs" />
            </div>
            <button
                className="btn btn-primary"
                disabled={isMutating}
                onClick={async () => {
                    try {
                        const result = await trigger([{ name: "test" }]);
                    } catch (e) {
                        // gestion de l'erreur
                    }
                }}
            >
                Parier
            </button>
        </>
    );
}
