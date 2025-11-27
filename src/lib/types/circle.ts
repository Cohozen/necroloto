import { Prisma } from "@prisma/client";

export type CircleWithMemberships = Prisma.CircleGetPayload<{
    include: { memberships: true };
}>;

export type CircleWithMembershipsAndBets = Prisma.CircleGetPayload<{
    include: { memberships: true, bets: true };
}>;