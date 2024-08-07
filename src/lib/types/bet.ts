import { Prisma } from "@prisma/client";

export type BetsWithUser = Prisma.BetGetPayload<{ include: { user: true } }>;

export type BetsWithCelebrities = Prisma.BetGetPayload<{
    include: { CelebritiesOnBet: { include: { celebrity: true } } };
}>;

export type BetsWithUserAndCelebritiesOnBet = Prisma.BetGetPayload<{
    include: { user: true; CelebritiesOnBet: true };
}>;
