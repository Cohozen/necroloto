import { currentUser, clerkClient } from "@clerk/nextjs";
import { findUserByClerkId, insertUser, updateUser } from "@/lib/api/user";
import { User } from "@prisma/client";
import BetsCardList from "./betsCardList";
import { BetsWithUser } from "@/lib/types/bet";
import { listBetsByUser } from "@/lib/api/bet";

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

    let bets: BetsWithUser[] = [];

    if (user && user?.externalId) {
        const result = await listBetsByUser(user?.externalId);
        if (result) bets = result;
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl">
                    Bonjour <span className="font-bold">{buildUserName()}</span>
                </h1>
                <p className="text-xl">Bienvenue sur le Necroloto.</p>
                <h2 className="text-3xl mb-2">Mes paris : </h2>
            </div>
            <BetsCardList bets={bets} />
        </main>
    );
}
