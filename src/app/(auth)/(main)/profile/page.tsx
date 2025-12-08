import React from "react";

import Profile from "./profile";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { findUserByClerkId } from "@/lib/api/user";

export default async function UserProfilePage() {
    const user = await currentUser();

    let userDb: User | null = null;

    if (user) userDb = await findUserByClerkId(user?.id);

    return <div className="flex flex-col gap-6 p-4">{userDb && <Profile userDb={userDb} />}</div>;
}
