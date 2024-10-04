import { Bet, CelebritiesOnBet, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { unstable_cache, revalidateTag } from "next/cache";

type CreatedBet = Pick<Bet, "userId" | "year">;

export const getBet = unstable_cache(
    async (id: string) => {
        return prisma.bet.findUnique({
            where: {
                id
            }
        });
    },
    ["bet-by-id"],
    { tags: ["bets"] }
);

export const getBetWithCelebrities = unstable_cache(
    async (id: string) => {
        return prisma.bet.findUnique({
            where: {
                id
            },
            include: {
                CelebritiesOnBet: { include: { celebrity: true } },
                user: true
            }
        });
    },
    ["bet-with-celebrities"],
    { tags: ["bets", "celebrities"] }
);

export const getBetByUserAndYear = unstable_cache(
    async (userId: string, year: number) => {
        return prisma.bet.findFirst({
            where: {
                userId,
                year
            },
            include: {
                CelebritiesOnBet: { include: { celebrity: true } }
            }
        });
    },
    ["bet-by-user-and-year-with-celebrities"],
    { tags: ["bets", "celebrities"] }
);

export const listBets = unstable_cache(
    async <T>(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BetWhereUniqueInput;
        where?: Prisma.BetWhereInput;
        orderBy?: Prisma.BetOrderByWithRelationInput;
        include?: Prisma.BetInclude;
    }): Promise<T[]> => {
        const { skip, take, cursor, where, orderBy, include } = params;

        return prisma.bet.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        }) as Prisma.PrismaPromise<T[]>;
    },
    ["bets"],
    { tags: ["bets"] }
);

export const listBetsByYear = unstable_cache(
    async (year: number) => {
        return prisma.bet.findMany({
            where: {
                year
            },
            include: {
                user: true,
                CelebritiesOnBet: { include: { celebrity: true } }
            }
        });
    },
    ["bets-by-year-with-user-and-celebrities"],
    { tags: ["bets", "celebrities", "users"] }
);

export const insertBet = async (bet: CreatedBet) => {
    const result = prisma.bet.create({
        data: {
            userId: bet.userId,
            year: bet.year
        }
    });

    revalidateTag("bets");

    return result;
};

export const insertBetWithCelebrities = async (bet: CreatedBet, celebrities: string[]) => {
    const result = prisma.$transaction(
        async (tx) => {
            const createdBet = await tx.bet.create({
                data: {
                    userId: bet.userId,
                    year: bet.year
                }
            });

            const celebritiesOnBetPromises: Promise<CelebritiesOnBet>[] = [];

            for (const celebrityName of celebrities) {
                const celebrityFound = await tx.celebrity.findFirst({
                    where: { name: celebrityName.trim() }
                });

                if (celebrityFound) {
                    celebritiesOnBetPromises.push(
                        tx.celebritiesOnBet.create({
                            data: {
                                betId: createdBet.id,
                                celebrityId: celebrityFound.id
                            }
                        })
                    );
                } else {
                    const createdCelebrity = await tx.celebrity.create({
                        data: {
                            name: celebrityName.trim()
                        }
                    });

                    celebritiesOnBetPromises.push(
                        tx.celebritiesOnBet.create({
                            data: {
                                betId: createdBet.id,
                                celebrityId: createdCelebrity.id
                            }
                        })
                    );
                }
            }

            await Promise.all(celebritiesOnBetPromises);

            return createdBet;
        },
        { timeout: 30000 }
    );

    revalidateTag("bets");

    return result;
};
