"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { UpdateUserAction } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface FormNameProps {
    userDb: User;
}

export default function FormName({ userDb }: FormNameProps) {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [firstNameInvalid, setFirstNameInvalid] = useState(false);

    const [firstName, setFirstName] = useState(userDb.firstname ?? "");
    const [lastName, setLastName] = useState(userDb.lastname ?? "");

    const update = async () => {
        if (user) {
            setLoading(true);
            await UpdateUserAction(user.id, firstName, lastName).finally(() => {
                router.push("/profile");
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        if (!firstName) setFirstNameInvalid(true);
        else setFirstNameInvalid(false);
    }, [firstName]);

    return (
        <div className="flex flex-col gap-4">
            <Input
                type="text"
                label="Nom"
                variant="underlined"
                isClearable
                value={lastName}
                onValueChange={(v) => setLastName(v)}
            />
            <Input
                type="text"
                label="Prénom"
                variant="underlined"
                isClearable
                isRequired
                value={firstName}
                isInvalid={firstNameInvalid}
                onValueChange={(v) => setFirstName(v)}
            />
            <Button
                color="primary"
                variant="solid"
                radius="full"
                onPress={() => update()}
                isLoading={loading}
                isDisabled={firstNameInvalid}
            >
                OK
            </Button>
        </div>
    );
}
