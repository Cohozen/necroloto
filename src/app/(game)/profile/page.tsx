import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { CreateOrUpdateUserByClerkAuth } from "@/lib/actions/user";
import UserAvatar from "@/components/business/user/UserAvatar";
import { buildUserName } from "@/lib/helpers/user";

export const metadata = {
    title: "Necroloto | Profil"
};

export default async function Page() {
    const user = await currentUser();

    let userDb: User | null = null;

    if (user) {
        userDb = await CreateOrUpdateUserByClerkAuth(user);
    }

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-4 py-2">
                {userDb && (
                    <div className="flex flex-col items-center">
                        <UserAvatar user={userDb} size="w-28" />
                        <div className="flex flex-col items-center">
                            <p className="text-[36px]">{buildUserName(userDb)}</p>
                            <span className="text-[14px]">{userDb?.email}</span>
                        </div>
                    </div>
                )}
            </div>
            <div role="tablist" className="tabs tabs-bordered pt-2">
                <a role="tab" className="tab tab-active">Résumé</a>
                <a role="tab" className="tab">Stats</a>
            </div>
        </main>
    );
}
