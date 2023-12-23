import { PrismaClient, Bet } from "@prisma/client";

type CreatedBet = Pick<Bet, "userId" | "year">;

export async function getBet(id: string) {
    const prisma = new PrismaClient();

    return prisma.bet.findUnique({
        where: {
            id
        }
    });
}

export async function getBetWithCelebrities(id: string) {
    const prisma = new PrismaClient();

    return prisma.bet.findUnique({
        where: {
            id
        },
        include: {
            CelebritiesOnBet: { include: { celebrity: true } }
        }
    });
}

export async function getBetByUserAndYear(userId: string, year: number) {
    const prisma = new PrismaClient();

    return prisma.bet.findFirst({
        where: {
            userId,
            year
        }
    });
}

export async function listBetByUser(userId: string) {
    const prisma = new PrismaClient();

    return prisma.bet.findMany({
        where: {
            userId
        }
    });
}

export async function insertBet(bet: CreatedBet) {
    const prisma = new PrismaClient();

    return prisma.bet.create({
        data: {
            userId: bet.userId,
            year: bet.year
        }
    });
}

export async function insertBetWithCelebrities(bet: CreatedBet, celebrities: string[]) {
    const prisma = new PrismaClient();

    return prisma.$transaction(async (tx) => {
        const createdBet = await tx.bet.create({
            data: {
                userId: bet.userId,
                year: bet.year
            }
        });

        for (const celebrityName of celebrities) {
            const celebrityFound = await tx.celebrity.findFirst({
                where: { name: celebrityName }
            });

            if (celebrityFound) {
                const linked = await tx.celebritiesOnBet.create({
                    data: {
                        betId: createdBet.id,
                        celebrityId: celebrityFound.id
                    }
                });
            } else {
                const createdCelebrity = await tx.celebrity.create({
                    data: {
                        name: celebrityName
                    }
                });

                const linked = await tx.celebritiesOnBet.create({
                    data: {
                        betId: createdBet.id,
                        celebrityId: createdCelebrity.id
                    }
                });
            }
        }

        return createdBet;
    });
}
