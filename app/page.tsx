import { Card, Title, Text } from "@tremor/react";
import { currentUser } from "@clerk/nextjs";

export default async function IndexPage() {
    const user = await currentUser();

    const buildUserName = () => {
        if (!user?.firstName && !user?.lastName) return user?.emailAddresses[0]?.emailAddress;
        if (user?.firstName && !user?.lastName) return user?.firstName;
        if (!user?.firstName && user?.lastName) return user?.lastName;
        if (user?.firstName && user?.lastName) return `${user?.firstName} ${user?.lastName}`;
        return null;
    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title className="text-2xl">
                Bonjour <span className="font-bold">{buildUserName()}</span>
            </Title>
            <Text>Bienvenue sur le Necroloto.</Text>
        </main>
    );
}
