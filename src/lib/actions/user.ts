import { User } from "@prisma/client";
import { findUserByClerkId, insertUser, updateUser } from "@/lib/api/user";
import { clerkClient } from "@clerk/nextjs/server";
import { User as UserClerk } from "@clerk/nextjs/server";

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

    return userDb;
}
