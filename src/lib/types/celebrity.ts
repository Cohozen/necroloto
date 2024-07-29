import { Prisma } from "@prisma/client";

export type CelebrityWithBetsAndUser = Prisma.CelebrityGetPayload<{
    include: { CelebritiesOnBet: { include: { bet: { include: { user: true } } } } };
}>;
