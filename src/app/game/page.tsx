import { currentUser, clerkClient } from "@clerk/nextjs";
import { findUserByClerkId, insertUser, updateUser } from "@/lib/api/user";

import { User } from "@prisma/client";
import BetsCardList from "./betsCardList";

export const metadata = {
    title: "Necroloto | Dashboard"
};

export default async function IndexPage() {
    const user = await currentUser();

    if (user) {
        const userDb = await findUserByClerkId(user.id);

        if (!userDb) {
            const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);

            const newUserDb: User = {
                id: "",
                clerkId: user.id,
                email: email?.emailAddress || null,
                image: user.imageUrl,
                username: user.username,
                firstname: user.firstName,
                lastname: user.lastName,
                clerkUpdatedAt: new Date(user.updatedAt),
                clerkCreatedAt: new Date(user.createdAt),
                updatedAt: new Date(),
                createdAt: new Date()
            };
            const insertResult = await insertUser(newUserDb);
            await clerkClient.users.updateUser(user.id, { externalId: insertResult.id });
        } else {
            if (userDb.clerkUpdatedAt && new Date(user.updatedAt) > userDb.clerkUpdatedAt) {
                const userToUpdate = {
                    ...userDb,
                    image: user.imageUrl,
                    username: user.username,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    clerkUpdatedAt: new Date(user.updatedAt),
                    clerkCreatedAt: new Date(user.createdAt)
                };

                await updateUser(userToUpdate);
            }
        }
    }

    const buildUserName = () => {
        if (!user?.firstName && !user?.lastName) return user?.emailAddresses[0]?.emailAddress;
        if (user?.firstName && !user?.lastName) return user?.firstName;
        if (!user?.firstName && user?.lastName) return user?.lastName;
        if (user?.firstName && user?.lastName) return `${user?.firstName} ${user?.lastName}`;
        return null;
    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h2>
                Bonjour <span className="font-bold">{buildUserName()}</span>
            </h2>
            <p>Bienvenue sur le Necroloto.</p>
            <BetsCardList />
        </main>
    );
}
