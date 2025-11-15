import { Prisma } from "@prisma/client";

export type CircleWithMemberships = Prisma.CircleGetPayload<{
    include: { memberships: true };
}>;
