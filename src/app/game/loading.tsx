import { Title, Text } from "@tremor/react";

export default async function Loading() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title className="text-2xl">
                Bonjour <span className="font-bold">...</span>
            </Title>
            <Text>Bienvenue sur le Necroloto.</Text>
        </main>
    );
}
