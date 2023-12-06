import { getBetByUser } from "@/lib/api/bet";
import { Card, Title, Text, Grid } from "@tremor/react";
import { auth } from "@clerk/nextjs";
import InsertForm from "./insertForm";

export default async function BetPage() {
    const { userId }: { userId: string | null } = auth();

    if (userId) {
        console.log("userId : ", userId);
        const result = await getBetByUser(userId);
        console.log("result get : ", result);
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Mon Pari</Title>
            <Text>{userId ? "Vous n'avez pas encore parié !" : " Voici vos paries :"}</Text>

            {/* Main section */}
            <Card className="mt-6">
                <InsertForm />
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
