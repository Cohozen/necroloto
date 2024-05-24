import { CelebritiesOnBet, Celebrity } from "@prisma/client";
import prisma from "@/lib/prisma";

type CreatedCelebrity = Pick<Celebrity, "name" | "birth" | "death" | "photo">;

export async function listAllCelebrities() {
    return prisma.celebrity.findMany();
}

export async function listIncompleteCelebrities() {
    return prisma.celebrity.findMany({
        where: {
            OR: [{ birth: null }, { death: null }]
        }
    });
}

export async function insertCelebrity(celebrity: CreatedCelebrity) {
    return prisma.celebrity.create({
        data: {
            name: celebrity.name,
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });
}

export async function updateCelebrity(celebrity: Celebrity) {
    return prisma.celebrity.update({
        where: { id: celebrity.id },
        data: {
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });
}

export async function updatePointsCelebrityOnBets(celebrityId: string, points: number) {
    return prisma.celebritiesOnBet.updateMany({
        where: { celebrityId: celebrityId },
        data: {
            points
        }
    });
}

export async function mergeCelebrities(fromId: string, toId: string) {
    return prisma.$transaction(
        async (tx) => {
            await tx.celebrity.findUniqueOrThrow({
                where: {
                    id: fromId,
                    death: null
                },
                include: {
                    CelebritiesOnBet: true
                }
            });

            await tx.celebrity.findUniqueOrThrow({
                where: {
                    id: toId
                }
            });

            await tx.celebritiesOnBet.updateMany({
                where: { celebrityId: fromId },
                data: {
                    celebrityId: toId
                }
            });

            return tx.celebrity.delete({
                where: { id: fromId }
            });
        },
        { timeout: 30000 }
    );
}
