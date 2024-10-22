"use server";

import { User } from "@prisma/client";
import { findUserByClerkId, insertUser, updateUser } from "@/lib/api/user";
import { clerkClient } from "@clerk/nextjs/server";
import { User as UserClerk } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function CreateOrUpdateUserByClerkAuth(clerkUser: UserClerk) {
    let userDb = await findUserByClerkId(clerkUser.id);

    if (!userDb) {
        const email = clerkUser.emailAddresses.find(
            (e) => e.id === clerkUser.primaryEmailAddressId
        );

        const newUserDb: User = {
            id: "",
            clerkId: clerkUser.id,
            email: email?.emailAddress || null,
            image: clerkUser.imageUrl,
            username: clerkUser.username,
            firstname: clerkUser.firstName,
            lastname: clerkUser.lastName,
            clerkUpdatedAt: new Date(clerkUser.updatedAt),
            clerkCreatedAt: new Date(clerkUser.createdAt),
            updatedAt: new Date(),
            createdAt: new Date()
        };

        userDb = await insertUser(newUserDb);
        await clerkClient.users.updateUser(clerkUser.id, { externalId: userDb.id });
    } else {
        if (userDb.clerkUpdatedAt && new Date(clerkUser.updatedAt) > userDb.clerkUpdatedAt) {
            const userToUpdate = {
                ...userDb,
                image: clerkUser.imageUrl,
                username: clerkUser.username,
                firstname: clerkUser.firstName,
                lastname: clerkUser.lastName,
                clerkUpdatedAt: new Date(clerkUser.updatedAt),
                clerkCreatedAt: new Date(clerkUser.createdAt)
            };

            userDb = await updateUser(userToUpdate);
        }
    }

    revalidatePath(`/profile`);

    return userDb;
}

export async function UpdateUserAction(clerkId: string, firstName: string, lastName: string) {
    let userDb = await findUserByClerkId(clerkId);

    if (!userDb) throw "not found";

    const updatedClerkUser = await clerkClient.users.updateUser(clerkId, { firstName, lastName });

    const userToUpdate = {
        ...userDb,
        firstname: firstName,
        lastname: lastName,
        image: updatedClerkUser.imageUrl,
        clerkUpdatedAt: new Date(updatedClerkUser.updatedAt)
    };

    revalidatePath(`/profile`);

    return await updateUser(userToUpdate);
}
