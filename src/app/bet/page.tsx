import { CelebrityBet, getBetByUser, insertBet } from "@/lib/api/bet";
import { Card, Title, Text, Grid, TextInput, Button } from "@tremor/react";
import { auth } from "@clerk/nextjs";
import InsertForm from "./insertForm";

export default async function BetPage() {
    const { userId }: { userId: string | null } = auth();
    const getBet = async () => {
        console.log("user?.id : ", userId);
        if (userId) {
            const result = await getBetByUser(userId);
            console.log("result get : ", result);
        }
    };

    const insert = async () => {
        const celebrities: CelebrityBet[] = [
            {
                name: "test"
            },
            {
                name: "coucou"
            }
        ];
        if (userId) {
            const res = await insertBet(userId, celebrities);
            console.log("insert : ", res);
        }
    };

    await getBet();

    //await insert();

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Mon Pari</Title>
            <Text>{userId ? "Vous n'avez pas encore parié !" : " Voici vos paries :"}</Text>

            {/* Main section */}
            <Card className="mt-6">
                <InsertForm/>
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
