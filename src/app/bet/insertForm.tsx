"use client";

import { Button, TextInput } from "@tremor/react";
import useClerkSWRMutation from "@/utils/hooks/useClerkSWRMutation";
import { useUser } from "@clerk/nextjs";

export default async function InsertForm() {
    const { user, isLoaded } = useUser();

    const { trigger, isMutating } = useClerkSWRMutation(`/api/users/${user?.externalId}/bet`);

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <TextInput className="flex-1" placeholder="Célébrité 1" />
                <TextInput className="flex-1" placeholder="Célébrité 2" />
                <TextInput className="flex-1" placeholder="Célébrité 3" />
                <TextInput className="flex-1" placeholder="Célébrité 4" />
                <TextInput className="flex-1" placeholder="Célébrité 5" />
                <TextInput className="flex-1" placeholder="Célébrité 6" />
                <TextInput className="flex-1" placeholder="Célébrité 7" />
                <TextInput className="flex-1" placeholder="Célébrité 8" />
                <TextInput className="flex-1" placeholder="Célébrité 9" />
                <TextInput className="flex-1" placeholder="Célébrité 10" />
                <TextInput className="flex-1" placeholder="Célébrité 11" />
                <TextInput className="flex-1" placeholder="Célébrité 12" />
                <TextInput className="flex-1" placeholder="Célébrité 13" />
                <TextInput className="flex-1" placeholder="Célébrité 14" />
                <TextInput className="flex-1" placeholder="Célébrité 15" />
            </div>
            <Button
                disabled={isMutating}
                onClick={async () => {
                    try {
                        const result = await trigger([{ name: "test" }]);
                    } catch (e) {
                        // gestion de l'erreur
                    }
                }}
            >
                Insert test
            </Button>
        </>
    );
}
