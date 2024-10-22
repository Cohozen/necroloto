import React from "react";
import FormName from "./form";
import { currentUser } from "@clerk/nextjs/server";
import { findUserByClerkId } from "@/lib/api/user";
import { User } from "@prisma/client";

export default async function Page() {
    const user = await currentUser();

    let userDb: User | null = null;

    if (user) userDb = await findUserByClerkId(user?.id);

    return (
        <div className="flex flex-col gap-6 p-4">
            <span className="text-xl font-medium text-center">Modifier mon nom</span>
            {userDb && <FormName userDb={userDb} />}
        </div>
    );
}
