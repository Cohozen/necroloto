import { Title, Text } from "@tremor/react";
import { currentUser } from "@clerk/nextjs";
import { getUser, insertUser, User } from "@/lib/api/user";

export default async function IndexPage() {
    const user = await currentUser();

    if (user) {
        const userDb = await getUser(user.id);

        console.log("userDb : ", userDb);

        if (!userDb) {
            const newUserDb: User = {
                clerkId: user.id,
                imageUrl: user.imageUrl,
                username: user.username || undefined,
                firstname: user.firstName || undefined,
                lastname: user.lastName || undefined,
                clerkUpdatedAt: user.updatedAt
            };
            const createResult = await insertUser(newUserDb);

            console.log("createResult : ", createResult);
        }
    }

    const buildUserName = () => {
        if (!user?.firstName && !user?.lastName) return user?.emailAddresses[0]?.emailAddress;
        if (user?.firstName && !user?.lastName) return user?.firstName;
        if (!user?.firstName && user?.lastName) return user?.lastName;
        if (user?.firstName && user?.lastName) return `${user?.firstName} ${user?.lastName}`;
        return null;
    };

    console.log("user", user);

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>
                Bonjour <span className="font-bold">{buildUserName()}</span>
            </Title>
            <Text>Bienvenue sur le Necroloto.</Text>
        </main>
    );
}
