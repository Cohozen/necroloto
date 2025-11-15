import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

async function main() {
    const raw = readFileSync("scripts/export.json", "utf-8");
    const data = JSON.parse(raw);

    // await prisma.user.createMany({ data: data.users });
    // await prisma.celebrity.createMany({ data: data.celebrities });
    // await prisma.bet.createMany({ data: data.bets });
    // await prisma.celebritiesOnBet.createMany({ data: data.celebritiesOnBet });

    const circle = await prisma.circle.create({
        data: {
            name: "Les Angevins",
            allowNewBet: false
        }
    });

    console.log(`✅ Cercle créé : ${circle.name} (ID: ${circle.id})`);

    const bets2025 = await prisma.bet.findMany({
        where: {
            year: 2025
        }
    });

    console.log(`🔍 Bets 2025 trouvés : ${bets2025.length}`);

    const memberships = bets2025.map((b) => ({
        userId: b.userId,
        circleId: circle.id
    }));

    if (memberships.length > 0) {
        await prisma.membership.createMany({
            data: memberships,
            skipDuplicates: true
        });
        console.log(`✅ Membres ajoutés : ${memberships.length}`);
    } else {
        console.log("⚠️ Aucun utilisateur à ajouter.");
    }

    console.log("✅ Données réimportées depuis export.json");
}

main()
    .catch((e) => {
        console.error("❌ Erreur lors du seed :", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
