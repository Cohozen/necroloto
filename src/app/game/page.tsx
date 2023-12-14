import { Title, Text } from "@tremor/react";
import { currentUser, clerkClient } from "@clerk/nextjs";
import { getUser, insertUser, User } from "@/lib/api/user";
import BetsCardList from "./betsCardList";

export const metadata = {
    title: "Necroloto | Dashboard"
};

export default async function IndexPage() {
    const user = await currentUser();

    if (user) {
        const userDb = await getUser(user.id);

        if (!userDb) {
            const newUserDb: User = {
                clerkId: user.id,
                imageUrl: user.imageUrl,
                username: user.username || undefined,
                firstname: user.firstName || undefined,
                lastname: user.lastName || undefined,
                clerkUpdatedAt: user.updatedAt
            };
            const insertResult = await insertUser(newUserDb);
            await clerkClient.users.updateUser(user.id, { externalId: insertResult?.insertedId?.toString() });
        } else {
            //TODO update db user
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
