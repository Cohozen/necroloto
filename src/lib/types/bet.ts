import { Prisma } from "@prisma/client";

export type BetsWithUser = Prisma.BetGetPayload<{ include: { user: true } }>;
