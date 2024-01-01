import { Bet } from "@prisma/client";
import prisma from "@/lib/prisma";

type CreatedBet = Pick<Bet, "userId" | "year">;

export async function getBet(id: string) {
    return prisma.bet.findUnique({
        where: {
            id
        }
    });
}

export async function getBetWithCelebrities(id: string) {
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
    return prisma.bet.findFirst({
        where: {
            userId,
            year
        }
    });
}

export async function listBetsByUser(userId: string) {
    return prisma.bet.findMany({
        where: {
            userId
        },
        include: {
            user: true
        }
    });
}

export async function insertBet(bet: CreatedBet) {
    return prisma.bet.create({
        data: {
            userId: bet.userId,
            year: bet.year
        }
    });
}

export async function insertBetWithCelebrities(bet: CreatedBet, celebrities: string[]) {
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
