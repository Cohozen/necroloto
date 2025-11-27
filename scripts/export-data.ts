import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    const celebrities = await prisma.celebrity.findMany();
    const bets = await prisma.bet.findMany();
    const celebritiesOnBet = await prisma.celebritiesOnBet.findMany();

    const data = {
        users,
        celebrities,
        bets,
        celebritiesOnBet
    };

    writeFileSync("scripts/export.json", JSON.stringify(data, null, 2));
    console.log("✅ Données exportées dans scripts/export.json");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
