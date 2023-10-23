import { getBetByUser } from "../../lib/api/bet";
import { Card, Title, Text, Grid, TextInput } from "@tremor/react";
import { auth } from "@clerk/nextjs";

export default async function BetPage() {
    const { userId }: { userId: string | null } = auth();
    const getBet = async () => {
        console.log("user?.id : ", userId);
        if (userId) {
            const result = await getBetByUser(userId);
            console.log("result get : ", result);
        }
    };

    await getBet();

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Mon Pari</Title>
            <Text>{userId ? "Vous n'avez pas encore parié !" : " Voici vos paries :"}</Text>

            {/* Main section */}
            <Card className="mt-6">
                <div className="flex flex-col space-y-2">
                    <TextInput className="flex-1" placeholder="Célébrité 1" />
                    <TextInput className="flex-1" placeholder="Célébrité 2" />
                    <TextInput className="flex-1" placeholder="Célébrité 3" />
                    <TextInput className="flex-1" placeholder="Célébrité 4" />
                    <TextInput className="flex-1" placeholder="Célébrité 5" />
                    <TextInput className="flex-1" placeholder="Célébrité 6" />
                    <TextInput className="flex-1" placeholder="Célébrité 7" />
                    <TextInput className="flex-1" placeholder="Célébrité 8" />
                    <TextInput className="flex-1" placeholder="Célébrité 9" />
                    <TextInput className="flex-1" placeholder="Célébrité 10" />
                    <TextInput className="flex-1" placeholder="Célébrité 11" />
                    <TextInput className="flex-1" placeholder="Célébrité 12" />
                    <TextInput className="flex-1" placeholder="Célébrité 13" />
                    <TextInput className="flex-1" placeholder="Célébrité 14" />
                    <TextInput className="flex-1" placeholder="Célébrité 15" />
                </div>
            </Card>

            {/* KPI section */}
            <Grid numItemsMd={2} className="mt-6 gap-6">
                <Card>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                </Card>
                <Card>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                </Card>
            </Grid>
        </main>
    );
}
