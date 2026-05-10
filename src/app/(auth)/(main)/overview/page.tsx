"use client";

import { Button } from "@heroui/react";
import { useAuth } from "@clerk/nextjs";

export default function Page() {
    const { signOut } = useAuth();

    return (
        <div>
            <h1>Hello Overview Page</h1>
            <Button onPress={() => signOut()}>Sign Out</Button>
        </div>
    );
}
