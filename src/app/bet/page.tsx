import { getBetByUser } from "@/lib/api/bet";
import { Card, Title, Text, Grid } from "@tremor/react";
import { useUser } from "@clerk/nextjs";
import InsertForm from "./insertForm";

export default async function BetPage() {
    const { user } = useUser();

    const getBet = async () => {
        if (user) {
            console.log("user?.id : ", user.id);
            const result = await getBetByUser(user.id);
            console.log("result get : ", result);
        }
    };

    // const insert = async () => {
    //     const celebrities: CelebrityBet[] = [
    //         {
    //             name: "test"
    //         },
    //         {
    //             name: "coucou"
    //         }
    //     ];
    //     if (userId) {
    //         const res = await insertBet(userId, celebrities);
    //         console.log("insert : ", res);
    //     }
    // };

    await getBet();

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Mon Pari</Title>
            <Text>{user?.id ? "Vous n'avez pas encore parié !" : " Voici vos paries :"}</Text>

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
